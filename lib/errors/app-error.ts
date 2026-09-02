import { ERROR_CODES, type TErrorCode } from "@/lib/errors/codes";

export class AppError extends Error {
  readonly code: TErrorCode;
  readonly exposeMessage: boolean;
  readonly status: number;

  constructor(
    message: string,
    {
      code = ERROR_CODES.INTERNAL,
      exposeMessage = false,
      status = 500,
      cause,
    }: {
      code?: TErrorCode;
      exposeMessage?: boolean;
      status?: number;
      cause?: unknown;
    } = {}
  ) {
    super(message, cause !== undefined ? { cause } : undefined);
    this.name = "AppError";
    this.code = code;
    this.exposeMessage = exposeMessage;
    this.status = status;
  }
}
