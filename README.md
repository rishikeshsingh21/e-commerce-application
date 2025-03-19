# E-Commerce Backend Application  

This project is a backend service for an e-commerce application. It includes user authentication, product listing, category management, cart management, and search functionality. The backend is built using Node.js, Express, MongoDB, and JWT for secure authentication.  

## 🚀 Features  
### ✅ User Authentication  
- User registration and login using **JWT (JSON Web Token)**  
- Password hashing using **bcrypt**  

### ✅ Product Management  
- Admin can create different product categories  
- Admin can list products under categories  

### ✅ Search Functionality  
- Search products based on their names  

### ✅ Cart Management  
- Create a cart for each user  
- Add products to the cart  
- Remove products from the cart  

### ✅ Secure API  
- API secured using JWT for user authentication 
- List of API

http://localhost:4000/ecom/api/v1
## 🔒 **Authentication**
Authentication endpoints for user signup and login.

| Method | Endpoint | Description |
|--------|----------|-------------|
| **POST** | `/auth/signup` | Register a new user |
| **POST** | `/auth/signin` | Login and receive a JWT token |

---

## 🏷️ **Category Management** *(Admin Only)*  
Endpoints for creating, updating, retrieving, and deleting product categories.

| Method | Endpoint | Description |
|--------|----------|-------------|
| **POST** | `/create/category` | Create a new product category |
| **GET** | `/find/category?name=category_name` | Find category based on name |
| **GET** | `/find` | Get all categories |
| **PUT** | `/editCategory` | Edit category |
| **DELETE** | `/deleteCategory` | Delete category |

---

## 🛒 **Product Management**  
Endpoints for adding, updating, retrieving, and deleting products.

| Method | Endpoint | Description |
|--------|----------|-------------|
| **POST** | `/add-product` | Create a new product *(Admin only)* |
| **GET** | `/findProducts` | Get all products |
| **PATCH** | `/editProduct/:id` | Edit product by ID |
| **DELETE** | `/deleteProduct/:id` | Delete product by ID |
| **GET** | `/deleteAllProduct` | Delete all products |

---

## 🔍 **Search Products**  
Endpoints for searching products by name.

| Method | Endpoint | Description |
|--------|----------|-------------|
| **GET** | `/findProducts?name=product_name` | Search products by name |

---

## 🛍️ **Cart Management**  
Endpoints for adding, updating, and deleting products from the user’s cart.

| Method | Endpoint | Description |
|--------|----------|-------------|
| **POST** | `/add-to-cart` | Add product to the cart |
| **GET** | `/yourcart` | Get the user’s cart |
| **DELETE** | `/edit-cart/:id` | Remove product from the cart |

--- 

## 🛠️ Tech Stack  
| Technology | Description |
|-----------|-------------|
| **JavaScript** | Programming Language |
| **Node.js** | Backend runtime environment |
| **Express.js** | Web framework for Node.js |
| **MongoDB** | NoSQL database |
| **Mongoose** | ODM (Object Data Modeling) for MongoDB |
| **JWT** | Token-based authentication |
| **bcrypt** | Password hashing |

## 📌 Installation  
1. **Clone the repository**  
```bash
git clone https://github.com/https://github.com/rishikeshsingh21/e-commerce-application.git
