import express from "express";
const router = express.Router();
import { getClientDetails, getClients } from "../controllers/client-controllers.js";

router.get("/", getClients);

router.get("/details/:clientId", getClientDetails);

export default router;