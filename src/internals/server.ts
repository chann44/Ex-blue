import { IArgs } from "@/config/arg-config";
import { LoggerLevel, setupLogger } from "@/pkg/logger";
import { Router, Application } from "express";
import express from "express";
import { Server } from "http";
import { Logger } from "pino";
import { UserHandler } from "./handlers/user-handler";
import { Environment } from "@/pkg/types";
import { ErrorHandlerMiddleware } from "@/pkg/error-middleware";
import { Metrics } from "@/pkg/metrics";
import { Registry } from "prom-client";

export class BlueServer {
  public router: Router;
  private logger: Logger;
  private app: Application;
  private server: Server;
  private args: IArgs;
  private registry: Registry;
  userHandler: UserHandler;
  metricsHandler: Metrics;
  errorMiddleware: ErrorHandlerMiddleware;

  constructor(args: IArgs) {
    // setups
    this.registry = new Registry();
    this.router = Router();
    this.args = args;
    this.logger = setupLogger(
      args.environment === Environment.LOCAL
        ? LoggerLevel.DEBUG
        : LoggerLevel.PRODUCTION
    );
    this.app = express();
    this.router = Router();
    this.errorMiddleware = new ErrorHandlerMiddleware(this.logger);
    this.userHandler = new UserHandler(this.router, this.logger);
    this.metricsHandler = new Metrics(this.registry, this.router);

    // use statements
    this.app.use(this.router);
    this.app.use(this.errorMiddleware.getMiddleware());
  }

  listen() {
    this.server = this.app.listen(this.args.port, () => {
      this.logger.info("SERVER: ", "server has started....");
    });
  }

  graceFullyStop() {
    process.on("SIGTERM", () => {
      console.info("SIGTERM signal received.");
      console.log("Closing http server.");
      this.server.close(() => {
        console.log("Http server closed.");
        // boolean means [force], see in mongoose doc
      });
    });
  }
}
