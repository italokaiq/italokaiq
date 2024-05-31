import { Request, Response } from "express";
import { LoginService } from "../services";

export class LoginController {
  private service = new LoginService();

  public login = async (req: Request, res: Response): Promise<Response> => {
    const response = await this.service.login(req.body);
    return res.status(201).json(response);
  };
}
