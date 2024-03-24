const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const port = 8010;

app.use('/controllers', express.static('controllers'));
app.set('view engine', 'ejs');

app.use(express.static("public"));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());


// Database models
const db = require("./config/db");
const categories = require("./models/categoryModel");
const products = require("./models/productModel");
const sales = require("./models/salesModel");

// Authentication
const session = require("express-session");
const mysqlStore = require("express-mysql-session")(session);


app.get('/back-office/welcome', (req, res) => {
    res.render('back-office/welcome');
})

app.get('/back-office/login', (req, res) => {
    forms = [
        { topic: "Username" },
        { topic: "Password" }
    ]

    res.render('back-office/login', {
        text: 'Log in for shop owner',
        forms: forms,
        button: 'Log In'
    });
})
app.get('/back-office/signUp', (req, res) => {
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
app.get('/back-office/myCategory', async (req, res) => {
    try {
        const catagoryId = req.body.catagoryId;
        const categoriesList = await categories.findAllByName();
        const totalProduct = await products.countProductsInCategory(catagoryId)

        res.render('back-office/myCategory', {
            currentPage: 'myCategory',
            article: 'My Category',
            button: 'Create new category',
            btnID: 'createCategory',
            categories: categoriesList,
            totalProduct: totalProduct
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
app.post('/back-office/addProduct', async (req, res) => {
    try {
        const productId = req.body.productId;
        const categoryId = req.body.categoryId;
        const productName = req.body.productName;
        const productDes = req.body.productDes;
        const productImage = req.body.productImage;
        const productPrice = req.body.productPrice;
        const productSalesCount = req.body.productSalesCount;

        // Create new product in the database
        await products.create({
            product_id: productId,
            category_id: categoryId,
            product_name: productName,
            product_description: productDes,
            product_images: productImage,
            product_price: productPrice,
            product_sales_count: productSalesCount
        });
        res.redirect(`/back-office/myProduct?categoryId=${categoryId}`);
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.post('/back-office/addCategory', async (req, res) => {
    try {
        const categoryId = req.body.categoryId;
        const categoryName = req.body.categoryName;

        // Create new category in the database
        await categories.create({ category_id: categoryId, category_name: categoryName });
        res.redirect("/back-office/myCategory");
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.post("/back-office/deleteCategory", async (req, res) => {
    const categoryId = req.body.categoryId;
    console.log("deleting item with this id : " + categoryId);
    try {
        await categories.delete(categoryId);
        res.redirect("/back-office/myCategory");
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(400).json({ error: error.message });
    }
});


app.get('/back-office/myProduct', async (req, res) => {
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

app.post("/back-office/deleteProduct", async (req, res) => {
    const productId = req.body.productId;
    console.log("deleting item with this id : " + productId);
    try {
        await products.delete(productId);
        res.redirect("/back-office/myProduct");
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(400).json({ error: error.message });
    }
});

app.get('/back-office/billSummary', async (req, res) => {
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

app.get('/back-office/bestSeller', (req, res) => {
    res.render('back-office/bestSeller', {
        currentPage: 'salesHistory',
        article: 'Best Seller',
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

app.get('/api/WebStore/Category/Women/:productId', async (req, res) => {
    try {
        const productId = req.params.productId; // Get the category ID from URL parameter
        const product = await products.findById(productId); 
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.get('/back-office/myProduct/:cateId', async (req, res) => {
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

app.get("/", async (req, res) => {

    try {
        const productsList = await products.findAlllimit();
        const categoriesList = await categories.findAll();
        console.log(categoriesList)

        res.render("WebStore/home", {
            products: productsList,
            categoriesList: categoriesList
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }  
})

app.get("/WebStore/home", async (req, res) => {
    try {
        const categoriesList = await categories.findAll();
        const productsList = await products.findAlllimit();

        res.render("WebStore/home", {
            products: productsList,
            categoriesList: categoriesList
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }  
});

app.get("/WebStore/Category/allproduct", async (req, res) => {
    try {
        const categoriesList = await categories.findAll();
        const productsList = await products.findAll();


        res.render("WebStore/Category/allproduct", {
            products: productsList,
            categoriesList: categoriesList
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }  
});

app.get("/WebStore/login", async (req, res) => {
    const categoriesList = await categories.findAll();
    res.render("WebStore/login" , {categoriesList});

});

app.get("/WebStore/product_detail", async (req, res) => {
    // Dummy product data for testing
    try {
        const categoriesList = await categories.findAll();
        const productId = req.query.productId;
        const product = await products.findById(productId, 'product_id');
        res.render("WebStore/product_detail", { product: product, categoriesList: categoriesList });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/WebStore/basket", async (req, res) => {
    // Dummy product data for testing
    const categoriesList = await categories.findAll();
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
    res.render("WebStore/basket", { products, totalItems, totalPrice, categoriesList});
});

app.listen(port, () => {
    console.log(`App listening at port ${port}`)
});

app.get("/WebStore/checkout", async (req, res) => {
    const categoriesList = await categories.findAll();
    res.render("WebStore/checkout" , {categoriesList});
});

app.get("/signup", async (req, res) => {
    const categoriesList = await categories.findAll();
    res.render("WebStore/signup" , {categoriesList});
});

app.get("/WebStore/contact", async (req, res) => {
    const categoriesList = await categories.findAll();
    res.render("WebStore/contact" , {categoriesList});
});

app.get("/WebStore/Category/allproduct", (req, res) => {
    res.render("WebStore/Category/allproduct");
});

app.get("/WebStore/Category/Men", async (req, res) => {
    try {
        const categoriesList = await categories.findAll();
        const productsList = await products.findByCategoryId(111);


        res.render("WebStore/Category/men", {
            products: productsList,
            categoriesList: categoriesList
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    } 
});

app.get("/WebStore/Category/Women", async (req, res) => {
    try {
        const categoriesList = await categories.findAll();
        const productsList = await products.findByCategoryId(112);


        res.render("WebStore/Category/women", {
            products: productsList,
            categoriesList: categoriesList
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    } 
});

app.get("/WebStore/Category/kids", async (req, res) => {
    try {
        const categoriesList = await categories.findAll();
        const productsList = await products.findByCategoryId(115);


        res.render("WebStore/Category/kids", {
            products: productsList,
            categoriesList: categoriesList
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    } 
    // res.render("WebStore/Category/kids");
});

app.get("/WebStore/Category/accessories", async (req, res) => {
    try {
        const categoriesList = await categories.findAll();
        const productsList = await products.findByCategoryId(114);


        res.render("WebStore/Category/accessories", {
            products: productsList,
            categoriesList: categoriesList
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    } 
});
