const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../model/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/Mytravel";

async function main() {
  await mongoose.connect(MONGO_URL);
  console.log("Connected to DB");

  await initDB(); // ✅ Call `initDB` only after DB connection is established
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data=initData.data.map((obj)=>({...obj,Owner:"67c74b73a41272df72df566f"}));
  await Listing.insertMany(initData.data);
  console.log("Data was initialized");
};

main().catch((err) => {
  console.log("Database connection error:", err);
});
