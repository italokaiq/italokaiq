import { Request, Response } from "express";
import { TaskService } from "../services";

export class TaskController {
  private service = new TaskService();

  public create = async (req: Request, res: Response): Promise<Response> => {
    const userId = res.locals.decoded.id;
    const response = await this.service.create(userId, req.body);
    return res.status(201).json(response);
  };

  public findMany = async (
    { query }: Request,
    res: Response
  ): Promise<Response> => {
    const userId = res.locals.decoded.id;
    const queryParams = query.category ? String(query.category) : undefined;
    const response = await this.service.findMany(userId, queryParams);
    return res.status(200).json(response);
  };

  public findOne = async (req: Request, res: Response): Promise<Response> => {
    const task = res.locals.task;
    const response = await this.service.findOne(task);
    return res.status(200).json(response);
  };

  public update = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const response = await this.service.update(Number(id), req.body);
    return res.status(200).json(response);
  };

  public delete = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    await this.service.delete(Number(id));
    res.status(204).json();
  };
}
