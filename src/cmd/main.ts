import { Command } from "commander";

import { loadEnv } from "@/config/env-file";
import { BlueServer } from "@/internals/server";
import { argSchema } from "@/config/arg-config";

const command = new Command();

let server: BlueServer | undefined;

const addServerOptions = (cmd: Command) => {
  return cmd
    .option("-p, --port <number>", "Port to run the server on", (value) =>
      parseInt(value, 10)
    )
    .option("-e, --environment <environment>", "Environment")
    .option("-l, --log-level <level>", "Log level")
    .option("--env-file <path>", "Path to .env file");
};

command.version("1.0.0");
const startCommand = new Command("start")
  .description("Start the server in the background")
  .action((options) => {
    const args = argSchema.parse(options);
    console.log(`Starting server with args:`, args);
    console.log(`Current working directory: ${process.cwd()}`);

    loadEnv(args.envFile);
    server = new BlueServer(args);
    server.listen();
  });

addServerOptions(startCommand);
command.addCommand(startCommand);

command
  .command("stop")
  .description("Stop the running server")
  .action(() => {
    server?.graceFullyStop();
  });

if (require.main === module) command.parse(process.argv);
