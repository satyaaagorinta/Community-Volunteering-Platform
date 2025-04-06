const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    mobilenumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImagePath: {
      type: String,
      default: "",
    },
    // tripList: {
    //   type: Array,
    //   default: [],
    // },
    sentRequests: {
        type: Array,
        default: [],
      },
    wishList: {
      type: Array,
      default: [],
    },
    // propertyList: {
    //   type: Array,
    //   default: [],
    // },

    yourProfileOrEvents: {
        type: Array,
        default: [],
      },
    // reservationList: {
    //   type: Array,
    //   default: [],
    // }
    receivedRequests: {
        type: Array,
        default: [],
      }
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
