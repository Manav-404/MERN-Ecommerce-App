const express = require("express");
const {check} = require("express-validator")
const router  = express.Router();
const {signout , signin , signup , isSignedIn} = require("../controllers/auth")

 router.get("/signout" , signout);

router.post("/signup" ,[
    check("name").isLength({min:3}).withMessage("Name should be at least 3 characters"),
    check("email").isEmail().withMessage("Email is required"),
    check("password").isLength({min:3}).withMessage("Password should be at least 3 characters")
], signup);


router.post("/signin" ,[
    check("email").isEmail().withMessage("Email is required/invalid"),
    check("password").isLength({min:3}).withMessage("Password is required")
], signin);


module.exports = router;