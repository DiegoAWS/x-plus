
import type { Handler, HandlerEvent } from "@netlify/functions";
import { AuthToken, authTwitter } from "./services/authTwitter";



const handler: Handler = async (event: HandlerEvent) => {

    const bearer = event.headers?.authorization;
    const tokenRaw = bearer?.split(" ")[1];



    try {
        const tokenText = Buffer.from(tokenRaw as string, "base64").toString("utf-8");
        if (!tokenText) throw new Error("No token provided");
        const token = JSON.parse(tokenText) as NonNullable<AuthToken>;
        const { getMe } = await authTwitter({ token });
        const me = await getMe();

        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ me })
        }


    } catch (error) {
        console.log(error);

        return {
            statusCode: 401,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: "Unauthorized", error })
        }
    }
};

export { handler };
