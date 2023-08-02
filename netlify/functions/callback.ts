import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import knex from 'knex';

const knexDriver = knex({
  client: 'mysql',
  connection: {
    host: process.env.DB_HOST,
    port: +(process.env.DB_PORT || 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  }
});

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
    console.log({ event, context })
  const response = await knexDriver.raw('SELECT 1');
  console.log(response);
    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Hello World" }),
      };
};

export { handler };