export type ErrorBodyResponse = {
    message: string;
    context?: { [key: string]: any };
}

// export type TokenUser = {
//     firstName: string;
//     lastName: string;
//     userId: unknown;
//     role: string;
// };

export type LoginBodyResponse = {
    email: string;
    teamName: string | null;
}

export type GetTeamResponseBody = {
    teamName: string;
    teamMembers: {
        email: string;
        firstName: string;
        lastName: string;
        verified: boolean;
    }[]
}