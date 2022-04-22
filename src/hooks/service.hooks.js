/* eslint-disable no-unused-vars */
const { Op, Sequelize } = require("sequelize");
const {
	BadRequest,
	Forbidden,
	NotAuthorized,
	Conflict,
	ServerError,
	TooManyRequests,
} = require("@errors");

const isAction =
	(...args) =>
	(hook) =>
		args.includes(hook.data.action);

const rawFalse = (context) => {
	const { params } = context;
	const { provider } = params;

	if (!provider) {
		return context;
	}
	if (!params.sequelize) params.sequelize = {};
	Object.assign(params.sequelize, { raw: false });
	return context;
};

const rateLimit = (rateLimiter, _options) => {
	const options = Object.assign(
		{},
		{
			makeKey: (context) => context.path,
			makePoints: (context) => 1,
		},
		_options
	);
	return async (context) => {
		const key = await options.makeKey(context);
		const points = await options.makePoints(context);
		try {
			const rateLimit = await rateLimiter.consume(key, points);
			context.params.rateLimit = rateLimit;
			return context;
		} catch (rateLimit) {
			context.params.rateLimit = rateLimit;
			throw new TooManyRequests("Too Many Requests", rateLimit);
		}
	};
};

module.exports = {
	isAction,
	rawFalse,
	rateLimit,
};
