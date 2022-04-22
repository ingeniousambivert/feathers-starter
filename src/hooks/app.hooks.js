// Application hooks that run for every service
// const { rateLimit } = require("@hooks");
// const { RateLimiterMemory } = require("rate-limiter-flexible");

// const rateLimiter = new RateLimiterMemory({
// 	// number of requests
// 	points: 1,
// 	// per second
// 	duration: 1,
// });

// const rateLimitHook = rateLimit(rateLimiter);

module.exports = {
	before: {
		// all: [rateLimitHook],
		all: [],
		find: [],
		get: [],
		create: [],
		update: [],
		patch: [],
		remove: [],
	},

	after: {
		all: [],
		find: [],
		get: [],
		create: [],
		update: [],
		patch: [],
		remove: [],
	},

	error: {
		all: [],
		find: [],
		get: [],
		create: [],
		update: [],
		patch: [],
		remove: [],
	},
};
