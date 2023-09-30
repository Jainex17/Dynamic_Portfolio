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

        if(!email || !password) return res.status(400).json({ message: "Not all fields have been entered." });

        const user = await Users.findOne({ email: email });
        if(!user) return res.status(400).json({ message: "Invalid credentials." });

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if(!isMatch) return res.status(400).json({ message: "Invalid credentials." });

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