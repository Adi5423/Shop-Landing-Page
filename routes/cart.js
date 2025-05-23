const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Cart = require('../models/Cart');

// Get or create cart
async function getCart() {
    let cart = await Cart.findOne();
    if (!cart) {
        cart = await Cart.create({ items: [], totalItems: 0, totalPrice: 0 });
    }
    return cart;
}

// Add to cart
router.post('/add', async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        
        // Find the product
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        // Get or create cart
        const cart = await getCart();

        // Check if product is already in cart
        const existingItem = cart.items.find(item => item.productId.toString() === productId);
        
        if (existingItem) {
            // Update quantity if product exists
            existingItem.quantity += parseInt(quantity);
        } else {
            // Add new item to cart
            cart.items.push({
                productId,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: parseInt(quantity)
            });
        }

        // Update cart totals
        cart.totalItems = cart.items.reduce((total, item) => total + item.quantity, 0);
        cart.totalPrice = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);

        await cart.save();

        res.json({ 
            success: true, 
            message: 'Product added to cart',
            cartCount: cart.totalItems,
            cart
        });
    } catch (err) {
        console.error('Cart error:', err);
        res.status(500).json({ success: false, message: 'Error adding to cart' });
    }
});

// Get cart
router.get('/', async (req, res) => {
    try {
        const cart = await getCart();
        res.json(cart);
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error fetching cart' });
    }
});

// Update cart item
router.put('/update/:productId', async (req, res) => {
    try {
        const { productId } = req.params;
        const { quantity } = req.body;

        const cart = await getCart();
        const item = cart.items.find(item => item.productId.toString() === productId);
        
        if (item) {
            const newQuantity = item.quantity + parseInt(quantity);
            if (newQuantity > 0) {
                item.quantity = newQuantity;
                
                // Update cart totals
                cart.totalItems = cart.items.reduce((total, item) => total + item.quantity, 0);
                cart.totalPrice = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
                
                await cart.save();
                res.json({ success: true, cart });
            } else {
                // Remove item if quantity becomes 0 or negative
                cart.items = cart.items.filter(item => item.productId.toString() !== productId);
                
                // Update cart totals
                cart.totalItems = cart.items.reduce((total, item) => total + item.quantity, 0);
                cart.totalPrice = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
                
                await cart.save();
                res.json({ success: true, cart });
            }
        } else {
            res.status(404).json({ success: false, message: 'Item not found in cart' });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error updating cart' });
    }
});

// Remove from cart
router.delete('/remove/:productId', async (req, res) => {
    try {
        const { productId } = req.params;
        const cart = await getCart();
        
        cart.items = cart.items.filter(item => item.productId.toString() !== productId);
        
        // Update cart totals
        cart.totalItems = cart.items.reduce((total, item) => total + item.quantity, 0);
        cart.totalPrice = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
        
        await cart.save();
        res.json({ success: true, cart });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error removing item from cart' });
    }
});

// Clear cart
router.delete('/clear', async (req, res) => {
    try {
        const cart = await getCart();
        cart.items = [];
        cart.totalItems = 0;
        cart.totalPrice = 0;
        await cart.save();
        res.json({ success: true, cart });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error clearing cart' });
    }
});

module.exports = router; 