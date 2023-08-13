import { Client, ClientType } from "../models/Client";
import { Template } from "../models/Template";
import { User, UserType } from "../models/User";

Client.hasMany(User, { foreignKey: 'clientId' });
User.belongsTo(Client, { foreignKey: 'clientId' });

Client.hasMany(Template, { foreignKey: 'ClientId' });
Template.belongsTo(Client, { foreignKey: 'ClientId' });



export const createClient = async (client: ClientType) => {

    const [createdClient] = await Client.findOrCreate({
        where: {
            twitterId: client.twitterId
        },
        defaults: client
    });
    return createdClient.toJSON();
}

export const createUser = async (user: UserType) => {

    const [rawUser, created] = await User.findOrCreate({
        where: {
            email: user.email
        },
        defaults: user
    });
    const createdUser = rawUser.toJSON();

    if (!created && createdUser.clientId !== user.clientId) {
        throw new Error("User already exists");
    }

    return createdUser;
}
