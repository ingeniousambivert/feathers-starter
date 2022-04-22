const { authenticate, protect, iff, isAction, configure } = require("@hooks");

module.exports = {
	before: {
		all: [],
		find: [],
		get: [],
		create: [
			iff(isAction("passwordChange", "identityChange"), authenticate("jwt")),
		],
		update: [],
		patch: [],
		remove: [],
	},

	after: {
		all: [
			protect(
				"password",
				"active",
				"firstname",
				"lastname",
				"permissions",
				"verifyToken",
				"updatedAt",
				"createdAt",
				"verifyShortToken",
				"verifyExpires",
				"resetToken",
				"resetExpires",
				"verifyChanges",
				"__v"
			),
		],
		find: [],
		get: [],
		create: [iff(isAction("verifySignupLong"), configure.subscription())],
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
