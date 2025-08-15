const express = require("express");
const router = express.Router({ mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing=require("../models/listing.js");
const {validateReview , isLoggedIn, isReviewAuthor} = require("../middleware.js");


  //review post route
  router.post("/",isLoggedIn, validateReview, wrapAsync(async(req,res)=>{
  let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    console.log(newReview);
  newReview.author = req.user._id;
    listing.reviews.push(newReview);
  
    await newReview.save();
    await listing.save(); // whenever we want to save a new item in ana existing doc then we need to save the database
     req.flash("success", "New Review Created");
   res.redirect(`/listings/${listing._id}`);
  }));
  
  //del route
  router.delete(
    "/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(async(req,res) => {
      let{ id, reviewId} = req.params;
      await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}}); // here pull signify that we can access thstbrecord that is present inside the listing inside review array
      await Review.findByIdAndDelete(reviewId);
  req.flash("success", "New Review Deleted");
      res.redirect(`/listings/${id}`);
    })
  ); 

  module.exports = router;

