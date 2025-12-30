import { AppError } from "./app.error";
import {messages} from "../config/utils/messages";
export class LoginError extends AppError {
    constructor(message: string = messages.auth.login_failed) {
        super(message, 401)
    }
}