import { Client, auth } from "twitter-api-sdk"
import { scopes } from "../utils/constants";
import { OAuth2UserOptions } from "twitter-api-sdk/dist/OAuth2User";


type Token = OAuth2UserOptions["token"]

// const token_type = "bearer";

const authParams = {
    client_id: process.env.TWITTER_CLIENT_ID as string,
    client_secret: process.env.TWITTER_CLIENT_SECRET as string,
    callback: process.env.TWITTER_CALLBACK as string,
    scopes
}
export const createAuthClient = (token?: Token) => new auth.OAuth2User({ ...authParams, token });


export const generateAuthUrl = () => {

    const authClient = createAuthClient();
    const authUrl = authClient.generateAuthURL({
        state: process.env.VITE_TWITTER_STATE || "",
        code_challenge: process.env.VITE_TWITTER_STATE || "",
        code_challenge_method: "plain"
    });

    return {
        authClient,
        authUrl
    }
}

export const requestAccessToken = async (code: string) => {


    const {
        authClient,
    } = generateAuthUrl();





    const accessToken = (await authClient.requestAccessToken(code)).token;
    

    const updatedAuthClient = createAuthClient(accessToken);
    const client = new Client(updatedAuthClient);
    const me = await client.users.findMyUser();
    
    
    return {
        token: accessToken,
        me
    }

}

export const getMe = async (token: Token) => {
    // const token = await requestAccessToken(code);

    const updatedAuthClient = createAuthClient(token);
    const client = new Client(updatedAuthClient);
    return client.users.findMyUser();
}