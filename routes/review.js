const express=require("express");
const router=express.Router({mergeParams: true});
const wrapAsync=require("../utils/wrapAsync.js");
const {reviewSchema}=require("../schema.js");
const Review= require("../models/review.js");
const Listing= require("../models/listing.js");
const {isLoggedIn,isReviewAuthor}=require("../middleware.js");
const {createReview,deleteReview}=require("../controllers/reviews.js");
const validateReview=(req,res,next)=>{
    let result= reviewSchema.validate(req.body);
    if(result.error){
       next(new ExpressError(400,result.error));
    }
    else{
       next();
    }
};

//post Review Route
router.post("/",isLoggedIn,validateReview,wrapAsync(createReview));

//Delete Review Route
router.delete("/:reviewId",isReviewAuthor,wrapAsync(deleteReview));

module.exports= router;