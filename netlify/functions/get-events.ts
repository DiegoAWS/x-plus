import type { Handler, HandlerEvent } from "@netlify/functions";


export const handler: Handler = async (
    event: HandlerEvent,
) => {
    console.log(event.body)


    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            data: "hello"
        })
    }
}