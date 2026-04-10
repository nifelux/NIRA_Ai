// src/lib/models/shared/ModelErrors.ts

export class ModelRequestError extends Error {
  constructor(
    message: string,
    public model: string,
    public status?: number
  ) {
    super(message);
    this.name = "ModelRequestError";
  }
}

export function normalizeModelError(
  error: unknown,
  model: string
): ModelRequestError {
  if (error instanceof ModelRequestError) {
    return error;
  }

  if (error instanceof Error) {
    return new ModelRequestError(error.message, model);
  }

  return new ModelRequestError("Unknown model error", model);
}
