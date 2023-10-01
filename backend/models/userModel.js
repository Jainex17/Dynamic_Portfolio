import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({

    email: { 
        type: String,
        require:[true,"Please Enter Your Name"],
        unique:true,
        validate:[validator.isEmail,"Please Enter A Valid Email"]
    },

    passwordHash: { type: String, required: true },    
    name: { type: String},
    phone: { type: String},
    github: { type: String},
});

userSchema.pre("save", function (next) {

    if (!this.isModified("passwordHash")) return next();

    this.passwordHash = bcrypt.hashSync(this.passwordHash, 10);
    next();
});

// jwt token function
export function generateToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
}


export default mongoose.model("Users", userSchema);