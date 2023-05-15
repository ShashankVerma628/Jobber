import StatusCodes from "http-status-codes";
import { NotFoundError, BadRequestError } from "../errors/index.js";
import Client from "../models/Client.js";
import Candidate from "../models/Candidate.js";

const getClientDetails = async (req, res) => {
    const { clientId } = req.params;

    const user = await Client.findOne({ _id: clientId });

    if (!user) {
        throw new NotFoundError("Could not get the details");
    }

    res.status(StatusCodes.OK).json({ user });
}

const getClients = async (req, res) => {
    const clients = await Client.find();
    res.status(StatusCodes.OK).json({ clients, count: clients.length });
}

const getCandidateDetails = async (req, res) => {
    if (req.user.userRole !== "client") {
        throw new BadRequestError("You are not client");
    }

    const { candidateId } = req.params;

    const applicant = await Candidate.findById(candidateId);

    if (!applicant) {
        throw new NotFoundError("Could not find this candidate");
    }

    const { name, email, title } = applicant;

    res.status(StatusCodes.OK).json({ applicant: { name, email, title } });
}

export { getClientDetails, getClients, getCandidateDetails };