const { protect } = require("@feathersjs/authentication-local").hooks;

module.exports = {
	before: {
		all: [],
		find: [],
		get: [],
		create: [],
		update: [],
		patch: [],
		remove: [],
	},

	after: {
		all: [
			//TODO: Protect the commented fields
			protect(
				"authentication",
				// "user.firstname",
				// "user.lastname",
				// "user.email",
				"user.isVerified",
				"user.password",
				"user.isActive",
				"user.createdAt",
				"user.updatedAt",
				"user.permissions",
				"user.verifyToken",
				"user.verifyExpires",
				"user.resetToken",
				"user.resetExpires"
			),
		],
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
