import Users,{generateToken} from "../models/userModel.js";
import bcrypt from "bcryptjs";

// register new user
export const signupUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) return res.status(400).json({ message: "Not all fields have been entered." });

        let user = await Users.findOne({ email: email });
        if(user) return res.status(400).json({ message: "An account with this email already exists." });

        user = await Users.create({ email, passwordHash:password });
        await user.save();

        const token = generateToken(user._id);

        const options = {
            expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
            httpOnly: true
        };

        res.status(201).cookie("token", token, options).json({ 
            success: true,
            message: "User created successfully.",
            user,
            token
        });
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// login user
export const signinUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) return res.status(400).json({ 
            success: false,
            message: "Not all fields have been entered." });

        const user = await Users.findOne({ email: email });
        if(!user) return res.status(400).json({ 
            success: false,
            message: "Invalid credentials." });

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if(!isMatch) return res.status(400).json({ 
            success: false,
            message: "Invalid credentials." });

        const token = generateToken(user._id);

        const options = {
            expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
            httpOnly: true
        };

        res.status(200).cookie("token", token, options).json({ 
            success: true,
            message: "User logged in successfully.",
            user,
            token
        });
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const verifyUser = async (req, res) => {

    let user = await Users.findById(req.user.id);
    if(!user){
        return next(new ErrorHander("user not found",404));
    }
    
    res.status(200).json({ 
        success: true,
        message: "User verified successfully.",
        user: user
    });
};

export const logoutUser = async (req, res) => {
    try {
        res.cookie("token", "", {
            expires: new Date(Date.now()),
            httpOnly: true
        });

        res.status(200).json({ 
            success: true,
            message: "User logged out successfully."
        });
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const saveUserdetails = async (req, res) => {

    try {
        const { name, phone, github } = req.body;

        if(!name || !phone || !github) return res.status(400).json({ 
            success: false,
            message: "Not all fields have been entered." });

        let user = await Users.findById(req.user.id);
        if(!user) return res.status(400).json({ 
            success: false,
            message: "User not found." });

        user.name = name;
        user.phone = phone;
        user.github = github;

        await user.save();

        res.status(200).json({ 
            success: true,
            message: "User details saved successfully.",
            user: user
        });
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserdetails = async (req, res) => {
    
    let user = await Users.findById(req.user.id);

    
    if(!user){
        return next(new ErrorHander("user not found",404));
    }

    res.status(200).json({ 
        success: true,
        message: "User details fetched successfully.",
        user: user
    });
};