import z from "zod";
import path from "path";
import dotenv from "dotenv";

export const envFileSchema = z.object({});

export type IEnv = z.infer<typeof envFileSchema>;

let env: IEnv | undefined;

export function loadEnv(envFile?: string): IEnv {
  if (envFile) {
    const envPath = path.resolve(process.cwd(), envFile);
    console.log(`Loading .env file from: ${envPath}`);
    const result = dotenv.config({ path: envPath });

    if (result.error) {
      throw new Error(`Error loading .env file: ${result.error.message}`);
    }
  }

  env = envFileSchema.parse(process.env);
  console.log("Environment variables loaded and validated");
  return env;
}

export function getEnv(): IEnv {
  if (!env) {
    throw new Error("Environment not loaded. Call loadEnv() first.");
  }
  return env;
}
