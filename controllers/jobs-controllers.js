import StatusCodes from "http-status-codes";
import Job from "../models/Job.js";

import { BadRequestError, NotFoundError, UnauthenticatedError } from "../errors/index.js";
import { checkClientPermissions } from "../utils/checkPermission.js";

const getAllJobs = async (req, res) => {

    const jobs = await Job.find().sort({ createdAt: -1 });

    res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
}

const getJobs = async (req, res) => {
    const { clientId } = req.params;

    const jobs = await Job.find({ createdBy: clientId }).sort({ createdAt: -1 });

    res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
}


const getSingleJob = async (req, res) => {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);
    if (!job) {
        throw new BadRequestError(`Could not find job with id : ${jobId}`);
    }
    res.status(StatusCodes.OK).json({ job });
}

const createJob = async (req, res) => {
    if (req.user.userRole !== "client") {
        throw new UnauthenticatedError("You are not allowed to post a job.");
    }

    req.body.createdBy = req.user.userId;
    req.body.company = req.user.company;

    const { position, jobDescription, skills, createdBy, company } = req.body;

    if (!position || !jobDescription || !skills || !createdBy || !company) {
        throw new BadRequestError("Please provide all values");
    }

    const job = await Job.create(req.body);

    res.status(StatusCodes.OK).json({ job });
}

const editJob = async (req, res) => {
    const { jobId } = req.params;

    let job = await Job.findById(jobId);

    if (!job) {
        throw new NotFoundError(`Could not find the job with id : ${jobId}`);
    }

    checkClientPermissions(req.user, job.createdBy);

    // const { position, jobDescription, skills } = req.body;

    // if (!position || !jobDescription || !skills) {
    //     throw new BadRequestError("Please provide all values");
    // }

    job = await Job.findByIdAndUpdate(jobId, req.body, { new: true, runValidators: true });

    res.status(StatusCodes.OK).json({ job });
}

const deleteJob = async (req, res) => {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);

    if (!job) {
        throw new NotFoundError(`Could not find job with id : ${jobId}`);
    }

    checkClientPermissions(req.user, job.createdBy);

    await Job.findByIdAndDelete(jobId);

    res.status(StatusCodes.OK).json({ message: "Job has been deleted!! Redirecting...." });
}

export { getAllJobs, getSingleJob, createJob, editJob, deleteJob, getJobs };