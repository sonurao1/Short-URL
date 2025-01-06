
const URL = require("../models/url")

async function handleGenerateNewShortURL(req, res){
    const { nanoid } = await import('nanoid');
    const body = req.body;
    if(!body.url) return res.status(400).json({error: "url is required"})
   
    const shortID = nanoid(8);
   
   const createdURL =  await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitedHistory: [],
        createdBy: req.user._id,
    })
    if(!createdURL) res.status(500).json({msg: "ServerSide Error for creating new url"})

        
        return res.render("home" , {
            id: shortID,
        })
    // return res.json({id: shortID})
}


async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result  = await URL.findOne({shortId});

    return res.json({
        totalClicks: result.visitHistory.length,  analytics: result.visitHistory
    });
}


module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
}