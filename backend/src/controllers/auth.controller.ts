import { AppError } from '../errors/app.error';
import { AuthService } from './../services/auth.service';
import { Request, Response } from "express";

const service = new AuthService();

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await service.register({email, password});
    res.json({ message: "Usuário registrado com sucesso!", user });
  } catch (error) {
    if (error instanceof AppError){
      return res.status(error.statusCode).json({
        error: error.message
      })
    }
    res.status(500).json({ error: "Erro no servidor" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await service.login({email, password});
    res.json({ token });
  } catch (err: any) {  
    if (err instanceof AppError){
      return res.status(err.statusCode).json({
        error: err.message
      })
    }
    res.status(400).json({ error: err.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await service.deleteUser(id);
    res.json({ message: "Usuário deletado com sucesso!" });

  } catch (err: any){
    if (err instanceof AppError){
      return res.status(err.statusCode).json({
        error: err.message
      })
    }

    res.status(400).json({ error: err.message });
  }
}
