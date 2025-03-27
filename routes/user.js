const express=require("express");
const WrapAsync = require("../utile/WrapAsync");
const router=express.Router();
const wrapAsync = require("../utile/WrapAsync.js");
const User=require("../model/user.js");
const passport=require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const controllUser=require("../controller/users.js");
// /signup
router.get("/signup",(req,res)=>{
       res.render("listing/user/signup.ejs");
});

// save user new
router.post("/signup", WrapAsync(controllUser.userSave));

// login//
 
router.get("/login", controllUser.loginPage );


//  login check
router.post("/login",saveRedirectUrl,passport.authenticate('local', {
    failureRedirect: '/login',   
    failureFlash: true           
  }),
  controllUser.loginCheck
);

// logout
router.get("/logout",controllUser.logout);


  
module.exports=router;