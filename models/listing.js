const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const review = require("./review.js");
const booking = require("./booking.js");

const listingSchema= new Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image:{
        filename:String,
        url:String,
        
    },
   
    price:Number,
    location:String,
    country:String,
    reviews:[
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User", 
    },
    geometry: {
     type: {
      type: String, // 'Point'
      enum: ['Point'],
      default: 'Point'
  },
   bookings: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking"
  }
},
// category:{
//     type:[String],
//     enum: ["Trending", "Rooms", "Mountains", "Swimming", "Camping", "Farms", "Arctic" ]
// }
 });

listingSchema.post("findOneAndDelete", async(listing) =>{  // this deletes the reviews of that particular post
    if(listing) {
        await review.deleteMany({_id:{ $in: listing.reviews }});
    }
});

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;
