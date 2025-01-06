const User = require('../models/user')
const {setUser} = require("../service-diary/auth")
const {v4 : uuidv4} = require("uuid")

// Signup
const handleUserSignUp =  async (req , res) => {
  const {name , email , password}  =  req.body;
 const user =  await User.create({
    name, 
    email,
    password,
    
  })
if(!user) return res.status(500).json({error: "Server side redering for creating user"})
  
  return res.redirect("/")
    
}

//login
const handleUserLogIn =  async (req , res) => {
    console.log("login ke andar aa gya")
  const {email , password}  =  req.body;
 const user = await User.findOne({
    email,
    password
 })
 console.log(user)
if(!user) return res.status(400).redirect('/login') 

    // const sessionId = uuidv4()
    // setUser(sessionId,user)
    // res.cookie("uid" , sessionId)
    const token =  setUser(user)
    res.cookie("token" , token)
  return res.redirect("/")
    
}



module.exports = {
    handleUserSignUp,
    handleUserLogIn,
}