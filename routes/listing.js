const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner , validateListing} = require("../middleware.js")
const Listing = require("../models/listing.js");
//const listingController = require("../controllers/listings.js");

// index route
router.get("/",wrapAsync(async(req, res)=>{
   const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
}));

//new route
router.get("/new", isLoggedIn, (req, res)=>{
  res.render("listings/new.ejs");
});
  
//show route
router.get("/:id",  wrapAsync,(async(req,res) => {
let {id} = req.params;
const listing = await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
if(!listing){
  req.flash("error","Listing not found");
  return res.redirect("/listings")
}
res.render("listings/show.ejs", { listing });
}));


//create route
  router.post("/",isLoggedIn ,validateListing, wrapAsync(async (req,res,next) =>{
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    req.flash("success", "New Listing Created");
    res.redirect("/listings");
  })
  );


//edit route
 router.get("/:id/edit", isLoggedIn ,
  isOwner,
  validateListing, wrapAsync(async(req,res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
  
    res.render("listings/edit.ejs", { listing });
  })
);

//update route
router.put("/:id", isLoggedIn,
  isOwner,
   validateListing, wrapAsync (async(req , res) => {
    let {id} =  req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    req.flash("success", "New Listing updated");
    res.redirect(`/listings/${id}`);
   }));

//del route
router.delete("/:id", isLoggedIn ,isOwner, wrapAsync(async (req, res)=>{
  let {id} =  req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing deleted");
  res.redirect("/listings");
}))
;

module.exports = router;