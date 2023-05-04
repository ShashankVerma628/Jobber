import express from "express";
import { loginCandidate, registerCandidate, loginClient, registerClient } from "../controllers/auth-controllers.js";

const router = express.Router();

// login a candidate
router.post("/login", loginCandidate);

// register a candidate
router.post("/register", registerCandidate);

// login a client
router.post("/client/login", loginClient);

// register a client
router.post("/client/register", registerClient);


export default router;