const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Product = require('../models/Product');

// Configure multer for image upload
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.render('index', { products });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get product detail
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).render('error', { message: 'Product not found' });
        }
        res.render('product-detail', { product });
    } catch (err) {
        res.status(500).render('error', { message: 'Error fetching product details' });
    }
});

// Get edit product form
router.get('/edit/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).render('error', { message: 'Product not found' });
        }
        res.render('edit-product', { product });
    } catch (err) {
        res.status(500).render('error', { message: 'Error fetching product details' });
    }
});

// Update product
router.post('/edit/:id', upload.single('image'), async (req, res) => {
    try {
        const updateData = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            condition: req.body.condition,
            features: req.body.features || [],
            stock: req.body.stock || 0
        };

        if (req.file) {
            updateData.image = '/uploads/' + req.file.filename;
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).render('error', { message: 'Product not found' });
        }

        res.redirect(`/products/${req.params.id}`);
    } catch (err) {
        res.status(400).render('error', { message: err.message });
    }
});

// Add new product
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const product = new Product({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image: '/uploads/' + req.file.filename,
            category: req.body.category,
            condition: req.body.condition,
            features: req.body.features || [],
            stock: req.body.stock || 0
        });

        const newProduct = await product.save();
        res.redirect('/');
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router; 