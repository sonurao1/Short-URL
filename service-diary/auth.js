// const sessionIdMapToUser = new Map();


// function setUser (id , user){
//     sessionIdMapToUser.set(id , user)
//     console.log(sessionIdMapToUser)
// }


// function getUser(id){
//    return  sessionIdMapToUser.get(id)
// }


// stateless with json web token -------- -------------------------

const jwt = require("jsonwebtoken");
const secret = "Sonu@077"


function setUser (user){
    
      return  jwt.sign({
            _id : user._id,
            email: user.email,
            role: user.role,
        } , secret)
    
}


function getUser  (token){
   try {
    return jwt.verify(token , secret)
   } catch (error) {
    
   }
}








module.exports = {
    setUser,
    getUser,
} 

