const express = require('express');
const app = express();
const port = 3000;

app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('back-office/welcome');
})

app.get('/login', (req, res) => {
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

app.get('/myCategory', (req, res) => {
    categories = [
        {name: 'Name of Category', id: 'Id of Category', total: '4'},
        {name: 'Name of Category', id: 'Id of Category', total: '4'},
        {name: 'Name of Category', id: 'Id of Category', total: '4'},
        {name: 'Name of Category', id: 'Id of Category', total: '4'},
        {name: 'Name of Category', id: 'Id of Category', total: '4'},
        {name: 'Name of Category', id: 'Id of Category', total: '4'}
    ]
    res.render('back-office/myCategory', { 
        currentPage: 'myCategory' ,
        article: 'My Category',
        button: 'Create new category',
        categories: categories
    });
})

app.get('/myProduct', (req, res) => {
    res.render('back-office/myProduct', { currentPage: 'myProduct' });
})

app.get('/billSummary', (req, res) => {
    res.render('back-office/billSummary', { currentPage: 'billSummary' });
})

app.listen(port, () => {
    console.log(`App listening at port ${port}`)
})

