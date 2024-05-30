import { Request, Response } from "express";
import { TaskService } from "../services";

export class TaskController {
  private service = new TaskService();

  public create = async (req: Request, res: Response): Promise<Response> => {
    const userId = Number(req.params.userId);
    const response = await this.service.create(req.body, userId);
    return res.status(200).json(response);
  };

  public findMany = async (req: Request, res: Response): Promise<Response> => {
    const userId = Number(req.params.userId);
    const queryP = req.query.category ? String(req.query.category) : undefined;
    const response = await this.service.findMany(userId, queryP);
    return res.status(200).json(response);
  };

  public findOne = async (req: Request, res: Response): Promise<Response> => {
    const response = await this.service.findOne(req.body);
    return res.status(200).json(response);
  };

  public update = async (req: Request, res: Response): Promise<Response> => {
    const id = Number(req.params.id);
    const response = await this.service.update(id, req.body);
    return res.status(200).json(response);
  };

  public delete = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    await this.service.delete(id);
    res.status(200).json();
  };
}
