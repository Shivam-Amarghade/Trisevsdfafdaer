const mongoose = require("mongoose");
const Schema=mongoose.Schema;
const Review=require("./review.js");
const { required } = require("joi");

const listingSchema = new Schema({
    title:{
      type :String,
      required:true,
    } ,
    description: String,
    price: Number,
    location: String,
    country: String,
    image: {
      url:String,
      filename:String
    },
    reviews:[
      {
       type :Schema.Types.ObjectId,
       ref:"Review"
      }
    ],
    Owner:{
      type:Schema.Types.ObjectId,
      ref:"User",
    },
    category: {
      type: String,
      enum: ["castle","pool","mountains","iconic_cities", "room", "fram", "camping","lake","snowflake"],
      required: true
    }
  });
listingSchema.post("findByIdAndDelete",async(listing)=>{
  if(listing){
        await Review.deleteMany({_id:{$in:listing.reviews}});
  }
});

const Listing = mongoose.model("Listings", listingSchema);

module.exports = Listing;
