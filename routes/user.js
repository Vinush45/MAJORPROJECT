const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const User=require("../models/user.js");
const passport=require("passport");
const {saveRedirectUrl}=require("../middleware.js");
const {signup,renderSignupForm,loginForm,login,logout}=require("../controllers/users.js");

router.route("/signup")
.get(renderSignupForm)
.post(wrapAsync(signup));

router.route("/login")
.get(loginForm)
.post(saveRedirectUrl,passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),wrapAsync(login));

// logout route 
router.get("/logout",logout);
module.exports=router;