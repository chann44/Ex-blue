import type { NextFunction, Response, Router } from "express";
import { Logger } from "pino";
import { catchErrorTyped } from "@/pkg/catch-error";

export class UserHandler {
  private router: Router;
  private logger: Logger;
  constructor(router: Router, logger: Logger) {
    this.router = router;
    this.logger = logger;
    this.router.post("/users", this.handleCreateUser.bind(this));
    this.router.get("/users", this.HandleGetUser.bind(this));
  }

  async createUser() {
    return {
      name: "USER",
    };
  }

  async handleCreateUser(_req: Request, res: Response, next: NextFunction) {
    const [error, user] = await catchErrorTyped(this.createUser());
    if (error) {
      next(error);
      return;
    }
    this.logger.info(user, "User created");
    res.status(200).json(user);
  }

  async HandleGetUser(_req: Request, res: Response, next: NextFunction) {
    const [error, user] = await catchErrorTyped(this.createUser());
    if (error) {
      next(error);
      return;
    }
    this.logger.info(user, "User Geted");
    res.status(200).json(user);
  }
}
