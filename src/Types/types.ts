type Team = {
  teamName: string;
  teamMembers: Array<TeamMember>;
};

type TeamMember = {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  occupation: string;
  isVegan: boolean;
  agreement: boolean;
};

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
type AccountTeam = Team & {
  _id: string;
  teamMembers: Array<AccountTeamMember>;
};

type AccountTeamMember = TeamMember & {
  _id: string;
};

type AccountTeamRequestMember = {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: Date;
  occupation: string;
  isVegan: boolean;
  agreement: boolean;
}

type AccountTeamRequestBody = {
  teamName: string;
  teamMembers: Array<AccountTeamRequestMember>;
};

type AccountTeamErrors = Team & {
  teamMembers: Array<TeamMemberErrors>;
};

// Types for authentication

type RegisterTeamMemberBody = {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: Date;
  occupation: string;
  isVegan: boolean;
  agreement: boolean;
};

type RegisterBody = {
  teamName: string;
  password: string;
  teamMembers: RegisterTeamMemberBody[];
};

type LoginBody = {
  email: string;
  password: string;
};

type ResetPasswordBody = {
  password: string;
};

export type {
  InputTeam,
  AccountTeam,
  AccountTeamRequestBody,
  InputErrors,
  AccountTeamErrors,
  RegisterBody,
  LoginBody,
  ResetPasswordBody,
};
