import { Request, Response } from "express";
import { UserService } from "../services";

export class UserController {
  private service = new UserService();

  public create = async (req: Request, res: Response): Promise<Response> => {
    const response = await this.service.create(req.body);
    return res.status(201).json(response);
  };

  public getProfile = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const userId = res.locals.decoded.id;
    const response = await this.service.getProfile(userId);
    return res.status(200).json(response);
  };
}
