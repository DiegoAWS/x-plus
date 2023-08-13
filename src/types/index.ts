import type { User } from "netlify-identity-widget";

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

export interface TemplateType  {
    name: string;
    tweet: string;
    clientId?: number; 
}
