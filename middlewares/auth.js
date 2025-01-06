const {getUser} = require('../service-diary/auth')


async function checkForAuthentication(req, res, next){
    console.log("yaha to aa rha hu me")
  
    const tokenCookie = req.cookies?.token;
    req.user = null;

    if(!tokenCookie) return next();

    const user = getUser(tokenCookie);

    req.user = user;
    return next();
    

}

function restrictTo(role = []){

    return function(req, res, next){
        if(!req.user) return res.redirect('/login');

        if(!role.includes(req.user.role)) return res.end("Unauthorized")

           return next()
    }
}


module.exports = {
   checkForAuthentication,
   restrictTo,
}