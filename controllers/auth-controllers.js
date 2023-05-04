import Candidate from "../models/Candidate.js";
import Client from "../models/Client.js";

import StatusCodes from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";

const loginCandidate = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        // console.log("hello");
        throw new BadRequestError("Please provide all values");
    }

    const user = await Candidate.findOne({ email }).select("+password");
    if (!user) {
        throw new UnauthenticatedError("Invalid Email");
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError("Invalid credentials");
    }
    user.password = undefined;

    const token = user.createJWT();

    res.status(StatusCodes.OK).json({ user, token });
}

const registerCandidate = async (req, res) => {
    const { name, email, password } = req.body;

    const userExist = await Candidate.findOne({ email });
    if (userExist) {
        throw new BadRequestError("User already Exists");
    }

    const user = await Candidate.create(req.body);
    user.password = undefined;

    const token = user.createJWT();

    res.status(StatusCodes.CREATED).json({ user, token });
}

const loginClient = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new BadRequestError("Please provide all values");
    }

    const user = await Client.findOne({ email }).select("+password");
    if (!user) {
        throw new UnauthenticatedError("Invalid Email");
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError("Invalid credentials");
    }

    user.password = undefined;
    const token = await user.createJWT();

    res.status(StatusCodes.OK).json({ user, token });
}

const registerClient = async (req, res) => {
    const { name, email, password, company } = req.body;

    if (!name || !email || !password || !company) {
        throw new BadRequestError("Please provide all values");
    }

    const userExist = await Client.findOne({ email });
    if (userExist) {
        throw new BadRequestError("User already exists");
    }

    const user = await Client.create(req.body);
    user.password = undefined;

    const token = user.createJWT();

    res.status(StatusCodes.CREATED).json({ user, token });
}

export { loginCandidate, registerCandidate, loginClient, registerClient };