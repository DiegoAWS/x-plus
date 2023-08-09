import { Client, getClientModel } from "../models/Client";

export const createClient = async (client: Client) => {
    const ClientModel = await getClientModel();
    const [createdClient] = await ClientModel.findOrCreate({
        where: {
            twitterId: client.twitterId
        },
        defaults: client
    });
    return createdClient.toJSON();
}