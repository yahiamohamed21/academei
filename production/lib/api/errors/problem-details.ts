export interface ProblemDetails {
  type?: string | null;
  title?: string | null;
  status?: number | null;
  detail?: string | null;
  instance?: string | null;
  errors?: Record<string, string[]>;
}

export class ApiError extends Error {
  public status: number;
  public problemDetails: ProblemDetails;

  constructor(status: number, problemDetails: ProblemDetails) {
    const message = problemDetails.detail || problemDetails.title || `API Error with status ${status}`;
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.problemDetails = problemDetails;
  }
}

export function parseProblemDetails(response: Response, data?: unknown): ProblemDetails {
  if (data && typeof data === "object") {
    return data as ProblemDetails;
  }

  return {
    status: response.status,
    title: response.statusText || "An error occurred",
    detail: `HTTP request failed with status ${response.status}`,
  };
}
