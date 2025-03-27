
const express=require("express");
const router=express.Router();
const wrapAsync = require("../utile/WrapAsync.js");
const expressError = require("../utile/expressErro..js");
const { listingSchema, reviewSchema} = require("../schema.js");
const Listing = require("../model/listing.js");
const session=require("express-session");
const flash=require("connect-flash");
const{isLoggedIn, isOwner,validateListing}=require("../middleware.js");
const controllerListing= require("../controller/listings.js");

const {upload}=require("../cloud.js");



// Route for displaying all listings
router.get("/",controllerListing.index );

// New route
router.get("/new",isLoggedIn,controllerListing.newlisting);

// Create route
router.post("/",isLoggedIn,upload.single("listing[image]"),validateListing,wrapAsync(controllerListing.createlisting));

// Edit route
router.get("/:id/edit",isOwner,isLoggedIn,wrapAsync(controllerListing.editilisting));

// Show route
router.get("/:id",wrapAsync(controllerListing.showlisting));

// Update route
router.put("/:id",isOwner,isLoggedIn,upload.single("listing[image]"),validateListing,wrapAsync(controllerListing.updatelisting));

// Delete route
router.post("/:id",isLoggedIn,isOwner, wrapAsync(controllerListing.deletelisting));
//
// filter
router.get("/filter/:category",wrapAsync(controllerListing.filters));
//search
router.get("/search/item",wrapAsync(controllerListing.Search));
// booking
router.get("/booking/:id", wrapAsync(async(req,res)=>{
    let{id}=req.params;
    let{checkin ,checkout}=req.body;
     let User=await Listing.findById(id);   
      
    res.render("listing/booking/BookPage",{checkin,checkout,User});
}));

module.exports=router;