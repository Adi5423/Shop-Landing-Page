# E-commerce Project Technical Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technical Architecture](#technical-architecture)
3. [Node.js and Express Implementation](#nodejs-and-express-implementation)
4. [Database Structure](#database-structure)
5. [API Endpoints](#api-endpoints)
6. [Frontend Implementation](#frontend-implementation)
7. [Security Features](#security-features)
8. [Development Workflow](#development-workflow)
9. [Adding New Features](#adding-new-features)
10. [Best Practices](#best-practices)

## Project Overview

This is a full-stack e-commerce application built with:
- **Backend**: Node.js + Express.js
- **Database**: MongoDB with Mongoose ODM
- **Frontend**: EJS templating engine
- **Additional Tools**: Various middleware and utilities for security and functionality

## Technical Architecture

### Core Components

1. **Server Setup (app.js)**
   - Express server configuration
   - MongoDB connection setup
   - Middleware configuration
   - Route handling
   - Static file serving
   - View engine setup (EJS)

2. **Database Models**
   - Product Model: Stores product information
   - Cart Model: Manages shopping cart state

3. **Routes**
   - Product routes for CRUD operations
   - Cart routes for cart management

4. **Views**
   - EJS templates for rendering pages
   - Partial views for reusable components

## Node.js and Express Implementation

### Express.js Setup and Configuration

#### Core Express Setup
```javascript
const express = require('express');
const app = express();
```

#### Middleware Configuration
```javascript
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');
```

### Express Routing System

#### Route Organization
1. **Modular Routing**
   - Routes are organized in separate files
   - Uses Express Router for modular routing
   ```javascript
   const router = express.Router();
   ```

2. **Route Mounting**
   ```javascript
   app.use('/products', productRoutes);
   app.use('/cart', cartRoutes);
   ```

### API Endpoints Implementation

#### Product Routes
1. **GET Routes**
   - Get all products
   - Get single product
   - Edit form

2. **POST Routes**
   - Add product
   - Update product

#### Cart Routes
1. **Cart Operations**
   - Add to cart
   - Get cart
   - Update cart
   - Remove from cart
   - Clear cart

### Express Middleware Usage

1. **Custom Cart Middleware**
   ```javascript
   app.use(async (req, res, next) => {
       // Cart initialization and management
   });
   ```

2. **File Upload Middleware (Multer)**
   ```javascript
   const upload = multer({ storage: storage });
   ```

## Database Structure

### MongoDB Models

1. **Product Model**
   ```javascript
   {
     name: String,
     description: String,
     price: Number,
     image: String,
     category: String,
     condition: String,
     features: Array,
     stock: Number
   }
   ```

2. **Cart Model**
   ```javascript
   {
     items: [{
       productId: ObjectId,
       name: String,
       price: Number,
       image: String,
       quantity: Number
     }],
     totalItems: Number,
     totalPrice: Number
   }
   ```

## API Endpoints

### Products
- `GET /` - Home page with all products
- `GET /products` - List all products
- `GET /products/:id` - Get product details
- `POST /products` - Add new product
- `PUT /products/:id` - Update product
- `DELETE /products/:id` - Delete product

### Cart
- `GET /cart` - View cart
- `POST /cart/add` - Add item to cart
- `PUT /cart/update` - Update cart item quantity
- `DELETE /cart/remove` - Remove item from cart
- `DELETE /cart/clear` - Clear cart

## Frontend Implementation

### EJS Templates
- `index.ejs` - Home page
- `product-detail.ejs` - Product details
- `edit-product.ejs` - Product editing
- `add-product.ejs` - Add new product
- `partials/` - Reusable components

### Static Assets
- CSS styles
- JavaScript files
- Uploaded images
- Other static resources

## Security Features

1. **File Upload Security**
   ```javascript
   const storage = multer.diskStorage({
       destination: function(req, file, cb) {
           cb(null, 'public/uploads/');
       },
       filename: function(req, file, cb) {
           cb(null, Date.now() + path.extname(file.originalname));
       }
   });
   ```

2. **Input Validation**
   - Request body validation
   - File upload validation
   - Error handling for invalid inputs

## Development Workflow

1. **Setup**
   ```bash
   npm install
   # Create .env file
   npm run dev
   ```

2. **Development**
   - Use `npm run dev` for development (with auto-reload)
   - Server runs on port 3000 by default
   - MongoDB should be running locally

3. **Production**
   - Use `npm start` for production
   - Ensure environment variables are set

## Adding New Features

### New Routes
```javascript
// Create new route file
const router = express.Router();
router.get('/new-route', async (req, res) => {...});
module.exports = router;
```

### New Middleware
```javascript
app.use((req, res, next) => {
    // Middleware logic
    next();
});
```

### New API Endpoints
```javascript
router.post('/new-endpoint', async (req, res) => {
    try {
        // Endpoint logic
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
```

## Best Practices

1. **Code Organization**
   - Modular structure
   - Separate concerns
   - Reusable components

2. **Error Handling**
   - Consistent error responses
   - Proper status codes
   - Error logging

3. **Performance**
   - Static file serving
   - Efficient database queries
   - Proper indexing

4. **Security**
   - Environment variables
   - Input validation
   - Secure file handling

## Future Improvements

1. **Features to Add**
   - User authentication
   - Order processing
   - Payment integration
   - Admin dashboard
   - Search functionality
   - Product categories

2. **Technical Improvements**
   - API documentation
   - Unit testing
   - CI/CD pipeline
   - Performance optimization
   - Mobile responsiveness

## Troubleshooting

Common issues and solutions:

1. **MongoDB Connection Issues**
   - Ensure MongoDB is running
   - Check connection string in .env file
   - Verify network connectivity

2. **File Upload Problems**
   - Check file size limits
   - Verify upload directory permissions
   - Ensure proper file type validation

3. **Cart State Issues**
   - Clear browser cache
   - Check MongoDB connection
   - Verify cart middleware 