const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync = require("../utile/WrapAsync.js");
const expressError = require("../utile/expressErro..js");
const { reviewSchema} = require("../schema.js");
const Review = require("../model/review.js");
const Listing = require("../model/listing.js"); 
const{isLoggedIn}=require("../middleware.js"); 
const{validatereview}=require("../middleware.js");
const controleReviews=require("../controller/review.js");
//reviwes
//Post route
router.post("/",isLoggedIn, validatereview, wrapAsync(controleReviews.reviewPost));

router.delete("/:reviewID",isLoggedIn,wrapAsync(controleReviews.deleteReview));

module.exports=router;