const router = require("express").Router()

const Booking = require("../models/Booking")
const User = require("../models/User")
const Listing = require("../models/Listing")

/* GET TRIP LIST */
// router.get("/:userId/:trips", async (req, res) => {
//   try {
//     const { userId } = req.params
//     const trips = await Booking.find({ customerId: userId }).populate("customerId hostId listingId")
//     res.status(202).json(trips)
//   } catch (err) {
//     console.log(err)
//     res.status(400).json({ message: "Can not find trips!", error: err.message })
//   }
// })

  // router.get("/:userId/:trips", async (req, res) => {
  //   try {
  //     const { userId } = req.params;
  //     const trips = await Booking.find({ customerId: userId }).populate("customerId hostId listingId");

  //     console.log("Trips fetched for user:", userId);
  //     console.log("Trips Data:", trips); // ✅ Console log added

  //     res.status(200).json({ tripList: trips }); // ✅ Send wrapped in object
  //   } catch (err) {
  //     console.error("Error fetching trips:", err.message);
  //     res.status(400).json({ message: "Can not find trips!", error: err.message });
  //   }
  // });

  const mongoose = require("mongoose");

router.get("/:userId/:trips", async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("User ID received:", userId);

    // Convert string userId to ObjectId
    const objectUserId = new mongoose.Types.ObjectId(userId);

    // Direct access to the `bookings` collection in `community-volunteering`
    const bookingsCollection = mongoose.connection.db.collection("bookings");

    // Find all bookings where hostId == userId
    const bookings = await bookingsCollection.find({ hostId: objectUserId }).toArray();

    console.log("Bookings found:", bookings.length);
    console.log("Bookings Data:", bookings);

    res.status(200).json({ tripList: bookings });
  } catch (err) {
    console.error("Error fetching bookings:", err.message);
    res.status(400).json({ message: "Cannot fetch bookings!", error: err.message });
  }
});


/* ADD LISTING TO WISHLIST */
router.patch("/:userId/:listingId", async (req, res) => {
  try {
    const { userId, listingId } = req.params
    const user = await User.findById(userId)
    const listing = await Listing.findById(listingId).populate("creator")

    const favoriteListing = user.wishList.find((item) => item._id.toString() === listingId)

    if (favoriteListing) {
      user.wishList = user.wishList.filter((item) => item._id.toString() !== listingId)
      await user.save()
      res.status(200).json({ message: "Listing is removed from wish list", wishList: user.wishList})
    } else {
      user.wishList.push(listing)
      await user.save()
      res.status(200).json({ message: "Listing is added to wish list", wishList: user.wishList})
    }
  } catch (err) {
    console.log(err)
    res.status(401).json({ error: err.message })
  }
})

/* GET PROPERTY LIST */
router.get("/:userId/:properties", async (req, res) => {
  try {
    const { userId } = req.params
    const properties = await Listing.find({ creator: userId }).populate("creator")
    res.status(202).json(properties)
  } catch (err) {
    console.log(err)
    res.status(402).json({ message: "Can not find properties!", error: err.message })
  }
})

/* GET RESERVATION LIST */
router.get("/:userId/:reservations", async (req, res) => {
  try {
    const { userId } = req.params
    const reservations = await Booking.find({ hostId: userId }).populate("customerId hostId listingId")
    res.status(202).json(reservations)
  } catch (err) {
    console.log(err)
    res.status(403).json({ message: "Can not find reservations!", error: err.message })
  }
})


module.exports = router