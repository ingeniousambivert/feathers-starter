/* eslint-disable no-unused-vars */
const { FeathersError } = require("@feathersjs/errors");

class Conflict extends FeathersError {
	constructor(message) {
		super(message, "conflict", 409, "Conflict");
	}
}

class Forbidden extends FeathersError {
	constructor(message) {
		super(message, "forbidden", 403, "Forbidden");
	}
}

class BadRequest extends FeathersError {
	constructor(message) {
		super(message, "bad-request", 400, "BadRequest");
	}
}

class NotFound extends FeathersError {
	constructor(message) {
		super(message, "not-found", 404, "NotFound");
	}
}

class NotAuthenticated extends FeathersError {
	constructor(message) {
		super(message, "not-authenticated", 401, "NotAuthenticated");
	}
}

class NotAuthorized extends FeathersError {
	constructor(message) {
		super(
			"You are not authorized to do this",
			"not-authorized",
			403,
			"NotAuthorized"
		);
	}
}

class TooManyRequests extends FeathersError {
	constructor(message) {
		super(message, "too-many-requests", 429, "TooManyRequests");
	}
}

class ServerError extends FeathersError {
	constructor(message, data) {
		super(message, "internal-server-error", 500, "InternalServerError", data);
	}
}

const errorHandler = (context) => {
	if (context.error) {
		const error = context.error;
		if (!error.code) {
			const newError = new ServerError("Server Error");
			context.error = newError;
			return context;
		}
		if (error.code === 404 || process.env.NODE_ENV === "production") {
			error.stack = null;
		}
		return context;
	}
};

const throwError = (status) => {
	switch (status) {
		case 400:
			throw new BadRequest();
		case 401:
			throw new NotAuthenticated();
		case 403:
			throw new Forbidden();
		case 404:
			throw new NotFound();
		case 409:
			throw new Conflict();
		case 500:
			throw new ServerError();

		default:
			throw new Error("Unknown Error");
	}
};

module.exports = {
	// Custom Methods
	errorHandler,
	throwError,
	// Feathers Errors
	Conflict,
	Forbidden,
	BadRequest,
	NotFound,
	NotAuthenticated,
	NotAuthorized,
	TooManyRequests,
	// Service Errors
	ServerError,
};
