import jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors/index.js";

const auth = async (req, res, next) => {
    const authHeaders = req.headers.authorization;

    if (!authHeaders || !authHeaders.startsWith("Bearer")) {
        throw new UnauthenticatedError("You are not authorized");
    }

    const token = authHeaders.split(" ")[1];

    try {

        const payload = await jwt.verify(token, process.env.JWT_SECRET);

        req.user = { userId: payload.userId, userRole: payload.userRole, company: payload.company };
        next();
    } catch (error) {
        // console.log(error);
        throw new UnauthenticatedError("You are not authorized");
    }
}

export default auth;