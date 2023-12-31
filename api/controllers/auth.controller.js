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
         next(errorHandler(550,`HELLO ERRORS HERE: ${error.message}`));
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

export const google=async (req,res,next)=>{
  try{
    //  console.log(req.body,"Hello1")
     const user = await User.findOne({email:req.body.email})
    //  console.log(user,"HELLO 2")
     if(user){
        const token = jwt.sign({id:user._id},process.env.JSONWEBTOKEN);
        const {password:pass,...rest} = user._doc;
        console.log(user._doc,"HELLO 3")
        res.cookie('access_token',token,{httpOnly:true})
           .status(200)
           .json(rest);
     }else{
        const generatePassword=Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8);
        const hashedPassword=bcryptjs.hashSync(generatePassword,10)
        const newUser = new User({
           username:req.body.name.split(' ').join('').toLowerCase(),
           email:req.body.email,
           password:hashedPassword,
           avatar: req.body.photo,
        })

        await newUser.save();
        console.log(newUser,"HELLO 4")
        const token = jwt.sign({id:newUser._id},process.env.JSONWEBTOKEN);
        const {password:pass,...rest} = newUser._doc;
        res.cookie('access_token',token,{httpOnly:true})
           .status(200)
           .json(rest);
        // console.log(rest,"HELLO 5")   
     }
  }catch(error){
    // console.log("NO HELLO")
    next(error)
  }
}

export const signOut = async (req,res,next)=>{
   try{
      res.clearCookie('access_token')
         .status(200)
         .json({message:"Sign out successfully"})
   }catch(err){
      next(err)
   }
}