import {URL} from "../models/url.model.js";
import shortid from "shortid"

const urlController = {
    handleGenerateNewShortURL : async(req,res) => {
        const body = req.body;
        if(!body.url) return res.status(400).json({error : "url is required"});
        const shortId = shortid();

        const dbresponse = await URL.create({
            shortId,
            redirectURL : body.url,
            visitHistory : []
        })
        console.log("avo");
        
        return res.status(200).json({
            id : shortId
        })
    },

    handleRedirectRequest: async (req, res) => {
        const shortId = req.params.shortId;
        if (!shortId) {
            return res.status(400).json({ error: "url id required" });
        }
    
        const obj = await URL.findOneAndUpdate(
            { shortId },
            { $push: { visitHistory: { timestamp: Date.now() } } },
            {new : true}
        );
    
        if (!obj) {
            return res.status(404).json({ error: "URL not found" });
        }
        
        return res.redirect(`https://${obj.redirectURL}`);
    },

    handleAnalysisRequest : async(req,res) => {
        const shortId = req.params.shortId;
        if(!shortId) return res.status(400).json({error : "short ID is required"})
        
        const dbresponse = await URL.findOne({shortId});
        
        if(dbresponse) return res.status(200).json({visitCount : dbresponse.visitHistory.length})
    }
    
}

export {
    urlController
}