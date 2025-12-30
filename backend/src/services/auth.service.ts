import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { messages } from "../config/utils/messages";
import { AuthPayload } from "../config/utils/types/auth";
import { LoginError } from "../errors/auth.error";
import { AuthRepository } from "../repositories/auth.repository";
import { loginSchema, registerSchema } from "../config/utils/validations/auth";
export class AuthService {
  private repo = new AuthRepository();

  async register({ email, password }: AuthPayload) {
    if (!email || !password) {
     throw new LoginError(messages.auth.email_and_password_required);
    }

    registerSchema.parse({ email, password });
    
    const exists = await this.repo.findByEmail(email);
    if (exists) throw new LoginError(messages.auth.email_exists);

    const hashed = await bcrypt.hash(password, 10);

    const user = await this.repo.createUser({ email, password: hashed });

    return user;
  }

  async login({ email, password }: AuthPayload) {
     if (!email || !password) {
     throw new LoginError(messages.auth.email_and_password_required);
    }

    loginSchema.parse({ email, password });
    const user = await this.repo.findByEmail(email);
    if (!user) throw new LoginError(messages.auth.user_not_found);

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new LoginError(messages.auth.invalid_password_invalid);

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
    if (!id) throw new LoginError(messages.auth.id_required);
    return this.repo.deleteUser(id);
  }
}
