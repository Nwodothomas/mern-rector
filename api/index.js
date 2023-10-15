import express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
dotenv.config();

const app = express();

//connect database
mongoose.connect(process.env.MONGO).then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB:', err);
  });

app.listen(3000, () => {
    console.log('server is running on port 3000');
});

// Test api routes 
app.use('/api/user', userRouter);
