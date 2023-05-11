import StatusCodes from "http-status-codes";
import { NotFoundError, BadRequestError } from "../errors/index.js";
import Client from "../models/Client.js";

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

export { getClientDetails, getClients };