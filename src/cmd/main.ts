import { argSchema, IArgs } from "@/config/arg-config";
import { loadEnv } from "@/config/env-file";
import { BlueServer } from "@/internals/server";
import { Command } from "commander";

const command = new Command();

command
  .version("1.0.0")
  .option("-p, --port <number>", "Port to run the server on")
  .option(
    "-e, --environment <environment>",
    "Environment (development, staging, production)"
  )
  .option("-l, --log-level <level>", "Log level")
  .option("--env-file <path>", "Path to .env file")
  .parse(process.argv);

const options = command.opts();

try {
  const args: IArgs = argSchema.parse({
    port: parseInt(options.port),
    environment: options.environment,
    logLevel: options.logLevel,
    envFile: options.envFile,
  });

  console.log(`Starting server with args:`, args);
  console.log(`Current working directory: ${process.cwd()}`);

  loadEnv(args.envFile);
  const server = new BlueServer(args);
  server.listen();
} catch (e) {
  console.log(e);
}
