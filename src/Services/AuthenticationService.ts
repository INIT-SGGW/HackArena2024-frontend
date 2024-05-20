
type RegisterTeamMember = {
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
    occupation: string;
    isVegan: boolean;
    agreement: boolean;
}

type RegisterBody = {
    teamName: string,
    password: string,
    repeatPassword: string,
    teamMembers: RegisterTeamMember[]
}

export default class AuthenticationService {
    static API_URL = process.env.REACT_APP_API_URL;

    static async login(email: string, password: string) {
        const response = await fetch(this.API_URL + "/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Hack-Arena-API-Key": "$illyGame11"
            },
            body: JSON.stringify({ email, password }),
        });
        return response;
    }

    static async register(registerBody: RegisterBody) {
        console.log(this.API_URL + "/register")
        const response = await fetch(this.API_URL + "/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Hack-Arena-API-Key": "$illyGame11",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(registerBody),
        });
        return response;
    }
}