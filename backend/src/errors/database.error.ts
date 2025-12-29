import { AppError } from "./app.error";

export class DatabaseError extends AppError {
    constructor(message: string = "Erro ao conectar com o banco de dados") {
        super(message, 500)
    }
}