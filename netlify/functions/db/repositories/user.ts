import { User, getUserModel } from "../models/User";

export const createUser = async (user: User) => {
    const UserModel = await getUserModel();
    const createdUser = await UserModel.create(user);
    return createdUser.toJSON();
}