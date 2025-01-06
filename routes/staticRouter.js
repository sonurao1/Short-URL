const express = require("express")
const URL = require("../models/url");
const User = require("../models/user")
const { restrictTo } = require("../middlewares/auth");
const router  = express.Router();


router.get("/admin" , restrictTo(["ADMIN"]) ,  async (req , res) => {
   const allUrls = await URL.find({})
   const users = await Promise.all(allUrls.map(async (url) => User.find({ _id: url.createdBy })));
   const allUsersName = users.map(user => user[0].name)
  
   console.log(allUsersName)
    return res.render("home" , {
        urls : allUrls,
        role: "ADMIN",
        usersName: allUsersName,
    })
})
router.get("/" , restrictTo(["NORMAL" , "ADMIN"]) ,  async (req , res) => {
   const allUrls = await URL.find({createdBy: req.user?._id})
    return res.render("home" , {
        urls : allUrls,
    })
})

router.get("/signup" , (req , res) => {
    return res.render("signup")
  })
  
router.get("/login" , (req , res) => {
    return res.render("login")
  })
  

module.exports = router;