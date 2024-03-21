const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.use(express.static("public"));
app.use('/controllers', express.static('controllers'));

// Database models
const db = require("./config/db");
const categories = require("./models/categoryModel");
const products = require("./models/productModel");
const sales = require("./models/salesModel");

// Authentication
const session = require("express-session");
const mysqlStore = require("express-mysql-session")(session);

// DB connection for storing session data
const options = db.dbconfig;
options.createDatabaseTable = true;
const sessionStore = new mysqlStore(options);

// Define session configuration for your server
app.use(session({
    store: sessionStore,
    secret: 'jklfsodifjsktnwjasdp465dd', // A secret key used to sign the session ID cookie
    resave: true, // Forces the session to be saved back to the session store
    saveUninitialized: true, // Forces a session that is "uninitialized" to be saved to the store
    cookie: {
        maxAge: 3600000, // Sets the cookie expiration time in milliseconds (1 hour here)
        sameSite: true,
        httpOnly: true, // Reduces client-side script control over the cookie
        secure: false // Ensures cookies are only sent over HTTPS 
        //we do not implementment HTTPS yet, so, this is false
    }
}))

const Authen = require("./controllers/authen");

app.listen(port, () => {
    console.log(`App listening at port ${port}`)
});

app.post('/back-office/login', async (req, res) => {
    // Get user input using bodyParser
    const { email, password } = req.body;

    await Authen.userLogin(req, res, email, password);
    console.log("session-/login: ", req.sessionID);

    res.redirect('/myCategory');
})
app.post("/addwishlist", Authen.authentication, async (req, res) => {
    //const user = await UserDB.findById(req.session.userId);

    console.log("session-/addwishlist: ", req.sessionID);

    // collect user input from the VIEW
    //await const wishingProducts = req.body.box;

    req.session.wish = req.body.box;

    console.log("session-/addwishlist: ", req.session);

    const user = await UserDB.findById(req.session.userId);
    let products = await ProductDB.findAll();
    let user_wishlists = req.session.wish;

    // use res.render to load up an ejs view file​
    res.render("wishlist", {
        products: products,
        user: user,
        wishlists: user_wishlists,
    });

});


app.get('/', (req, res) => {
    res.render('back-office/welcome');
})

app.get('/back-office/login', async (req, res) => {
    forms = [
        { topic: "Username", name: email },
        { topic: "Password", name: password }
    ]

    res.render('back-office/login', {
        text: 'Log in for shop owner',
        forms: forms,
        button: 'Log In'
    });
})
app.get('/signUp', (req, res) => {
    forms = [
        { topic: "Shop name" },
        { topic: "Username" },
        { topic: "Email" },
        { topic: "Password" },
        { topic: "Confirm password" }
    ]

    res.render('back-office/signUp', {
        text: 'Sign up for new show owner',
        forms: forms,
        button: 'Sign Up'
    });
})
app.get('/myCategory', async (req, res) => {
    try {
        const categoriesList = await categories.findAllByName();

        res.render('back-office/myCategory', {
            currentPage: 'myCategory',
            article: 'My Category',
            button: 'Create new category',
            btnID: 'createCategory',
            categories: categoriesList
        });


        console.log(categoriesList);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
// app.post('/addProduct', async (req, res) => {
//     try {
//         const productId = req.body.productId;
//         const productName = req.body.productName;
//         const productDes = req.body.productDes;
//         const productImage = req.body.productImage;
//         const productPrice = req.body.productPrice;
//         const productSalesCount = req.body.productSalesCount;

//         // Create new product in the database
//         await products.create({})
//     }
// })
app.post('/addCategory', async (req, res) => {
    try {
        const categoryId = req.body.categoryId;
        const categoryName = req.body.categoryName;

        // Create new category in the database
        await categories.create({ category_id: categoryId, category_name: categoryName });
        res.redirect("/myCategory");
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.post("/deleteCategory", async (req, res) => {
    const categoryId = req.body.categoryId;
    console.log("deleting item with this id : " + categoryId);
    try {
        await categories.delete(categoryId);
        res.redirect("/myCategory");
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(400).json({ error: error.message });
    }
});


app.get('/myProduct', async (req, res) => {
    try {
        const categoryId = req.query.categoryId;

        const selectedCate = await products.getCategoryName(categoryId);

        let productsList;
        let totalProducts
        if (categoryId) {
            productsList = await products.findByCategoryId(categoryId);
            totalProducts = await products.getTotalProductByCategory(categoryId);
        } else {
            productsList = await products.findAllByProductSalesCount();
            totalProducts = '';
        }

        const categoriesList = await categories.findAll();

        creating = [
            { input: 'Product ID', id: 'productID' },
            { input: 'Product name', id: 'productName' },
            { input: 'Description', id: 'description' },
            { input: 'Image', id: 'product-image' },
            { input: 'Price', id: 'price' },
            { input: 'Sales count', id: 'salesCount' }
        ]

        res.render('back-office/myProduct', {
            currentPage: 'myProduct',
            article: 'My Product',
            button: 'Create new product',
            btnID: 'createProduct',
            products: productsList,
            creating: creating,
            categories: categoriesList,
            selectedCate: selectedCate,
            totalProducts: totalProducts
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
app.post("/deleteProduct", async (req, res) => {
    const productId = req.body.productId;
    console.log("deleting item with this id : " + productId);
    try {
        await products.delete(productId);
        res.redirect("/myProduct");
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(400).json({ error: error.message });
    }
});

app.get('/billSummary', async (req, res) => {
    try {
        const salesList = await sales.findAll();

        res.render('back-office/billSummary', {
            currentPage: 'salesHistory',
            article: 'Bill Summary',
            button1: 'Bill summary',
            button2: 'Best seller',
            salesList: salesList
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
})

app.get('/bestSeller', (req, res) => {
    res.render('back-office/bestSeller', {
        currentPage: 'salesHistory',
        article: 'Bill Summary',
        button1: 'Bill summary',
        button2: 'Best seller'
    });
})


/*      ROUTE       */
app.get('/api/categories', async (req, res) => {
    try {
        const allCategories = await categories.findAll(); // Assuming you have a method to find all categories
        res.json(allCategories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.get('/api/products', async (req, res) => {
    try {
        const allProducts = await products.findAll(); // Assuming you have a method to find all categories
        res.json(allProducts);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.get('/api/sales', async (req, res) => {
    try {
        const allSales = await products.findAll(); // Assuming you have a method to find all categories
        res.json(allSales);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// category update
app.patch('/api/categories/update/:id', async (req, res) => {
    const id = req.params.id;
    const newId = req.body.newId;
    const newName = req.body.newName;

    const newData = {
        id: newId,
        name: newName
    };

    try {
        await categories.update(id, newData); // Await the update method
        res.json({ message: 'Category updated successfully' });
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/myProduct/:cateId', async (req, res) => {
    try {
        const categoryId = req.params.cateId; // Get the category ID from URL parameter
        const productsList = await products.findByCategoryId(categoryId); // Fetch products by category ID

        creating = [
            { input: 'Product ID', id: 'productID' },
            { input: 'Product name', id: 'productName' },
            { input: 'Description', id: 'description' },
            { input: 'Image', id: 'product-image' },
            { input: 'Price', id: 'price' },
            { input: 'Sales count', id: 'salesCount' }
        ]

        res.render('back-office/myProduct', {
            currentPage: 'myProduct',
            article: 'My Product',
            button: 'Create new product',
            btnID: 'createProduct',
            products: productsList,
            creating: creating
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});



