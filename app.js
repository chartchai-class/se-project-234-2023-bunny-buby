const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

const categories = require("./models/categoryModel");
const products = require("./models/productModel");
const sales = require("./models/salesModel");

app.use(express.static("public"));
app.use('/controllers', express.static('controllers'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

app.get('/back-office/welcome', (req, res) => {
    res.render('back-office/welcome');
})

app.get('/back-office/login', (req, res) => {
    forms = [
        {topic: "Username"},
        {topic: "Password"}
    ]

    res.render('back-office/login', {
        text: 'Log in for shop owner',
        forms: forms,
        button: 'Log In'
    });
})
app.get('/signUp', (req, res) => {
    forms = [
        {topic: "Shop name"},
        {topic: "Username"},
        {topic: "Email"},
        {topic: "Password"},
        {topic: "Confirm password"}
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
            currentPage: 'myCategory' ,
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
        if (categoryId) {
            productsList = await products.findByCategoryId(categoryId);
        } else {
            productsList = await products.findAllByProductSalesCount();
        }

        const categoriesList = await categories.findAll();

        creating = [
            {input: 'Product ID', id: 'productID'},
            {input: 'Product name', id: 'productName'},
            {input: 'Description', id: 'description'},
            {input: 'Image', id: 'product-image'},
            {input: 'Price', id: 'price'},
            {input: 'Sales count', id: 'salesCount'}
        ]

        res.render('back-office/myProduct', { 
            currentPage: 'myProduct' ,
            article: 'My Product',
            button: 'Create new product',
            btnID: 'createProduct',
            products: productsList,
            creating: creating,
            categories: categoriesList,
            selectedCate: selectedCate
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
            currentPage: 'salesHistory' ,
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
        currentPage: 'salesHistory' ,
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

app.get("/", (req, res) => {
    res.render("WebStore/product_detail");
})

app.get("/WebStore/home", (req, res) => {
    res.render("WebStore/home");
});

app.get("/WebStore/login", (req, res) => {
    res.render("WebStore/login");
});

app.get("/WebStore/product_detail", (req, res) => {
    // Dummy product data for testing
    const product = {
        name: "Product 1",
        image: "/images/product1.jpg",
        color: "Blue",
        size: "Medium",
        price: "19.99",
        discount: "5"
    };
    
    res.render("WebStore/product_detail", { product });
    
        // Add more product objects as needed
});

app.get("/WebStore/basket", (req, res) => {
    // Dummy product data for testing
    const products = [
        {
            name: "Product 1",
            image: "/images/product1.jpg",
            color: "Blue",
            size: "Medium",
            price: "19.99"
        },
        {
            name: "Product 2",
            image: "/images/product2.jpg",
            color: "Red",
            size: "Large",
            price: "24.99",
            discount: "5" // Example discount of $5
        },
        {
            name: "Product 3",
            image: "/images/product3.jpg",
            color: "Red",
            size: "Large",
            price: "24.99"
        }
        // Add more product objects as needed
    ];
    const totalItems = products.length;
    const totalPrice = products.reduce((total, product) => total + parseFloat(product.price), 0);

    // Pass products, totalItems, and totalPrice to the view
    res.render("WebStore/basket", { products, totalItems, totalPrice });
});




app.listen(port, () => {
    console.log(`App listening at port ${port}`)
});

app.get("/WebStore/checkout", (req, res) => {
    res.render("WebStore/checkout");
});

app.get("/signup", (req, res) => {
    res.render("WebStore/signup");
});

app.get("/WebStore/contact", (req, res) => {
    res.render("WebStore/contact");
});

app.get("/WebStore/Category/allproduct", (req, res) => {
    res.render("WebStore/Category/allproduct");
});

app.get("/WebStore/Category/men", (req, res) => {
    res.render("WebStore/Category/men");
});

app.get("/WebStore/Category/women", (req, res) => {
    res.render("WebStore/Category/women");
});

app.get("/WebStore/Category/kids", (req, res) => {
    res.render("WebStore/Category/kids");
});

app.get("/WebStore/Category/accessories", (req, res) => {
    res.render("WebStore/Category/accessories");
});
