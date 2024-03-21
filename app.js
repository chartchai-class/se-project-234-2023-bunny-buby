const express = require('express');
const app = express();
const port = 3000;

app.use(express.static("public"));
app.set('view engine', 'ejs');

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
    res.render("WebStore/product_detail", { products, totalItems, totalPrice });
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

app.get("/back-office/welcome", (req, res) => {
    res.render("back-office/welcome");
});

app.listen(port, () => {
    console.log(`App listening at port ${port}`)
})
