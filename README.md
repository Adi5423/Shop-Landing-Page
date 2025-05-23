# E-Commerce Landing Page

A modern e-commerce landing page built with Node.js, Express, and MongoDB. This application provides a seamless shopping experience with product management, cart functionality, and responsive design.

## Features

- 🛍️ **Product Management**
  - View all products with images and details
  - Add new products with image upload
  - Edit and delete existing products
  - Product categorization and filtering

- 🛒 **Shopping Cart**
  - Add/remove products to cart
  - Update quantities
  - Persistent cart data
  - Price calculation

- 🖼️ **Image Handling**
  - Automatic image upload
  - Image optimization
  - Secure file storage

- 🎨 **Modern UI/UX**
  - Responsive design
  - Bootstrap 5 components
  - Mobile-first approach
  - Smooth animations

## Tech Stack

- **Backend**
  - Node.js
  - Express.js
  - MongoDB with Mongoose
  - Multer for file uploads
  - dotenv for environment variables

- **Frontend**
  - EJS templating engine
  - Bootstrap 5
  - Custom CSS/JS
  - Responsive design

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (free tier available)
- npm (Node Package Manager)

## Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd ecommerce-landing
```

2. **Install dependencies**
```bash
npm install
```

3. **MongoDB Atlas Setup**
   - Create a MongoDB Atlas account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
   - Create a new cluster (free tier is sufficient)
   - Set up database access:
     1. Go to "Database Access" under Security
     2. Click "Add New Database User"
     3. Create a user with password authentication
     4. Save the username and password securely
   - Set up network access:
     1. Go to "Network Access" under Security
     2. Click "Add IP Address"
     3. Click "Allow Access from Anywhere" (for development) or add your specific IP
   - Get your connection string:
     1. Click "Connect" on your cluster
     2. Choose "Connect your application"
     3. Copy the connection string

4. **Environment Setup**
   - Create a `.env` file in the root directory:
   ```
   # MongoDB Atlas Connection
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
   
   # Application
   PORT=3000
   NODE_ENV=development
   
   # Optional: MongoDB Atlas specific settings
   MONGODB_DB_NAME=ecommerce
   MONGODB_USER=<your-username>
   MONGODB_PASSWORD=<your-password>
   MONGODB_CLUSTER=<your-cluster-name>
   ```
   Replace:
   - `<username>` with your MongoDB Atlas username
   - `<password>` with your MongoDB Atlas password
   - `<cluster>` with your cluster name
   - `<database>` with your database name (e.g., 'ecommerce')

5. **Directory Structure Setup**
```bash
mkdir -p public/uploads
touch public/uploads/.gitkeep
```

## Running the Application

1. **Development Mode**
```bash
npm run dev
```

2. **Production Mode**
```bash
npm start
```

3. **Access the Application**
   - Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
ecommerce-landing/
├── models/                 # Database models
│   └── Product.js         # Product schema
├── routes/                # Route handlers
│   ├── products.js       # Product routes
│   └── cart.js           # Cart routes
├── views/                 # EJS templates
│   ├── layouts/          # Layout templates
│   ├── partials/         # Reusable components
│   └── pages/            # Page templates
├── public/               # Static files
│   ├── css/             # Stylesheets
│   ├── js/              # Client-side scripts
│   └── uploads/         # Uploaded images
├── data/                # Data files
├── defaultData/         # Default data
├── app.js              # Application entry point
├── package.json        # Project configuration
└── README.md           # Project documentation
```

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Cart
- `GET /api/cart` - Get cart contents
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item
- `DELETE /api/cart/remove` - Remove item from cart

## Development

### Code Style
- Follow ESLint configuration
- Use meaningful variable names
- Add comments for complex logic
- Keep functions small and focused

### Git Workflow
1. Create feature branch
2. Make changes
3. Test thoroughly
4. Create pull request
5. Code review
6. Merge to main

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email [your-email] or open an issue in the repository.

## Troubleshooting MongoDB Atlas Connection

If you encounter connection issues:

1. **Check Network Access**
   - Ensure your IP address is whitelisted in MongoDB Atlas
   - For development, you can temporarily allow access from anywhere (0.0.0.0/0)

2. **Verify Credentials**
   - Double-check username and password in your connection string
   - Ensure the user has the correct permissions

3. **Connection String Format**
   - Make sure your connection string is properly URL-encoded
   - Special characters in password need to be encoded

4. **Cluster Status**
   - Verify your cluster is active and running
   - Check if you're within the free tier limits

5. **Common Issues**
   - Timeout errors: Check your network connection
   - Authentication errors: Verify credentials
   - Connection refused: Check IP whitelist 