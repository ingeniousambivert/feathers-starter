const {
	authenticate,
	hashPassword,
	protect,
	disallow,
	iff,
	isProvider,
	preventChanges,
	setField,
	checkPermissions,
	addVerification,
	removeVerification,
} = require("@hooks");

const notifyService = require("@services/authmanagement/notifier");

const notifyServiceHook = async (context) => {
	const { app, data } = context;
	try {
		const service = await notifyService(app);
		return service.notifier("resendVerifySignup", data);
	} catch (error) {
		app.notify(`"service:user:hooks:notifyServiceHook:"${error.message}`);
		app.logger.error("service:user:hooks:notifyServiceHook:", error);
	}
};

module.exports = {
	before: {
		all: [],
		find: [
			authenticate("jwt"),
			iff(
				checkPermissions({
					roles: ["admin"],
					field: "permissions",
					error: false,
				})
			),
			iff(
				(context) => !context.params.permitted,
				[
					setField({
						from: "params.user.id",
						as: "params.query.id",
					}),
				]
			),
		],
		get: [
			authenticate("jwt"),
			iff(
				checkPermissions({
					roles: ["admin"],
					field: "permissions",
					error: false,
				})
			),
			iff(
				(context) => !context.params.permitted,
				[
					setField({
						from: "params.user.id",
						as: "params.query.id",
					}),
				]
			),
		],
		create: [hashPassword("password"), addVerification()],
		update: [
			authenticate("jwt"),
			iff(
				isProvider("external"),
				preventChanges(
					true,
					"verifyToken",
					"verifyShortToken",
					"verifyExpires",
					"verifyChanges",
					"resetToken",
					"resetShortToken",
					"resetExpires"
				),
				hashPassword("password")
			),
			iff(
				checkPermissions({
					roles: ["admin"],
					field: "permissions",
					error: false,
				})
			),
			iff(
				(context) => !context.params.permitted,
				[
					setField({
						from: "params.user.id",
						as: "params.query.id",
					}),
				]
			),
		],
		patch: [
			authenticate("jwt"),
			iff(
				isProvider("external"),
				preventChanges(
					true,
					"verifyToken",
					"verifyShortToken",
					"verifyExpires",
					"verifyChanges",
					"resetToken",
					"resetShortToken",
					"resetExpires"
				),
				iff(
					checkPermissions({
						roles: ["admin"],
						field: "permissions",
						error: false,
					})
				),
				iff(
					(context) => !context.params.permitted,
					[
						setField({
							from: "params.user.id",
							as: "params.query.id",
						}),
					]
				),
				hashPassword("password")
			),
		],
		remove: [authenticate("jwt"), disallow("external")],
	},

	after: {
		all: [
			protect(
				"password",
				"verifyToken",
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
		create: [
			protect(
				"isActive",
				"firstname",
				"lastname",
				"email",
				"permissions"
			),
			notifyServiceHook,
			removeVerification(),
		],
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
