if(process.env.NODE_ENV!="production"){
    require("dotenv").config();
}
 
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./model/listing.js"); // Ensure correct path
const Review = require("./model/review.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const port =8080;
const wrapAsync = require("./utile/WrapAsync.js");
const expressError = require("./utile/expressErro..js");
const { listingSchema, reviewSchema} = require("./schema.js");



const session = require("express-session");
const flash = require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./model/user.js");




// Session setup (पहले session middleware सेट करें)
const sessionOption = {
    secret: "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // ✅ सही तरीक़ा
        maxAge: 7 * 24 * 60 * 60 * 1000, // ✅ 7 दिन
        httpOnly: true
    }
};
app.use(session(sessionOption));
// Flash middleware (अब इसे session के बाद रखें)
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());





// Global middleware for flash messages
app.use((req, res, next) => {
    res.locals.successMsg = req.flash("success"); 
    res.locals.errorMsg = req.flash("error");
    res.locals.loginOrnot=req.user;
     next();
});






const listingRouter=require("./routes/listing.js");
const reviewRouter=require("./routes/reviews.js");
const userRouter=require("./routes/user.js");
const Booking=require("./routes/Booking.js");
const { linkSync } = require("fs");




// Middleware
app.use(express.json());
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));




// Setting EJS
app.set("view engine", "ejs");

// Setting views directory
app.set("views", path.join(__dirname, "views"));

// Databases connection
async function main() {
    await mongoose.connect("mongodb+srv://buntymali99810:9981022296@Shivam@cluster0.sxp4urq.mongodb.net/",{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}

main()
    .then(() => {
        console.log("Connected to database");
    })
    .catch((err) => {
        console.log("Database connection error:", err);
    });

    
   
    

    app.use("/listing", listingRouter);
    app.use("/listing/:id/reviews",reviewRouter);
    app.use("/",userRouter);
   
    
    app.get("/booking/:id", async(req,res)=>{
      let {id}=req.params;
      let {checkin,checkout,guests}=req.query;
      let userName =user.name;
      let checkinDate = new Date(checkin);
      let checkoutDate = new Date(checkout);
      if (isNaN(checkinDate) || isNaN(checkoutDate)) {
        req.flash("error", "Invalid Date Format");
        return res.redirect(`/listing/${id}`);
    }
    if (checkinDate >= checkoutDate) {
        req.flash("error", "Choose Correct Date");
        return res.redirect(`/listing/${id}`);
    }

    let listing = await Listing.findById(id);
    let totalDays = (checkoutDate - checkinDate) / (1000 * 60 * 60 * 24);
    let withoutGstAmount = totalDays * listing.price;
    const totalamount = withoutGstAmount + withoutGstAmount * 0.18;
     
      
      console.log(totalamount);

      res.render("listing/booking/bookPage.ejs",{checkin,checkout,guests,listing,totalamount, userName});
      

  });
    
      


app.all("*", (req, res, next) => {
    next(new expressError(404, "page is not found"));
    
});

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong" } = err;
    console.log(message);
    res.status(statusCode).render("listing/error.ejs", { message });
});

// Start server
app.listen(port, () => {
    console.log("Server started on port 8080");
});