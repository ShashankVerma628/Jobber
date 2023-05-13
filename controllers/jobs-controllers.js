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

    let { position, jobDescription, skills, createdBy, company, salary, jobLocation } = req.body;

    if (!position || !jobDescription || skills.length === 0 || !createdBy || !company || !salary || !jobLocation) {
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

    const { position, jobDescription, skills } = req.body;

    if (!position || !jobDescription || !skills) {
        throw new BadRequestError("Please provide all values");
    }

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

const getCandidateJobs = async (req, res) => {

    console.log("get Candidate Jobs");
}

const applyForJob = async (req, res) => {
    if (req.user.userRole !== "candidate") {
        throw new BadRequestError("You are not candidate");
    }
    const { jobId } = req.params;

    const job = await Job.findById(jobId);

    if (!job) {
        throw new NotFoundError(`There is no job with this id ${jobId}`);
    }

    const index = job.applicants.findIndex((id) => id === String(req.user.userId));

    if (index !== -1) {
        throw new BadRequestError("You have already applied for this job");
    }
    job.applicants.push(String(req.user.userId));
    await job.save();

    res.status(StatusCodes.OK).json({ job });
}

export { getAllJobs, getSingleJob, createJob, editJob, applyForJob, deleteJob, getJobs, getCandidateJobs };

