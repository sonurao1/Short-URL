const express = require("express")
const urlRoute = require("./routes/url")
const staticRoute = require("./routes/staticRouter")
const URL = require("./models/url")
const user = require("./routes/user")
const path = require("path")
const cookieParser = require("cookie-parser")
const {checkForAuthentication,restrictTo} = require('./middlewares/auth')
const {connectMongoDb} = require("./connection")
const app = express();
const PORT = 8001;

//connceting mongodb
connectMongoDb("mongodb://127.0.0.1:27017/Sonu-Short-URL")
.then(() => console.log("Connect to MongoDB"))
.catch((err) => console.log("MongoDB Error: " , err))

// Step 1 --- to use ejs , first you need to tell your express that what view engine you are using ,becuase we want to do server side redering 
app.set("view engine" , "ejs")

//Step 2 --- now tell your express where are the ejs file(html file)
// you have to use path module which is use to show the path of files
app.set("views" , path.resolve("./views"))

//middleware for parsing the req.
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(checkForAuthentication)

// app.get("/" , async (req, res) => {
//     const allUrls = await URL.find({})
//     return res.render("home" , {
//         urls: allUrls,
//     })
// })
//  |
//  | 
//  ⇊

app.use("/" , staticRoute )
app.use('/user' , user)

app.use("/url" ,  restrictTo(["NORMAL" , "ADMIN"]), urlRoute)

app.get("/url/:shortId" , async (req , res) => {
    const shortId = req.params.shortId;
    const entry =    await URL.findOneAndUpdate({
        shortId
      } , {$push : {
        visitHistory: {
            timestamp: Date.now()
        },
      } })
      console.log(entry)

      res.redirect(entry.redirectURL)
})





app.listen(PORT , () => console.log(`Server started at PORT: ${PORT}  `))