const mongoose = require("mongoose");

const uri = "mongodb+srv://user1:testpassword123@cluster0.1evj2ep.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri)
  .then(() => console.log("✅ MongoDB Connected Successfully!"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));
