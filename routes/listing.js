const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner , validateListing} = require("../middleware.js")
const Listing = require("../models/listing.js");
//const listingController = require("../controllers/listings.js");
const {listingSchema} = require("../schema.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });
const ExpressError = require("../utils/ExpressError.js");

// index route 
router.get("/",wrapAsync(async(req, res)=>{
   const allListings = await Listing.find({});
  res.render("listings/index", { allListings });
}));

//new route
router.get("/new", isLoggedIn, (req, res)=>{
  res.render("listings/new");
});

//search route
router.get('/search',async(req,res)=>{
  const query= req.query.q;
  console.log("Search query:",query);
  try{
     const listings = await Listing.find({title:{ $regex: query, $options:'i'}})
      res.render("listings/index", {allListings: listings});
  } catch (err){
    console.log(err);
    res.redirect('/listings');
  }
});

//show route
router.get("/:id",  wrapAsync(async(req,res) => {
let {id} = req.params;
const listing = await Listing.findById(req.params.id).populate({path:"reviews", populate:{path:"author"}}).populate("owner");
if(!listing){
  req.flash("error","Listing not found");
  return res.redirect("/listings")
}
res.render("listings/show", { listing });
}));


//create route
  router.post("/", isLoggedIn, upload.single("listing[image]"),(req,res,next) =>{
    if(req.file){
      req.body.listing.image={
        url: req.file.path,
       filename: req.file.filename
      };
    }
    next();
  },
     validateListing,
     wrapAsync(async(req,res)=>{
    const newListing = new Listing(req.body.listing);
     newListing.owner = req.user._id;
    //  newListing.image = {url, filename};
    await newListing.save();
    req.flash("success", "New Listing Created");
    res.redirect("/listings");
    })
  );
  // router.post("/",upload.single("listing[image]"), (req,res)=>{
  //   res.send(req.file);
  // });


 //edit route
 router.get("/:id/edit", isLoggedIn , isOwner,
   wrapAsync(async(req,res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
     if(!listing){
    req.flash("error","Listing not found");
    return res.redirect("/listings")
 }
   let originalImageUrl = listing.image.url;
   originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_20,w_20,c_fill");
    res.render("listings/edit", {listing, originalImageUrl});
  })
 );


//update route
router.put("/:id", isLoggedIn,
  isOwner,
  upload.single("listing[image]"), (req , res, next) => {
   if(req.file){
      req.body.listing.image={
        url: req.file.path,
       filename: req.file.filename,
      };
    }
    next();
  },
    wrapAsync(async(req , res) => {
    let {id} =  req.params;
    let listing = await Listing.findById(id);
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
     await listing.save();

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