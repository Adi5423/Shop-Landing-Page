# E-commerce Landing Page Project Documentation

## Project Overview
This is a full-stack e-commerce landing page application built with Node.js, Express, MongoDB, and EJS templating engine. The application provides product showcase functionality with a shopping cart system.

## Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Frontend**: EJS templating engine
- **Additional Tools**: 
  - body-parser for request parsing
  - multer for file uploads
  - dotenv for environment variables
  - nodemon for development

## Project Structure
```
├── app.js                 # Main application file
├── models/               # Database models
│   ├── Cart.js          # Shopping cart model
│   └── Product.js       # Product model
├── views/               # EJS templates
│   ├── index.ejs        # Home page
│   ├── product-detail.ejs # Product details page
│   ├── edit-product.ejs # Product editing page
│   ├── add-product.ejs  # Add new product page
│   └── partials/        # Reusable view components
├── routes/              # Route handlers
├── public/              # Static assets
├── data/               # Data files
└── defaultData/        # Default data for initialization
```

## Core Features

### 1. Product Management
- View all products on the landing page
- Add new products with images
- Edit existing products
- View detailed product information

### 2. Shopping Cart
- Add products to cart
- Update quantities
- Remove items
- View cart total
- Persistent cart state

### 3. Database Integration
- MongoDB connection with Mongoose
- Automatic initialization of default products
- Cart state management

## Setup and Installation

1. **Prerequisites**
   - Node.js installed
   - MongoDB installed and running
   - npm or yarn package manager

2. **Installation Steps**
   ```bash
   # Clone the repository
   git clone [repository-url]

   # Install dependencies
   npm install

   # Create .env file with MongoDB connection string
   MONGODB_URI=mongodb://localhost:27017/ecommerce
   PORT=3000

   # Start the development server
   npm run dev
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

## Data Models

### Product Model
```javascript
{
  name: String,
  description: String,
  price: Number,
  image: String,
  category: String
}
```

### Cart Model
```javascript
{
  items: [{
    product: ObjectId,
    quantity: Number
  }],
  totalItems: Number,
  totalPrice: Number
}
```

## Development Workflow

1. **Development Mode**
   - Run `npm run dev` for development with auto-reload
   - Server runs on port 3000 by default

2. **Production Mode**
   - Run `npm start` for production
   - Ensure environment variables are set

## Best Practices Implemented

1. **Security**
   - Environment variables for sensitive data
   - Input validation
   - Secure file upload handling

2. **Performance**
   - Static file serving
   - Efficient database queries
   - Proper error handling

3. **Code Organization**
   - Modular route handling
   - Separate model definitions
   - Reusable view components

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

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Create a Pull Request

## License
[Specify License Type]

## Contact
[Add Contact Information] 