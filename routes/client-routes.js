import express from "express";
const router = express.Router();
import authenticateUser from "../middleware/auth.js";
import { getClientDetails, getClients, getCandidateDetails } from "../controllers/client-controllers.js";

router.get("/", getClients);

router.get("/details/:clientId", getClientDetails);

router.get("/candidate-details/:candidateId", authenticateUser, getCandidateDetails);

export default router;