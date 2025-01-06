const mongoose  = require("mongoose")


async function connectMongoDb(url){
    return  mongoose.connect(url) // it returns the promise
        
}

module.exports = {
    connectMongoDb
}