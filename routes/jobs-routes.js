import express from "express";
import { getAllJobs, getSingleJob, applyForJob, createJob, editJob, deleteJob, getJobs, getCandidateJobs } from "../controllers/jobs-controllers.js";

import authenticateUser from "../middleware/auth.js";

const router = express.Router();

// get all jobs
router.get("/", getAllJobs);

// get single job
router.get("/:jobId", getSingleJob);

// get all jobs created by a particular client
router.get("/client/:clientId", authenticateUser, getJobs);

// apply for a job
router.patch("/candidate/:jobId", authenticateUser, applyForJob);

// get all jobs that a candidate has applied for
router.get("/candidate:/candidateId", authenticateUser, getCandidateJobs);

// to create a job
router.post("/", authenticateUser, createJob);

// to edit a job
router.patch("/:jobId", authenticateUser, editJob);

// to delete a job
router.delete("/:jobId", authenticateUser, deleteJob);

export default router;