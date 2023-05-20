import express from "express";
const router = express.Router();
import { editProfile, getCandidateDetails } from "../controllers/candidate-controllers.js";
import authenticateUser from "../middleware/auth.js";


router.patch("/edit-profile/:candidateId", authenticateUser, editProfile);
router.get("/:candidateId", getCandidateDetails);

export default router;