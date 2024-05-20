import { RegisterBody, LoginBody } from "../Types/types";

export default class AuthenticationService {
    static API_URL = "http://51.38.132.180:8080/api/v1";

    static async login({ email, password }: LoginBody) {
        const response = await fetch(this.API_URL + "/login", {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Hack-Arena-API-Key": process.env.REACT_APP_API_KEY || "",
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
                "Hack-Arena-API-Key": process.env.REACT_APP_API_KEY || "",
            },
            body: JSON.stringify(registerBody),
        });
        return response;
    }
}