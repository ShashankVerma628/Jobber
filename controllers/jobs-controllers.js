import StatusCodes from "http-status-codes";
import Job from "../models/Job.js";
import Candidate from "../models/Candidate.js";

import { BadRequestError, NotFoundError, UnauthenticatedError } from "../errors/index.js";
import { checkClientPermissions } from "../utils/checkPermission.js";

const getAllJobs = async (req, res) => {

    const jobs = await Job.find().sort({ createdAt: -1 });

    res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
}

const getJobs = async (req, res) => {
    const { clientId } = req.params;

    checkClientPermissions(req.user, clientId);

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
    if (req.user.userRole !== "candidate") {
        throw new UnauthenticatedError("You are not authorized for this actions");
    }

    const { candidateId } = req.params;

    const allJobs = await Job.find();

    let jobs = [];
    allJobs.map((job) => {
        if (job.applicants.includes(candidateId.toString())) {
            jobs.push(job);
        }
    });

    res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
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
    const acceptedIndex = job.acceptedCandidates.findIndex((id) => id === String(req.user.userId));

    if (index !== -1 || acceptedIndex !== -1) {
        throw new BadRequestError("You have already applied for this job");
    }
    job.applicants.push(String(req.user.userId));
    await job.save();

    res.status(StatusCodes.OK).json({ job });
}

const saveJob = async (req, res) => {
    if (req.user.userRole !== "candidate") {
        throw new BadRequestError("You are not candidate");
    }
    const { jobId } = req.params;

    const job = await Job.findById(jobId);

    if (!job) {
        throw new NotFoundError(`There is no job with this id ${jobId}`);
    }

    const index = job.likes.findIndex((id) => id === String(req.user.userId));

    if (index === -1 || job.likes.length === 0) {
        job.likes.push(req.user.userId);
    } else {
        job.likes = job.likes.filter((id) => id !== String(req.user.userId));
    }
    await job.save();

    res.status(StatusCodes.OK).json({ job });
}

const getSavedJobs = async (req, res) => {
    if (req.user.userRole !== "candidate") {
        throw new UnauthenticatedError("You are not authorized for this actions");
    }

    const { candidateId } = req.params;

    const allJobs = await Job.find();

    let jobs = [];
    allJobs.map((job) => {
        if (job.likes.includes(candidateId.toString())) {
            jobs.push(job);
        }
    });

    res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
}

const acceptCandidate = async (req, res) => {
    const { jobId } = req.params;
    const { candidateId } = req.body;

    const job = await Job.findById(jobId);
    checkClientPermissions(req.user, job.createdBy);

    if (!job) {
        throw new NotFoundError("Could not find this job");
    }

    const index = job.acceptedCandidates.findIndex((id) => id === String(candidateId));

    if (index === -1 || job.acceptedCandidates.length === 0) {
        job.acceptedCandidates.push(candidateId);
        job.applicants = job.applicants.filter((id) => id !== String(candidateId));
        await job.save();
    }

    res.status(StatusCodes.OK).json({ job });
}

const rejectCandidate = async (req, res) => {
    const { jobId } = req.params;
    const { candidateId } = req.body;

    const job = await Job.findById(jobId);
    checkClientPermissions(req.user, job.createdBy);

    if (!job) {
        throw new NotFoundError("Could not find this job");
    }

    const index = job.applicants.findIndex((id) => id === String(candidateId));

    if (index !== -1) {
        job.applicants = job.applicants.filter((id) => id !== String(candidateId));
        await job.save();
    }

    res.status(StatusCodes.OK).json({ job });
}

export { getAllJobs, getSingleJob, createJob, editJob, applyForJob, deleteJob, getJobs, getCandidateJobs, saveJob, getSavedJobs, acceptCandidate, rejectCandidate };