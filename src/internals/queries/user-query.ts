import { HttpError } from "@/pkg/error";

export class UserQueries {
  public async create() {
    throw new HttpError("BAD REEQUST", 400);
  }
}
