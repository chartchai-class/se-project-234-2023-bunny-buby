const express = require('express');
const app = express();
const port = 3000;

app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.render("webStore/home");
})

app.get("/WebStore/contact", (req, res) => {
    res.render("WebStore/contact");
});

app.get("/signup", (req, res) => {
    res.render("WebStore/signup");
});

app.get("/back-office/welcome", (req, res) => {
    res.render("back-office/welcome");
});

app.listen(port, () => {
    console.log(`App listening at port ${port}`)
})
