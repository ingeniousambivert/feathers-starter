const {
	required,
	disallow,
	iff,
	fastJoin,
	isProvider,
	preventChanges,
} = require("feathers-hooks-common");
const { authenticate } = require("@feathersjs/authentication").hooks;
const { protect, hashPassword } =
	require("@feathersjs/authentication-local").hooks;
const verifyHooks = require("feathers-authentication-management").hooks;
const { setField } = require("feathers-authentication-hooks");
const checkPermissions = require("feathers-permissions");

const { isAction, rawFalse, rateLimit } = require("./service.hooks");

module.exports = {
	// feathers-hooks-common
	required,
	disallow,
	iff,
	fastJoin,
	isProvider,
	preventChanges,

	// feathersjs/authentication
	authenticate,

	// feathers-authentication-hooks
	setField,

	// feathers-authentication-local
	protect,
	hashPassword,

	// feathers-permissions
	checkPermissions,

	// feathers-authentication-management
	addVerification: verifyHooks.addVerification,
	removeVerification: verifyHooks.removeVerification,
	isVerified: verifyHooks.isVerified,

	// custom
	isAction,
	rawFalse,
	rateLimit,
};
