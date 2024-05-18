import { RegisterBody, LoginBody } from "../Types/types";

export default class AuthenticationService {
    static API_URL = process.env.REACT_APP_API_URL;

    static async login({ email, password }: LoginBody) {
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
        console.log(registerBody)
        console.log(this.API_URL + "/register")
        const response = await fetch(this.API_URL + "/register", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Hack-Arena-API-Key": "$illyGame11",
            },
            body: JSON.stringify(registerBody),
        });
        return response;
    }
}