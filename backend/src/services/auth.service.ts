import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AuthRepository } from "../repositories/auth.repository";

export class AuthService {
  private repo = new AuthRepository();

  async register(email: string, password: string) {
    const exists = await this.repo.findByEmail(email);
    if (exists) throw new Error("Email ja cadastrado");

    const hashed = await bcrypt.hash(password, 10);

    const user = await this.repo.createUser({ email, password: hashed });

    return user;
  }

  async login(email: string, password: string) {
    const user = await this.repo.findByEmail(email);
    if (!user) throw new Error("Usuário inválido");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Senha incorreta");

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
}
