const express=require("express");
const router=express.Router();
const {listingSchema}=require("../schema.js");
const ExpressError=require("../utils/ExpressError.js")
const wrapAsync=require("../utils/wrapAsync.js");
const Listing= require("../models/listing.js");
const {isLoggedIn,isOwner}=require("../middleware.js");
const {index,renderForm,showListing,createListing,editForm,updateListing,deleteListing}=require("../controllers/listings.js")
const multer=require("multer");
const {storage}=require("../cloudconfig.js");
const upload=multer({storage});


const validateListing=(req,res,next)=>{
    let result= listingSchema.validate(req.body);
    if(result.error){
       throw new ExpressError(400,result.error);
    }
    else{
       next();
    } };

    router.route("/")
    .get(wrapAsync(index)) //index route
    .post(upload.single('image'),validateListing,wrapAsync(createListing)) //create route

    //new&Create route
 router.get("/new",isLoggedIn,renderForm); 

    router.route("/:id")
    .get(wrapAsync(showListing)) //show routr
    .put(isLoggedIn,isOwner,upload.single('image'),validateListing,wrapAsync(updateListing)) //update route
    .delete(isLoggedIn,isOwner,wrapAsync(deleteListing)); //delete route

    //new&Create route
router.get("/new",isLoggedIn,renderForm); 

//Edit route
router.get("/:id/edit",isOwner,wrapAsync(editForm));


module.exports = router;