import express from "express";
const router = express.Router();
import { editProfile } from "../controllers/candidate-controllers.js";
import authenticateUser from "../middleware/auth.js";

router.patch("/edit-profile/:candidateId", authenticateUser, editProfile);

export default router;