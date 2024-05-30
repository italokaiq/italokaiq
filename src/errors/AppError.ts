export class AppError extends Error {
  public statusCode: number;

  constructor(public message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}
