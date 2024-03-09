const express = require('express');
const app = express();
const port = 3000;

app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('back-office/welcome');
})

app.get('/login', (req, res) => {
    res.render('back-office/login');
})

app.get('/signUp', (req, res) => {
    res.render('back-office/signUp');
})

app.listen(port, () => {
    console.log(`App listening at port ${port}`)
})