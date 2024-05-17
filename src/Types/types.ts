// general types for the application

type Team = {
    teamName: string;
    teamMembers: Array<TeamMember>;
}

type TeamMember = {
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
    occupation: string;
    isVegan: boolean;
    agreement: boolean;
}

type TeamMemberErrors = {
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
    occupation: string;
    agreement: string;
};

// Types for register page

type InputTeam = Team & {
    password: string;
    repeatPassword: string;
};

type InputErrors = {
    teamName: string;
    password: string;
    repeatPassword: string;
    teamMembers: Array<TeamMemberErrors>;
};

// Types for account page

type AccountTeamMember = TeamMember & {
    _id: string;
};

type AccountTeam = Team & {
    _id: string;
    teamMembers: Array<AccountTeamMember>;
};

type AccountTeamErrors = Team & {
    teamMembers: Array<TeamMemberErrors>;
};

// Types for authentication

type RegisterBody = {
    teamName: string,
    password: string,
    teamMembers: TeamMember[]
}

type LoginBody = {
    email: string;
    password: string;
};

export type { InputTeam, AccountTeam, InputErrors, AccountTeamErrors, RegisterBody, LoginBody };