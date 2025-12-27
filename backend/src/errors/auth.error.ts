import { AppError } from "./app.error";

export class LoginError extends AppError {
    constructor(message: string = "Falha ao realizar login") {
        super(message, 401)
    }
}