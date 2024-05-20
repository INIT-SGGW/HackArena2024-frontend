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

type InputTeam = Team & {
    password: string;
    repeatPassword: string;
};

type AccountTeamMember = TeamMember & {
    _id: string;
};

type AccountTeam = Team & {
    _id: string;
    teamMembers: Array<AccountTeamMember>;
};

type AccountTeamErrors = {
    teamName: string;
    teamMembers: Array<TeamMemberErrors>;
};

type TeamMemberErrors = {
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
    occupation: string;
    agreement: string;
};

type InputErrors = {
    teamName: string;
    password: string;
    repeatPassword: string;
    teamMembers: Array<TeamMemberErrors>;
};

export type { InputTeam, AccountTeam, InputErrors, AccountTeamErrors };