import type { NextFunction, Response, Router } from "express";
import { Logger } from "pino";
import { UserCommands } from "../commands/user-command";
import { UserQueries } from "../queries/user-query";
import { catchErrorTyped } from "@/pkg/catch-error";

export class UserHandler {
  private router: Router;
  private logger: Logger;
  private userCommand: UserCommands;
  private userQueries: UserQueries;

  constructor(router: Router, logger: Logger) {
    this.router = router;
    this.logger = logger;
    this.userCommand = new UserCommands();
    this.userQueries = new UserQueries();

    // Commands +> Actions
    this.router.post("/users", this.handleCreateUser.bind(this));

    // queries
    this.router.get("/users", this.HandleGetUser.bind(this));
  }

  async handleCreateUser(_req: Request, res: Response, next: NextFunction) {
    const [error, user] = await catchErrorTyped(this.userCommand.create());
    if (error) {
      next(error);
      return;
    }
    this.logger.info(user, "User created");
    res.status(200).json(user);
  }

  async HandleGetUser(_req: Request, res: Response, next: NextFunction) {
    const [error, user] = await catchErrorTyped(this.userQueries.create());
    if (error) {
      next(error);
      return;
    }
    this.logger.info(user, "User Geted");
    res.status(200).json(user);
  }
}
