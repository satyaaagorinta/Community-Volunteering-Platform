// const router = require("express").Router();
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const multer = require("multer");

// const User = require("../models/User");

// /* Configuration Multer for File Upload */
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "public/uploads/"); // Store uploaded files in the 'uploads' folder
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname); // Use the original file name
//     },
//   });
  
//   const upload = multer({ storage });

//   /* USER REGISTER */
// router.post("/register", upload.single("profileImage"), async (req, res) => {
//     try {
//       /* Take all information from the form */
//       const { fullname, mobilenumber, email, password } = req.body;
  
//       /* The uploaded file is available as req.file */
//       const profileImage = req.file;
  
//       if (!profileImage) {
//         return res.status(400).send("No file uploaded");
//       }
  
//       /* path to the uploaded profile photo */
//       const profileImagePath = profileImage.path; 

//       /* Check if user exists */
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(409).json({ message: "User already exists!" });
//     }

//     /* Hass the password */
//     const salt = await bcrypt.genSalt();
//     const hashedPassword = await bcrypt.hash(password, salt);

//     /* Create a new User */
//     const newUser = new User({
//       fullname,
//       mobilenumber,
//       email,
//       password: hashedPassword,
//       profileImagePath,
//     });

//     /* Save the new User */
//     await newUser.save();

//     /* Send a successful message */
//     res
//       .status(200)
//       .json({ message: "User registered successfully!", user: newUser });
//   } catch (err) {
//     console.log(err);
//     res
//       .status(500)
//       .json({ message: "Registration failed!", error: err.message });
//   }
// });

// module.exports = router



// const router = require("express").Router();
// const bcrypt = require("bcryptjs");
// const multer = require("multer");
// const User = require("../models/User");
// const jwt = require("jsonwebtoken");


// // Multer configuration
// const storage = multer.diskStorage({
//     destination: "public/uploads/",
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + "-" + file.originalname);
//     }
// });

// const upload = multer({
//     storage,
//     limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
//     fileFilter: (req, file, cb) => {
//         if (file.mimetype.startsWith("image/")) {
//             cb(null, true);
//         } else {
//             cb(new Error("Only image files are allowed!"), false);
//         }
//     }
// });

// // User Registration
// router.post("/register", upload.single("profileImage"), async (req, res) => {
//     try {
//         const { fullname, mobilenumber, email, password, confirmPassword } = req.body;

//         // Validations
//         if (!req.file) return res.status(400).json({ message: "Profile image required" });
//         if (password !== confirmPassword) return res.status(400).json({ message: "Passwords do not match" });
//         if (!/^\d{10}$/.test(mobilenumber)) return res.status(400).json({ message: "Invalid mobile number" });

//         // Check existing user
//         const existingUser = await User.findOne({ email });
//         if (existingUser) return res.status(409).json({ message: "User already exists" });

//         // Hash password
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         // Create new user
//         const newUser = new User({
//             fullname,
//             mobilenumber,
//             email,
//             password: hashedPassword,
//             profileImagePath: req.file.path.replace(/\\/g, "/")
//         });

//         await newUser.save();

//         res.status(201).json({
//             message: "User registered successfully",
//             user: {
//                 id: newUser._id,
//                 email: newUser.email,
//                 profileImage: newUser.profileImagePath
//             }
//         });

//     } catch (err) {
//         console.error("Registration Error:", err);
//         res.status(500).json({
//             message: process.env.NODE_ENV === "production" 
//                 ? "Registration failed" 
//                 : err.message
//         });
//     }
// });



// /* USER LOGIN*/
// router.post("/login", async (req, res) => {
//     try {
//       /* Take the infomation from the form */
//       const { email, password } = req.body
  
//       /* Check if user exists */
//       const user = await User.findOne({ email });
//       if (!user) {
//         return res.status(409).json({ message: "User doesn't exist!" });
//       }
  
//       /* Compare the password with the hashed password */
//       const isMatch = await bcrypt.compare(password, user.password)
//       if (!isMatch) {
//         return res.status(400).json({ message: "Invalid Credentials!"})
//       }
//       /* Generate JWT token */
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
//     delete user.password

//     res.status(200).json({ token, user })

//   } catch (err) {
//     console.log(err)
//     res.status(500).json({ error: err.message })
//   }
// })


// module.exports = router;

const express = require("express");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

require("dotenv").config(); // Load environment variables

const router = express.Router();

/* Multer Configuration for File Uploads */
const storage = multer.diskStorage({
    destination: "public/uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname); // Use timestamp + original name for uniqueness
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(new Error("Only image files are allowed!"), false);
        }
    }
});

/* USER REGISTRATION */
router.post("/register", upload.single("profileImage"), async (req, res) => {
    try {
        const { fullname, mobilenumber, email, password, confirmPassword } = req.body;

        // Validations
        if (!req.file) return res.status(400).json({ message: "Profile image required" });
        if (password !== confirmPassword) return res.status(400).json({ message: "Passwords do not match" });
        if (!/^\d{10}$/.test(mobilenumber)) return res.status(400).json({ message: "Invalid mobile number" });

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(409).json({ message: "User already exists" });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            fullname,
            mobilenumber,
            email,
            password: hashedPassword,
            profileImagePath: req.file.path.replace(/\\/g, "/"), // Normalize path for cross-platform compatibility
        });

        await newUser.save();

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser._id,
                email: newUser.email,
                profileImage: newUser.profileImagePath,
            },
        });
    } catch (err) {
        console.error("Registration Error:", err);
        res.status(500).json({
            message: process.env.NODE_ENV === "production"
                ? "Registration failed"
                : err.message,
        });
    }
});

/* USER LOGIN */
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User doesn't exist!" }); // Changed status code to 404 for better semantics
        }
         
        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid Credentials!" }); // Changed status code to 401 for better semantics
        }

        // Remove sensitive data from the response
        const userWithoutPassword = {
            id: user._id,
            fullname: user.fullname,
            email: user.email,
            profileImagePath: user.profileImagePath,
        };

        // Generate JWT token with expiration time
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "240h" } // Token expires in 10days 
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: userWithoutPassword,
        });
    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({
            message: process.env.NODE_ENV === "production"
                ? "Login failed"
                : err.message,
        });
    }
     // In your auth.js routes file
router.post("/refresh-token", async (req, res) => {
    try {
      const { refreshToken } = req.body;
      
      // Verify the refresh token
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
      
      // Generate new access token
      const newAccessToken = jwt.sign(
        { userId: decoded.userId },
        process.env.JWT_SECRET,
        { expiresIn: "1h" } // Set appropriate expiration
      );
      
      res.status(200).json({ token: newAccessToken });
    } catch (err) {
      res.status(401).json({ error: "Invalid refresh token" });
    }
  });
  
});

module.exports = router;
