import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { Logger } from "pino";
import { HttpError, InternalError } from "./error";

export class ErrorHandlerMiddleware {
  private handler: ErrorRequestHandler;

  constructor(private logger: Logger) {
    this.handler = this.errorHandler.bind(this);
  }

  private errorHandler: ErrorRequestHandler = (
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    if (err instanceof HttpError) {
      this.logger.warn(
        { err: err.message, statusCode: err.statusCode },
        "HTTP Error occurred"
      );
      res.status(err.statusCode).json({ error: err.message });
    } else if (err instanceof InternalError) {
      this.logger.error(
        {
          err: err.message,
          stack: err.getFullStackTrace(),
        },
        "Internal Error occurred"
      );

      res.status(500).json({ error: "An internal server error occurred" });
    } else {
      this.logger.error(
        { err: err.message, stack: err.stack },
        "Unknown Error occurred"
      );
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  };

  public getMiddleware(): ErrorRequestHandler {
    return this.handler;
  }
}
