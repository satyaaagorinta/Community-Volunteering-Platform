




const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const app = express();
const path = require("path");


// Routes
const authRoutes = require("./routes/auth");
const listingRoutes = require("./routes/listing.js");
const BookingRoutes = require("./routes/booking.js");
const userRoutes = require("./routes/user.js");
// Middleware
app.use(cors({
    origin: "http://localhost:3000", // Frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type","Authorization" ],
    credentials: true
}));
app.use(express.json({ limit: "10mb" })); // JSON body parsing with size limit
app.use(express.urlencoded({ extended: true })); // URL-encoded body parsing
app.use(express.static("public")); // Serve static files (e.g., uploads)

// Route Middleware
app.use("/auth", authRoutes);
app.use("/properties", listingRoutes);
app.use("/bookings",BookingRoutes);
app.use("/users",userRoutes);


// Add this at the end of your routes in index.js
app.use((err, req, res, next) => {
    console.error("Unhandled Error:", err); // Log the error
    res.status(500).json({ error: "Internal Server Error" });
  });
  



app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

// Database & Server Configuration
const PORT = 3001; // Port for backend server
const MONGO_URI = process.env.MONGO_URL; // MongoDB connection string from .env

// MongoDB Connection Event Listeners
mongoose.connection.on("error", err => {
    console.error("MongoDB connection error:", err);
});

mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB successfully");
});

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected");
});

// Connect to MongoDB and Start Server
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000 // Timeout if MongoDB server is unreachable
})
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`MongoDB connected to host: ${mongoose.connection.host}`);
    });
})
.catch(err => {
    console.error("Database connection failed:", err);
    process.exit(1); // Exit the process on failure
});
//END OF FIRST TRY
