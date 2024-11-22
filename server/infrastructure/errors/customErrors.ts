export class AppError extends Error {
    constructor(
        public statusCode: number,
        public message: string,
        public isOperational = true
    ) {
        super(message);
        Object.setPrototypeOf(this, AppError.prototype)
    }
}

export class ValidationError extends AppError{
    constructor(message: string) {
        super(400, message);
    }
}

export class AuthenticationError extends AppError{
    constructor(message: string = 'Authentication Failed') {
        super(401, message);
    }
}

export class AuthorizationError extends AppError{
    constructor(message: string = 'Not Authorized') {
        super(403, message);
    }
}

export class NotFoundError extends AppError {
    constructor(resource: string) {
        super(404, `${resource} is not found`);
    }
}

export class DatabaseError extends AppError{
    constructor(message: string = 'Database Query Error') {
        super(500, message);
    }
}