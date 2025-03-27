module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in to create list");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

const Listing = require("./model/listing.js"); 

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);

   
    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }

  
    if (!res.locals.loginOrnot) {
        req.flash("error", "You must be logged in!");
        return res.redirect("/login");
    }

   
    if (!listing.Owner.equals(res.locals.loginOrnot._id)) {
        req.flash("error", "You don't have permission to edit");
        return res.redirect(`/listing/${id}`);
    }

    next(); 
};
const expressError = require("./utile/expressErro..js");
const { listingSchema, reviewSchema} = require("./schema.js");

module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        throw new expressError(400,error.details ? error.details[0].message : error.message);
    } else {
        next();
    }
};


module.exports.validatereview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        throw new expressError(400,error.details ? error.details[0].message : error.message);
    } else {
        next();
    }
};