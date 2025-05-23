const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(async () => {
    console.log('MongoDB Connected');
    // Initialize default products if database is empty
    const Product = require('./models/Product');
    const Cart = require('./models/Cart');
    
    // Reset cart on server start
    await Cart.deleteMany({});
    await Cart.create({ items: [], totalItems: 0, totalPrice: 0 });
    console.log('Cart reset to empty state');

    const count = await Product.countDocuments();
    if (count === 0) {
        const defaultProducts = require('./data/defaultProducts');
        await Product.insertMany(defaultProducts);
        console.log('Default products added to database');
    }
})
.catch(err => console.log('MongoDB Connection Error:', err));

// Cart middleware
app.use(async (req, res, next) => {
    try {
        const Cart = require('./models/Cart');
        let cart = await Cart.findOne();
        if (!cart) {
            cart = await Cart.create({ items: [], totalItems: 0, totalPrice: 0 });
        }
        res.locals.cart = cart;
        next();
    } catch (err) {
        console.error('Cart middleware error:', err);
        next();
    }
});

// Routes
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');

app.use('/products', productRoutes);
app.use('/cart', cartRoutes);

// Home route
app.get('/', async (req, res) => {
    try {
        const Product = require('./models/Product');
        const products = await Product.find();
        res.render('index', { products });
    } catch (error) {
        res.status(500).send('Error loading products');
    }
});

// Add product form route
app.get('/add-product', (req, res) => {
    res.render('add-product');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 