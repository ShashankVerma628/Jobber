import { UnauthenticatedError } from "../errors/index.js";

const checkClientPermissions = (user, resourceUserId) => {
    if (user.userId.toString() === resourceUserId.toString() && user.userRole === "client") {
        return;
    }

    throw new UnauthenticatedError("You are not authorized to perform this action");
}

export { checkClientPermissions };