import mongoose from "mongoose";
import validator from "validator";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const CandidateSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Please provide candidate's name"],
        minLength: [3, "Name cannot be less than 3 characters"]
    },
    email: {
        type: String,
        required: [true, "Please provide candidate's email"],
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: "Please provide a valid email"
        }
    },
    password: {
        type: String,
        required: [true, "Please provide password"],
        trim: true,
        minLength: [4, "Password's length couldn't be less than 4 characters"],
        select: false
    },
    userRole: {
        type: String,
        default: "candidate"
    }
}, { timestamps: true });

CandidateSchema.pre("save", async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

CandidateSchema.methods.createJWT = function () {
    return jwt.sign({ userId: this._id, userRole: this.userRole }, process.env.JWT_SECRET, { expiresIn: "30d" });
}

CandidateSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
}

export default mongoose.model("Candidate", CandidateSchema);