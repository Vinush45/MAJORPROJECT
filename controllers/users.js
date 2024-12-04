const User= require("../models/user.js")
module.exports.renderSignupForm=(req,res)=>{
  res.render("users/signup.ejs");
};

module.exports.signup=async(req,res)=>{
    try{
     let newUser=req.body;
     let{password}=req.body;
     const user= await User.register(newUser,password);
      //console.log(user);
      req.login(user,(err)=>{
        if(err){
          return next(err);
        }
        req.flash("success","welcome to wnaderlust");
      res.redirect("/listings");
  
      });
      
    }
    catch(e){
     req.flash("error",e.message);
     res.redirect("/signup");
    }
  };

 module.exports.loginForm=(req,res)=>{
    res.render("users/login.ejs");
};
 module.exports.login=async(req,res)=>{
    req.flash("success", "welcome  back to wanderlust");
    let redirectUrl=res.locals.redirectUrl || "/listings" ;
    res.redirect(redirectUrl);
};

module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
      if(err){
        next(err);
      }
      req.flash("success","you are looged out");
      res.redirect("/listings");
    })
};