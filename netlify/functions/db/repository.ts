import { Client, ClientType } from "./models/Client";
import { User, UserType } from "./models/User";

User.sync({
    alter: true
});

Client.sync({
    alter: true
});

User.belongsTo(Client);
Client.hasMany(User);



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

    const createdUser = await User.create(user);
    return createdUser.toJSON();
}
