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
    subs = [
        {name: "Sub's name"},
        {name: "Sub's name"},
        {name: "Sub's name"},
        {name: "Sub's name"}
    ]

    categories = [
        {name: 'Name of Category', id: 'Id of Category', total: '4', sub: subs},
        {name: 'Name of Category', id: 'Id of Category', total: '4', sub: subs},
        {name: 'Name of Category', id: 'Id of Category', total: '4', sub: subs},
        {name: 'Name of Category', id: 'Id of Category', total: '4', sub: subs},
        {name: 'Name of Category', id: 'Id of Category', total: '4', sub: subs},
        {name: 'Name of Category', id: 'Id of Category', total: '4', sub: subs}
    ]

    res.render('back-office/myCategory', { 
        currentPage: 'myCategory' ,
        article: 'My Category',
        button: 'Create new category',
        categories: categories
    });
})

app.get('/myProduct', (req, res) => {
    products = [
        {name: 'Name of Product', image: 'image/home-products/nike.jpg', id: '00001', cateId: '11111A', des: 'This is a white shoe', price: '210', salesCount: '100', pricePromotion: '110', soldItems: '20'},
        {name: 'Name of Product', image: 'image/home-products/nike.jpg', id: '', cateId: '', des: '', price: '210', salesCount: '', pricePromotion: '110', soldItems: '20'},
        {name: 'Name of Product', image: 'image/home-products/nike.jpg', id: '', cateId: '', des: '', price: '210', salesCount: '', pricePromotion: '110', soldItems: '20'},
        {name: 'Name of Product', image: 'image/home-products/nike.jpg', id: '', cateId: '', des: '', price: '210', salesCount: '100', pricePromotion: '110', soldItems: '20'},
        {name: 'Name of Product', image: 'image/home-products/nike.jpg', id: '', cateId: '', des: '', price: '210', salesCount: '100', pricePromotion: '110', soldItems: '20'}
    ]

    res.render('back-office/myProduct', { 
        currentPage: 'myProduct' ,
        article: 'My Product',
        button: 'Create new product',
        products: products
    });
})

app.get('/billSummary', (req, res) => {
    res.render('back-office/billSummary', { currentPage: 'billSummary' });
})

app.listen(port, () => {
    console.log(`App listening at port ${port}`)
})

