import { Request, Response } from "express";
import { CategoryService } from "../services";

export class CategoryController {
  private service = new CategoryService();

  public create = async (req: Request, res: Response): Promise<Response> => {
    const response = await this.service.create(req.body);
    return res.status(201).json(response);
  };

  public delete = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    const response = await this.service.delete(id);
    res.status(204).json(response);
  };
}
