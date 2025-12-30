import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AuthPayload } from "../config/utils/types/auth";
import { LoginError } from "../errors/auth.error";
import { AuthRepository } from "../repositories/auth.repository";
import { loginSchema, registerSchema } from "../config/utils/validations/auth";
export class AuthService {
  private repo = new AuthRepository();

  async register({ email, password }: AuthPayload) {
    if (!email || !password) {
     throw new LoginError("Email e senha são obrigatórios");
    }

    registerSchema.parse({ email, password });
    
    const exists = await this.repo.findByEmail(email);
    if (exists) throw new LoginError("Email ja cadastrado");

    const hashed = await bcrypt.hash(password, 10);

    const user = await this.repo.createUser({ email, password: hashed });

    return user;
  }

  async login({ email, password }: AuthPayload) {
     if (!email || !password) {
     throw new LoginError("Email e senha são obrigatórios");
    }

    loginSchema.parse({ email, password });
    const user = await this.repo.findByEmail(email);
    if (!user) throw new LoginError("Usuário não encontrado.");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new LoginError("Senha incorreta.");

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1d",
      }
    );
    return token;
  }

  async deleteUser(id?: string){
    if (!id) throw new LoginError("ID do usuário é obrigatório");
    return this.repo.deleteUser(id);
  }
}
