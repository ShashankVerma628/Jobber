import { checkCandidatePermissions } from "../utils/checkPermission.js";
import Candidate from "../models/Candidate.js";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";
import StatusCodes from "http-status-codes";

const editProfile = async (req, res) => {
    const { candidateId } = req.params;
    checkCandidatePermissions(req.user, candidateId);
    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
        throw new UnauthenticatedError("You are not authorized.");
    }

    const { email, name, title } = req.body;
    if (!email || !name || !title) {
        throw new BadRequestError("Please provide the required values");
    }

    const updatedCandidate = await Candidate.findByIdAndUpdate(candidateId, req.body, { new: true, runValidators: true })

    res.status(StatusCodes.OK).json({ user: updatedCandidate });
}

export { editProfile };