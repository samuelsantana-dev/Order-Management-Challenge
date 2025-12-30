import { AppError } from "./app.error";
import {messages} from "../config/utils/messages";
export class DatabaseError extends AppError {
    constructor(message: string = messages.errors.database_error) {
        super(message, 500)
    }
}