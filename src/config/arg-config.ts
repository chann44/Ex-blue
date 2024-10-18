import { Environment } from "@/pkg/types";
import z from "zod";

const logLevelSchema = z.enum([
  "trace",
  "debug",
  "info",
  "warn",
  "error",
  "fatal",
]);

export const logLevel = logLevelSchema.Values;

export const argSchema = z.object({
  port: z.number(),
  environment: z.nativeEnum(Environment),
  logLevel: logLevelSchema,
  envFile: z.string(),
});

export type IArgs = z.infer<typeof argSchema>;
