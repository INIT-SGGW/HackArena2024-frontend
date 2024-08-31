export type RegisterTeamRequest = {
    teamName: string;
    teamMembersEmails: string[];
};

export enum Occupation {
    STUDENT = "student",
    UNDERGRADUATE = "undergraduate",
    POSTGRADUATE = "postgraduate",
    OTHER = "other",
}

export function isValidOccupation(value: string): value is Occupation {
    return Object.values(Occupation).includes(value as Occupation);
}

export enum DietPreference {
    VEGETARIAN = "vegetarian",
    VEGAN = "vegan",
    NONE = "none",
}

export function isValidDietPreference(value: string): value is DietPreference {
    return Object.values(DietPreference).includes(value as DietPreference);
}

export type RegisterTeamMemberRequest = {
    verificationToken: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    occupation: Occupation;
    dietPreference: DietPreference;
    aggreement: boolean;
};

export type LoginRequest = {
    email: string;
    password: string;
};

export type TokenUser = {
    firstName: string;
    lastName: string;
    userId: unknown;
    role: string;
};

export type ForgotPasswordRequest = {
    email: string;
}

export type ChangePasswordRequest = {
    newPassword: string;
    oldPassword: string;
}

export type ResetPasswordRequest = {
    email: string;
    password: string;
    token: string;
}