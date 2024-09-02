export type ErrorBodyResponse = {
    message: string;
    context?: { [key: string]: any };
}

export type TokenUser = {
    firstName: string;
    lastName: string;
    userId: unknown;
    role: string;
};

export type LoginBodyResponse = {
    message: string,
    user: TokenUser,
    teamName: string | null;
}