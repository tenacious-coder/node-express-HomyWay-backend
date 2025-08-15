const express = require("express");
const router = express.Router({mergeParams:true});
const Booking = require("../models/booking");
const Listing = require("../models/listing");
const { isLoggedIn } = require("../middleware");

// POST /bookings/:id
router.post("/:id", isLoggedIn, async (req, res) => {
   try{
  const { id } = req.params;
  const { checkIn, checkOut } = req.body;
  const listing = await Listing.findById(id);

  const days = Math.ceil(new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24);
  if(days<=0){
    req.flash("error","Something dates entered");
    return res.redirect(`/listings/${id}`);
  }
  if(!listing.price){
    req.flash("error","Listing price is not set");
    return res.redirect(`/listings/${id}`);
  }
  const totalPrice = days * listing.price;

  const booking = new Booking({
    listing: listing._id,
    user: req.user._id,
    checkIn,
    checkOut,
    totalPrice
  });

  await booking.save();

//   listing.booking.push(booking._id);
//   await listing.save();

  req.flash("success",'Booking created successfully');
  res.redirect(`/bookings/confirmation/${booking._id}`);
}catch(err){
  console.error(err);
  req.flash("error","Something went wrong")
  res.redirect("/listings");
}
});

router.get("/confirmation/:bookingId",isLoggedIn, async(req,res)=>{
   try{
    const booking= await Booking.findById(req.params.bookingId).populate("listing");
    if(!booking){
        req.flash("error","Booking not found");
        res.redirect("/listings");
    }
    res.render("bookings/confirmation",{ booking });
  } catch(err){
         console.error(err);
         req.flash("error","Unable to load booking information");
        res.redirect("/listings");
  }
  }
);

router.get("/my",isLoggedIn, async(req,res)=>{
  try{
     const bookings= await Booking.find({user:req.user._id}).populate("listing");
     res.render("bookings/myBookings",{ bookings });
  }catch(err){
    console.error(err);
      req.flash("error","Something went wrong");
        res.redirect("/listings");
    }
  }
);

module.exports = router;