
const User=require("../model/user.js");


module.exports.userSave=async (req, res) => {
    try {
      let { username, email, password } = req.body;
      
      let NewUser = new User({ email, username });
      let registeredUser = await User.register(NewUser, password);
      req.login(registeredUser,(err)=>{
        if(err){
          next(err);
        }
        req.flash("success","Welcome to TripNest")
        res.redirect("/listing");
      });
      
    } catch (error) {
      req.flash("error",error.message);
        res.redirect("/signup");
    }
  };

  module.exports.loginPage=(req, res) => {
    res.render("listing/user/login.ejs");
  };
  
  module.exports.loginCheck=async (req, res) => {
    req.flash("success","Welcome to tripNext");
    let Redirected=res.locals.redirectUrl||"/listing";
    res.redirect(Redirected);
  };

  module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
       if(err){
         return next(err);
       }
       req.flash("flash","logged you out");
       res.redirect("/listing");
    });
 };