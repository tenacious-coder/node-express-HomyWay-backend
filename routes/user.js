const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");

//const {saveRedirectUrl} = require("../middleware.js")



router.get("/signup",(req,res)=>{
    res.render("users/signup.ejs")
})

router.post("/signup", async(req,res)=>{
    try{
    let{username , email, password} = req.body;
    const newUser = new User({email, username});
    const registeredUsers = await User.register(newUser , password);
    console.log(registeredUsers);
    req.login(registeredUser, (err)=>{
        if(err){
            return next(err);
        }
         req.flash("success", "Welcome back to wanderlust");
        res.redirect("/listings");
    })
    } catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}
);

router.get("/login",
     (req,res)=>{
    res.render("users/login.ejs");
})
router.post(
    "/login", 
    // saveRedirectUrl,
    passport.authenticate("local",{
        failureRedirect: "/login",
        failureFlash: true,
    }),
        async(req,res)=>{
            const redirectUrl =req.session.redirectUrl || "/listings";
            delete req.session.redirectUrl;
            res.redirect(redirectUrl);
    // req.flash("success", "Welcome back to wanderlust");
    //     res.redirect("/req.locals.redirectUrl");
        
    });

router.get("/logout",(req, res)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","logged you out!");
        res.redirect("/listings");
    });
});


module.exports = router;