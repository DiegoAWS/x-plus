import type { User } from "netlify-identity-widget";
import type { Dayjs } from "dayjs";
export interface TwitterToken {
    token: Token;
    me: Me;
}
export interface Token {
    token_type: string;
    access_token: string;
    scope: string;
    refresh_token: string;
    expires_at: number;
}
export interface Me {
    data: Data;
}
export interface Data {
    id: string;
    name: string;
    username: string;
}

export interface XUser extends User {
    app_metadata: {
        companyName: string;
        provider: string;
        roles: string[];
        role: string;
        logo?: string;
        userId: string;
    }
}

export type TemplateType = {
    name: string;
    tweet: string;
    schedule?: string;
    scheduleTime?: string;
    clientId?: number;
}

export type TemplateFormType = TemplateType & {
    scheduleTime: Dayjs
}

export const SCHEDULE = {
    ONCE: "once",
    DAILY: "daily",
    WEEKLY: "weekly",
    MONTHLY: "monthly",
}
