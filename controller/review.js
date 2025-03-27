const Review = require("../model/review.js");
const Listing = require("../model/listing.js"); 
const expressError = require("../utile/expressErro..js");

module.exports.reviewPost=async (req, res) => {
  
    const { id } = req.params;
   // Find the listing
    let listing = await Listing.findById(id);
    // Create new review
    let newReview = new Review(req.body.Review);
    newReview.author=req.user._id;
    await newReview.save();  // Save the review first

    // Add review reference to listing
    listing.reviews.push(newReview);  
    await listing.save();  // Save listing with new review
   // Redirect to the correct listing page
   req.flash("success", "New review is Created");
    res.redirect(`/listing/${id}`);
  
    console.error(error);
    next(new expressError(404, "Internal Server Error"));

};

module.exports.deleteReview=async(req,res)=>{
    let{id,reviewID}=req.params;
    
    await Listing.findByIdAndUpdate(id,{ $pull :{reviews : reviewID } } );
    await Review.findByIdAndDelete(reviewID);
    req.flash("success", "review was deleted");
    res.redirect(`/listing/${id}`);
    };