import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';


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

// SIGN IN API CONTROLLER FUNCTION OR LOGIC

export const signIn =async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorHandler(404, 'User not Found!'));
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, 'Wrong Credentials !'));
        // Create Access Token or cookie with jsonwebtoken
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = validUser._doc;
        res
            .cookie('access_token', token, {httpOnly: true})
            .status(200)
            .json(rest);
    
    } catch (error) {
        next(error);
    }
};