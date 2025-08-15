const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {storage} = require("../cloudConfig.js");


 router.get("/category/:categoryName",async (req,res)=>{
    // let filter = {};
    // if(require.query.category){
    //     filter.category= req.query.category;
    // }

   
     const {categoryName} = req.params;
     console.log("Category Requested:",categoryName);

     
  try{
  const allListings= await Listing.find({categoryName});
  res.render("listings/index", {allListings, categoryName});
  }catch(err){
    res.status(500).send("Something went wrong");
  }
});

module.exports = router;