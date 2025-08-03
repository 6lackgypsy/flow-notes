class HttpError extends Error {
  constructor(message) {
    super(message)
    this.name = this.constructor.name
  }
}

/**
 * Status Code: 401
 */
export class UnauthorizedError extends HttpError {}

/**
 * Status Code: 409
 */
export class ConflictError extends HttpError {}

// Add more error classes if you need distinction
