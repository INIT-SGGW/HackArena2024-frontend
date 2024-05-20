import { RegisterBody, LoginBody } from "../Types/types";

export default class AuthenticationService {
    static API_URL = process.env.REACT_APP_API_URL;

    static async login({ email, password }: LoginBody) {
        const response = await fetch(this.API_URL + "/login", {
            method: "POST",
            credentials: "omit",
            headers: {
                "Content-Type": "application/json",
                "Hack-Arena-API-Key": "$illyGame11"
            },
            body: JSON.stringify({ email, password }),
        });
        return response;
    }

    static async register(registerBody: RegisterBody) {
        const response = await fetch(this.API_URL + "/register", {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Hack-Arena-API-Key": "$illyGame11",
            },
            body: JSON.stringify(registerBody),
        });
        return response;
    }
}