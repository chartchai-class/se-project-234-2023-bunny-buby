const express = require('express');
const bodyParser = require("body-parser");
const categories = require("./model/category");
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use('/controllers', express.static('controllers'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('back-office/welcome');
})

app.get('/login', (req, res) => {
    res.render('back-office/login');
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
        const categoriesList = await categories.findAll();

        res.render('back-office/myCategory', { 
            currentPage: 'myCategory' ,
            article: 'My Category',
            button: 'Create new category',
            btnID: 'createCategory',
            categories: categoriesList
        });

        await categories.defineInitialCategories();

        console.log(categoriesList);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }

    creating = [
        {input: 'Category ID', id: 'categoryID'},
        {input: 'Category Name', id: 'categoryName'},
        {input: 'Sub', id: 'subInputs'}
    ]  
});
app.post('/addCategory', async (req, res) => {
    try {
        const categoryId = req.body.categoryId;
        const categoryName = req.body.categoryName;

        // Perform validation if needed
        
        // Create new category in the database
        await categories.create({ id: categoryId, name: categoryName });
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
app.post("/editCategory", async (req, res) => {
    const categoryId = req.body.categoryId;
    const newId = req.body.newCateId;
    const newName = req.body.newCateName;
    console.log("Request Body:", req.body);

    const newData = {
        id: newId, name: newName
    }

    try {
        categories.update(categoryId, newData);
        res.redirect("/myCategory");
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/myProduct', (req, res) => {
    products = [
        {name: 'Name of Product', image: 'image/home-products/nike.jpg', id: '00001', cateId: '11111A', des: 'This is a white shoe', price: '210', salesCount: '100', pricePromotion: '110', soldItems: '20'},
        {name: 'Name of Product', image: 'image/home-products/nike.jpg', id: '', cateId: '', des: '', price: '210', salesCount: '', pricePromotion: '110', soldItems: '20'},
        {name: 'Name of Product', image: 'image/home-products/nike.jpg', id: '', cateId: '', des: '', price: '210', salesCount: '', pricePromotion: '110', soldItems: '20'},
        {name: 'Name of Product', image: 'image/home-products/nike.jpg', id: '', cateId: '', des: '', price: '210', salesCount: '100', pricePromotion: '110', soldItems: '20'},
        {name: 'Name of Product', image: 'image/home-products/nike.jpg', id: '', cateId: '', des: '', price: '210', salesCount: '100', pricePromotion: '110', soldItems: '20'}
    ]

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
        products: products,
        creating: creating
    });
})

app.get('/billSummary', (req, res) => {
    res.render('back-office/billSummary', { 
        currentPage: 'salesHistory' ,
        article: 'Bill Summary',
        button1: 'Bill summary',
        button2: 'Best seller'
    });
})

app.get('/bestSeller', (req, res) => {
    res.render('back-office/bestSeller', { 
        currentPage: 'salesHistory' ,
        article: 'Bill Summary',
        button1: 'Bill summary',
        button2: 'Best seller'
    });
})

app.listen(port, () => {
    console.log(`App listening at port ${port}`)
})