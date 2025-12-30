import { AuthService } from "./../services/auth.service";
import { Request, Response, NextFunction } from "express";

const service = new AuthService();

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await service.register({ email, password });
    res.status(201).json({ message: "Usuário registrado com sucesso!", user });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const token = await service.login({ email, password });
    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await service.deleteUser(id);
    res.status(204).json({ message: "Usuário deletado com sucesso!" });
  } catch (err) {
    next(err);
  }
};
