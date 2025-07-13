

// const express = require("express");
// const multer = require("multer");
// const mongoose = require("mongoose");

// const Listing = require("../models/Listing");
// const User = require("../models/User");

// const router = express.Router();
// const jwt = require("jsonwebtoken");



// // In listing.js (backend route) UNCOMMMENT THIS IN CASE OF CRASH*****
// const requireAuth = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   console.log("Authorization header:", authHeader); // Debug header

//   if (!authHeader) {
//     return res.status(401).json({ error: "Authorization header missing" });
//   }

//   const token = authHeader.split(" ")[1];
  
  
  
//   // Format: "Bearer <token>"
//   console.log("Token received in backend:", token); // Debug token

//   if (!token) {
//     return res.status(401).json({ error: "Token missing in header" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = { id: decoded.userId };
//     next();
//   } catch (err) {
//     console.error("JWT verification failed:", err);
//     return res.status(401).json({ error: "Invalid or expired token" });
//   }
// };
// /

// /* Configuration Multer for File Upload */
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/uploads/"); // Store uploaded files in the 'uploads' folder
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname); // Use the original file name
//   },
// });
// jk
// const upload = multer({ storage });


// /* CREATE LISTING */
// router.post("/create", requireAuth, upload.array("listingPhotos"), async (req, res) => {
//   try {
//     /* Extract authenticated user ID */
//     const creator = req.user.id;

//     // Validate creator ID
//     if (!mongoose.Types.ObjectId.isValid(creator)) {
//       return res.status(400).json({ error: "Invalid creator ID" });
//     }

//     /* Take the information from the form */
//     const {
//       category,
//       streetAddress,
//       aptSuite,
//       city,
//       state,
//       pincode,
//       amenities,
//       title,
//       description,
//       highlight,
//       highlightDesc,
//     } = req.body;

//     const listingPhotos = req.files;

//     // Check if files are uploaded
//     if (!listingPhotos || listingPhotos.length === 0) {
//       return res.status(400).send("No files uploaded.");
//     }

//     const listingPhotoPaths = listingPhotos.map((file) => file.path);

//     const newListing = new Listing({
//       creator,
//       category,
//       streetAddress,
//       aptSuite,
//       city,
//       state,
//       pincode,
//       amenities,
//       listingPhotoPaths,
//       title,
//       description,
//       highlight,
//       highlightDesc,
//     });

//     await newListing.save();

//     res.status(200).json(newListing);
//  } catch (err) {
//     console.error("Error creating listing:", err); // Log the error for debugging
//     res.status(500).json({ message: "Failed to create listing", error: err.message });
//   }
// });

// /* GET LISTINGS BY CATEGORY */
// router.get("/", async (req, res) => {
//   const qCategory = req.query.category;

//   try {
//     let listings;
//     if (qCategory) {
//       listings = await Listing.find({ category: qCategory }).populate("creator");
//     } else {
//       listings = await Listing.find().populate("creator");
//     }

//     res.status(200).json(listings);
//   } catch (err) {
//     console.error("Error fetching listings:", err); // Log the error for debugging
//     res.status(404).json({ message: "Failed to fetch listings", error: err.message });
//   }
// });

// /* GET LISTINGS BY SEARCH */
// router.get("/search/:search", async (req, res) => {
//   const { search } = req.params;

//   try {
//     let listings = [];

//     if (search === "all") {
//       listings = await Listing.find().populate("creator");
//     } else {
//       listings = await Listing.find({
//         $or: [
//           { category: { $regex: search, $options: "i" } },
//           { title: { $regex: search, $options: "i" } },
//         ],
//       }).populate("creator");
//     }

//     res.status(200).json(listings);
//   } catch (err) {
//     console.error("Error searching listings:", err); // Log the error for debugging
//     res.status(404).json({ message: "Failed to fetch listings", error: err.message });
//   }
// });

// /* LISTING DETAILS */
// router.get("/:listingId", async (req, res) => {
//   try {
//     const { listingId } = req.params;

//     // Validate listing ID
//     if (!mongoose.Types.ObjectId.isValid(listingId)) {
//       return res.status(400).json({ error: "Invalid listing ID" });
//     }

//     const listing = await Listing.findById(listingId).populate("creator");

//     if (!listing) {
//       return res.status(404).json({ message: "Listing not found!" });
//     }

//     res.status(202).json(listing);
//   } catch (err) {
//     console.error("Error fetching listing details:", err); // Log the error for debugging
//     res.status(404).json({ message: "Failed to fetch listing details", error: err.message });
//   }
// });

// module.exports = router;
//END OF FIRST TRY
// const router = require("express").Router();
// const multer = require("multer");

// const Listing = require("../models/Listing");
// const User = require("../models/User")
// const jwt = require("jsonwebtoken");

// /* Configuration Multer for File Upload */
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/uploads/"); // Store uploaded files in the 'uploads' folder
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname); // Use the original file name
//   },
// });

// const upload = multer({ storage });

// /* CREATE LISTING */
// router.post("/create",requireAuth, upload.array("listingPhotos"), async (req, res) => {
//   try {
//     const hardcodedCreatorId = "67f6f99b5420e49d42b8fb94"; 
//     /* Take the information from the form */
//     const {
//       creator,
//       category,
//       type,
//       streetAddress,
//       aptSuite,
//       city,
//       province,
//       country,
//       guestCount,
//       bedroomCount,
//       bedCount,
//       bathroomCount,
//       amenities,
//       title,
//       description,
//       highlight,
//       highlightDesc,
//       price,
//     } = req.body;
   
//     const listingPhotos = req.files

//     if (!listingPhotos) {
//       return res.status(400).send("No file uploaded.")
//     }

//     const listingPhotoPaths = listingPhotos.map((file) => file.path)

//     const newListing = new Listing({
//       // creator,
//       creator:hardcodedCreatorId ,
//       category,
//       type,
//       streetAddress,
//       aptSuite,
//       city,
//       province,
//       country,
//       guestCount,
//       bedroomCount,
//       bedCount,
//       bathroomCount,
//       amenities,
//       listingPhotoPaths,
//       title,
//       description,
//       highlight,
//       highlightDesc,
//       price,
//     })

//     await newListing.save()

//     res.status(200).json(newListing)
//   } catch (err) {
//     res.status(409).json({ message: "Fail to create Listing", error: err.message })
//     console.log(err)
//   }
// });

// /* GET lISTINGS BY CATEGORY */
// router.get("/", async (req, res) => {
//   const qCategory = req.query.category

//   try {
//     let listings
//     if (qCategory) {
//       listings = await Listing.find({ category: qCategory }).populate("creator")
//     } else {
//       listings = await Listing.find().populate("creator")
//     }

//     res.status(200).json(listings)
//   } catch (err) {
//     res.status(404).json({ message: "Fail to fetch listings", error: err.message })
//     console.log(err)
//   }
// })

// /* GET LISTINGS BY SEARCH */
// router.get("/search/:search", async (req, res) => {
//   const { search } = req.params

//   try {
//     let listings = []

//     if (search === "all") {
//       listings = await Listing.find().populate("creator")
//     } else {
//       listings = await Listing.find({
//         $or: [
//           { category: {$regex: search, $options: "i" } },
//           { title: {$regex: search, $options: "i" } },
//         ]
//       }).populate("creator")
//     }

//     res.status(200).json(listings)
//   } catch (err) {
//     res.status(404).json({ message: "Fail to fetch listings", error: err.message })
//     console.log(err)
//   }
// })

// /* LISTING DETAILS */
// router.get("/:listingId", async (req, res) => {
//   try {
//     const { listingId } = req.params
//     const listing = await Listing.findById(listingId).populate("creator")
//     res.status(202).json(listing)
//   } catch (err) {
//     res.status(404).json({ message: "Listing can not found!", error: err.message })
//   }
// })
// const requireAuth = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader) {
//     return res.status(401).json({ error: "Authorization header missing" });
//   }

//   const token = authHeader.split(" ")[1];
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = { id: decoded.userId }; // Set req.user.id
//     next();
//   } catch (err) {
//     return res.status(401).json({ error: "Invalid or expired token" });
//   }
// };


// module.exports = router

//END OF SECOND TRY
// const router = require("express").Router();
// const multer = require("multer");
// const Listing = require("../models/Listing");
// const User = require("../models/User")
// const jwt = require("jsonwebtoken");

// /* AUTHENTICATION MIDDLEWARE - DEFINE THIS FIRST */
// const requireAuth = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader) {
//     return res.status(401).json({ error: "Authorization header missing" });
//   }

//   const token = authHeader.split(" ")[1];
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = { id: decoded.userId }; // Set req.user.id
//     next();
//   } catch (err) {
//     return res.status(401).json({ error: "Invalid or expired token" });
//   }
// };

// /* Configuration Multer for File Upload */
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/uploads/"); // Store uploaded files in the 'uploads' folder
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname); // Use the original file name
//   },
// });

// const upload = multer({ storage });

// /* CREATE LISTING */
// router.post("/create", requireAuth, upload.array("listingPhotos"), async (req, res) => {
//   try {
//     const hardcodedCreatorId = "67f6f99b5420e49d42b8fb94"; 
//     /* Take the information from the form */
//     const {
//       creator,
//       category,
//       type,
//       streetAddress,
//       aptSuite,
//       city,
//       province,
//       country,
//       guestCount,
//       bedroomCount,
//       bedCount,
//       bathroomCount,
//       amenities,
//       title,
//       description,
//       highlight,
//       highlightDesc,
//       price,
//     } = req.body;
   
//     const listingPhotos = req.files

//     if (!listingPhotos) {
//       return res.status(400).send("No file uploaded.")
//     }

//     const listingPhotoPaths = listingPhotos.map((file) => file.path)

//     const newListing = new Listing({
//       // creator,
//       creator: hardcodedCreatorId,
//       category,
//       type,
//       streetAddress,
//       aptSuite,
//       city,
//       province,
//       country,
//       guestCount,
//       bedroomCount,
//       bedCount,
//       bathroomCount,
//       amenities,
//       listingPhotoPaths,
//       title,
//       description,
//       highlight,
//       highlightDesc,
//       price,
//     })

//     await newListing.save()

//     res.status(200).json(newListing)
//   } catch (err) {
//     res.status(409).json({ message: "Fail to create Listing", error: err.message })
//     console.log(err)
//   }
// });

// /* GET lISTINGS BY CATEGORY */
// router.get("/", async (req, res) => {
//   const qCategory = req.query.category

//   try {
//     let listings
//     if (qCategory) {
//       listings = await Listing.find({ category: qCategory }).populate("creator")
//     } else {
//       listings = await Listing.find().populate("creator")
//     }

//     res.status(200).json(listings)
//   } catch (err) {
//     res.status(404).json({ message: "Fail to fetch listings", error: err.message })
//     console.log(err)
//   }
// })

// /* GET LISTINGS BY SEARCH */
// router.get("/search/:search", async (req, res) => {
//   const { search } = req.params

//   try {
//     let listings = []

//     if (search === "all") {
//       listings = await Listing.find().populate("creator")
//     } else {
//       listings = await Listing.find({
//         $or: [
//           { category: {$regex: search, $options: "i" } },
//           { title: {$regex: search, $options: "i" } },
//         ]
//       }).populate("creator")
//     }

//     res.status(200).json(listings)
//   } catch (err) {
//     res.status(404).json({ message: "Fail to fetch listings", error: err.message })
//     console.log(err)
//   }
// })

// /* LISTING DETAILS */
// router.get("/:listingId", async (req, res) => {
//   try {
//     const { listingId } = req.params
//     const listing = await Listing.findById(listingId).populate("creator")
//     res.status(202).json(listing)
//   } catch (err) {
//     res.status(404).json({ message: "Listing can not found!", error: err.message })
//   }
// })

// module.exports = router
//END OF THIRD TRYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY
const router = require("express").Router();
const multer = require("multer");
const Listing = require("../models/Listing");
const User = require("../models/User")
const jwt = require("jsonwebtoken");

/* AUTHENTICATION MIDDLEWARE - DEFINE THIS FIRST */
const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header missing" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //req.user = { id: decoded.userId || "67f6f99b5420e49d42b8fb94" }; // Set req.user.id
    req.user = {
      id: decoded.userId || decoded._id || "67f6dff5f55ee6419bd35f77"
    };
    
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: "Token expired", expired: true });
    }
    return res.status(401).json({ error: "Invalid token" });
  }
};

/* Configuration Multer for File Upload */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/"); // Store uploaded files in the 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Use timestamp + original name
  },
});

const upload = multer({ storage });

/* CREATE LISTING */
router.post("/create", upload.array("listingPhotos"), async (req, res) => {
  try {
    // Use req.user.id instead of hardcoded ID
    const creatorId = "67f6dff5f55ee6419bd35f77";// TODO:FIX THIS - SHOULD FETCH OBJECTID DYNAMICALLY  
    console.log( "response of request body" ,req.body);
    /*_ibject_id
    /* Take the information from the form */
    const {
      category,
      streetAddress,
      aptSuite,
      city,
      state,
      pincode,
      amenities,
      title,
      description,
      highlight,
      highlightDesc,
    } = req.body;
   
    const listingPhotos = req.files;

    if (!listingPhotos || listingPhotos.length === 0) {
      return res.status(400).json({ error: "No files uploaded." });
    }

    const listingPhotoPaths = listingPhotos.map((file) => file.path);

    // Check for duplicate title
    const existingListing = await Listing.findOne({ title });
    if (existingListing) {
      return res.status(409).json({ error: "A listing with this title already exists" });
    }

    const newListing = new Listing({
      creator: creatorId,
      category,
      streetAddress,
      aptSuite,
      city,
      state,
      pincode,
      amenities,
      listingPhotoPaths,
      title,
      description,
      highlight,
      highlightDesc,
    });

    await newListing.save();

    res.status(200).json(newListing);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ error: "Duplicate listing detected" });
    }
    res.status(500).json({ message: "Failed to create listing", error: err.message });
    console.log(err);
  }
});

/* GET lISTINGS BY CATEGORY */
router.get("/", async (req, res) => {
  const qCategory = req.query.category;

  try {
    let listings;
    if (qCategory) {
      listings = await Listing.find({ category: qCategory }).populate("creator");
    } else {
      listings = await Listing.find().populate("creator");
    }

    res.status(200).json(listings);
  } catch (err) {
    res.status(404).json({ message: "Failed to fetch listings", error: err.message });
    console.log(err);
  }
});

/* GET LISTINGS BY SEARCH */
router.get("/search/:search", async (req, res) => {
  const { search } = req.params;

  try {
    let listings = [];

    if (search === "all") {
      listings = await Listing.find().populate("creator");
    } else {
      listings = await Listing.find({
        $or: [
          { category: {$regex: search, $options: "i" } },
          { title: {$regex: search, $options: "i" } },
        ]
      }).populate("creator");
    }

    res.status(200).json(listings);
  } catch (err) {
    res.status(404).json({ message: "Failed to fetch listings", error: err.message });
    console.log(err);
  }
});

/* LISTING DETAILS */
router.get("/:listingId", async (req, res) => {
  try {
    const { listingId } = req.params;
    const listing = await Listing.findById(listingId).populate("creator");
    res.status(202).json(listing);
  } catch (err) {
    res.status(404).json({ message: "Listing cannot be found!", error: err.message });
  }
});

module.exports = router
