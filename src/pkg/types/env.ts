import { z } from "zod";

export enum Environment {
  PRODUCTION = "production",
  STAGING = "staging",
  LOCAL = "local",
}

export const environmentSchema = z.nativeEnum(Environment);

export type Env = z.infer<typeof environmentSchema>;
