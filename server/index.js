

// const express = require("express");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv").config();
// const cors = require("cors");
// const app = express();

// // Routes
// const authRoutes = require("./routes/auth");

// // Middleware
// app.use(cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//     allowedHeaders: ["Content-Type"],
//     credentials: true
// }));
// app.use(express.json({ limit: "10mb" }));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));

// // Route Middleware
// app.use("/auth", authRoutes);

// // Database & Server Configuration
// const PORT = 3001;
// const MONGO_URI = process.env.MONGO_URL || "mongodb://localhost:27017/community-volunteering";

// mongoose.connection.on("error", err => {
//     console.error("MongoDB connection error:", err);
// });

// mongoose.connection.on("connected", () => {
//     console.log("Connected to MongoDB");
// });

// mongoose.connect(MONGO_URI, {
//     dbName: "community-volunteering",
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     serverSelectionTimeoutMS: 5000
// })
// .then(() => {
//     app.listen(PORT, () => {
//         console.log(`Server running on port ${PORT}`);
//         console.log(`MongoDB connected: ${mongoose.connection.host}`);
//     });
// })
// .catch(err => {
//     console.error("Database connection failed:", err);
//     process.exit(1);
// });


const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const app = express();

// Routes
const authRoutes = require("./routes/auth");

// Middleware
app.use(cors({
    origin: "http://localhost:3000", // Frontend URL
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true
}));
app.use(express.json({ limit: "10mb" })); // JSON body parsing with size limit
app.use(express.urlencoded({ extended: true })); // URL-encoded body parsing
app.use(express.static("public")); // Serve static files (e.g., uploads)

// Route Middleware
app.use("/auth", authRoutes);

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
