import Listing from "../models/listing.model.js"

export const createListing = async (req,res,next)=>{
    try{
       const listing = await Listing.create(req.body)
       console.log(listing)
       res.status(201).json(listing)
    }catch(error){
        console.log(error,"CREATE LISTING")
        next(error)
    }
}