import { nextTick } from 'process';
import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';


export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // Create a new user instance. 
    const newUser = new User({ username, email, password: hashedPassword });
    try {
        // Save the new user to the database.
        await newUser.save();

        // Respond with status code 201 and a message.
        res.status(201).json("User created successfully");
    } catch (error) {
        next(error);
    }
    
};