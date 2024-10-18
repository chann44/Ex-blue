export class InternalError extends Error {
  constructor(message: string, public readonly originalError?: Error) {
    super(message);
    this.name = "InternalError";
    if (originalError && originalError.stack) {
      this.stack = `${this.stack}\n\nCaused by:\n${originalError.stack}`;
    }
  }

  getFullStackTrace(): string {
    return this.stack || this.message;
  }
}

export class HttpError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = "HttpError";
    this.statusCode = statusCode;
  }
}
