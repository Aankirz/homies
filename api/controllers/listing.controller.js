import Listing from "../models/listing.model"

export const createListing = async (req,res,next)=>{
    try{
       const listing = await Listing.create(req.body)
       res.status(201).json(listing)
    }catch(error){
        console.log(error,"CREATE LISTING")
        next(error)
    }
}