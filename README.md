# **MERN Stack Appointment Management System**  

## **Project Overview**  
This is a simple, responsive **MERN stack** appointment management app.  

- The application allows patients to view their appointments.  
- A **hospital admin** can **create, edit, and delete** appointments, but only if authenticated (registered).  

## **Technologies Used**  

### **Front-End**  
- **React.js** (via Vite)  
- **Bootstrap** (for styling)  
- **React Bootstrap**  
- **Git & GitHub**   

### **Back-End**  
- **Node.js** (Express.js)  
- **MongoDB** (Database)  
- **bcrypt.js** (for password hashing)  
- **JWT (JSON Web Token)** (for authentication)  

## **Setup Instructions**  

### **Prerequisites**  
Ensure you have the following installed on your system:  
- **Node.js** (Download from [Node.js official website](https://nodejs.org/))  
- **MongoDB** (You can use [MongoDB Atlas](https://www.mongodb.com/atlas) or install it locally)  
- **Git**  

### **Installation Steps**  

#### **1. Clone the Repository**  
```bash
git clone https://github.com/Subomi7/appointment-manager.git
cd appointment-manager
```

#### **2. Set Up the Backend**  
```bash
cd server  # Navigate to the backend directory
npm install  # Install dependencies
```

- Create a `.env` file in the `server` folder and add the following environment variables:  
  ```plaintext
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_secret_key
  PORT=3000
  ADMIN_REGISTRATION_CODE= 123456789
  ```
  
- Start the backend server:  
  ```bash
  npm run dev
  ```

#### **3. Set Up the Frontend**  
```bash
cd ../client  # Navigate to the frontend directory
npm install  # Install dependencies
```
- Start the frontend:  
  ```bash
  npm run dev
  ```

### **Running the Full Application**  
To run both backend and frontend simultaneously, open **two terminals**:  
1. One terminal in the **`server`** folder → Run `npm run dev`.  
2. Another terminal in the **`client`** folder → Run `npm run dev`.  


---

### **Additional Notes**  
- The backend runs on **http://localhost:3000** (or your specified `PORT`).  
- The frontend runs on **http://localhost:5173** (default Vite port).  
- Use **Postman** to test API endpoints.  