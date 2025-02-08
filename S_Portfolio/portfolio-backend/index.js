require("dotenv").config();  // Load .env file
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log("MongoDB connection error:", err));

// MySQL Connection
const mysqlConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

mysqlConnection.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL:", err.stack);
        return;
    }
    console.log("Connected to MySQL as id " + mysqlConnection.threadId);
});

// Example Query to Select Data from MySQL
mysqlConnection.query("SELECT * FROM users", (err, results) => {
    if (err) throw err;
    console.log("MySQL Data:", results);
});

// Close MySQL connection when done (optional)
mysqlConnection.end();

// Import and use routes
const contactRoutes = require("./routes/contactRoutes");
app.use("/contact", contactRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
