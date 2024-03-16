const express = require('express');
const app = express();
const port = 3000;

app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.render("WebStore/home");
})

app.get("/WebStore/home", (req, res) => {
    res.render("WebStore/home");
});

app.get("/WebStore/login", (req, res) => {
    res.render("WebStore/login");
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
