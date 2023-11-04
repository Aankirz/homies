import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup=async (req,res,next)=>{
    const {username,email,password}=req.body;
    const hashedPassword=bcryptjs.hashSync(password,10)
    const newUser = new User({
        username,
        email,
        password:hashedPassword,
    });
    try{
    await newUser.save(); // save it in the database 
    res.status(201).json(`User created successfully: ${newUser}`)
     }catch(error){
         next(errorHandler(550,`Hello ERRORS HERE: ${error.message}`));
        }
}

export const signin=async (req,res,next)=>{
   const {email,password}=req.body;
   try{
    const validUser=await User.findOne({email});
    if(!validUser){
        return next(errorHandler(404,'User not found'))
    }
    
    const validPassword=bcryptjs.compareSync(password,validUser.password);
    
    if(!validPassword)
    return next(errorHandler(401,'Invalid password'))
    

    const token=jwt.sign({id:validUser._id},process.env.JSONWEBTOKEN);
    const {password:pass,...rest}=validUser._doc;
    res.cookie('access_token',token,{httpOnly:true})
       .status(200)
       .json(rest);

   }catch(e){
    next(errorHandler(550,`Hello ERRORS HERE: ${e.message}`));
   }

}