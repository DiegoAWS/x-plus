import type { Handler, HandlerEvent } from "@netlify/functions";
import { Template } from "./db/models/Template";
import { SCHEDULE } from "../../src/types";


const period10Min = 1000 * 60 * 10;
export const handler: Handler = async (
    event: HandlerEvent,
) => {
    console.log({ commingFakeTime: event.body })
    const fakeTime = event.body || Date.now();

    const now = new Date(fakeTime);
    const nowEpoch = now.getTime();
    const hour = now.getHours();
    const day = now.getDay();
    const weekDay = now.getDate();

    console.log({ now, nowEpoch, hour, day, weekDay })

    const once = (await Template.findAll({
        where: {
            schedule: SCHEDULE.ONCE,
            scheduleTime: {
                $between: [nowEpoch - period10Min, nowEpoch + period10Min]
            },
        }
    })).map((t) => t.toJSON());

    console.log({ once })

    const daily = (await Template.findAll({
        where: {
            schedule: SCHEDULE.DAILY,
            longHour: hour,
        }
    })).map((t) => t.toJSON());

    console.log({ daily })

    const weekly = (await Template.findAll({
        where: {
            schedule: SCHEDULE.WEEKLY,
            weekDay: day,
            longHour: hour,
        }
    })).map((t) => t.toJSON());

    console.log({ weekly })

    const monthly = (await Template.findAll({
        where: {
            schedule: SCHEDULE.MONTHLY,
            monthDay: weekDay,
            longHour: hour,
        }
    })).map((t) => t.toJSON());

    const data =[once, daily, weekly, monthly]

    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            data
        })
    }
};