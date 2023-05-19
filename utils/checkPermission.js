import { UnauthenticatedError } from "../errors/index.js";

const checkClientPermissions = (user, resourceUserId) => {
    if (user.userId.toString() === resourceUserId.toString() && user.userRole === "client") {
        return;
    }

    throw new UnauthenticatedError("You are not authorized to perform this action");
}
const checkCandidatePermissions = (user, resourceUserId) => {
    if (user.userId.toString() === resourceUserId.toString() && user.userRole === "candidate") {
        return;
    }

    throw new UnauthenticatedError("You are not authorized to perform this action");
}

export { checkClientPermissions, checkCandidatePermissions };