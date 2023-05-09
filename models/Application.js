import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({
    jobId: {
        type: mongoose.Types.ObjectId,
        ref: "Job",
        required: [true, "Please provide job id"],
    },
    applicants: {
        type: [String],
        default: []
    }
});

export default mongoose.model("Application", ApplicationSchema);