import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
    position: {
        type: String,
        required: [true, "Please provide position"],
        trim: true,
        minLength: [4, "Position name cannot be less than 4 characters"],
        maxLength: [255, "Position name cannot be greater than 255 characters"]
    },
    jobDescription: {
        type: String,
        trim: true,
        minLength: [10, "Job Description cannot be less than 10 characters"],
        required: [true, "Please provide job description"]
    },
    skills: {
        type: [String],
        required: [true, "Please provide some skills regarding the position"],
    },
    company: {
        type: String,
        required: [true, "Please provide job company"],
        trim: true
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "Client",
        required: [true, "Please provided the client"]
    },
    jobType: {
        type: String,
        enum: ["on-site", "remote", "hybrid", "freelancing"],
        default: "on-site"
    },
    salary: {
        type: String,
        required: [true, "Please provide salary"]
    },
    jobLocation: {
        type: String,
        required: [true, "Please provide job location"]
    },
    applicants: {
        type: [String],
        default: []
    },
    likes: {
        type: [String],
        default: []
    },
    acceptedCandidates: {
        type: [String],
        default: []
    }
}, { timestamps: true });

export default mongoose.model("Job", JobSchema);