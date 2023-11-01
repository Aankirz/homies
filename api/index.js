import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGO)
.then(()=>console.log('DB is connected'))
.catch(err=>console.log(err));

const app=express();

app.listen(3000,()=>{
    console.log("Server on port 3000")
})

app.use(express.json())

app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)

app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500;
    const message=err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})
