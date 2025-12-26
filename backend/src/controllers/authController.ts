import { UserModel } from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const exists = await UserModel.findOne({ email });
  if (exists) return res.status(400).json({ error: "Email já cadastrado" });

  const hashed = await bcrypt.hash(password, 10);

  const user = await UserModel.create({ email, password: hashed });

  res.json({ message: "Usuário registrado!", user });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });
  if (!user) return res.status(400).json({ error: "Usuário inválido" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ error: "Senha incorreta" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
    expiresIn: "1d"
  });

  res.json({ token });
};
