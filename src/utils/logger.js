const bunyan = require("bunyan");

const devStream = [
	{
		path: "logs/development.log",
		level: "error",
	},
	{
		stream: process.stdout,
	},
];

const prodStream = [
	{
		path: "logs/server.log",
	},
];

function createLogger(name) {
	let envStream = devStream;
	if (process.env.NODE_ENV === "production") {
		envStream = prodStream;
	}
	return bunyan.createLogger({
		name,
		src: true,
		streams: envStream,
	});
}

module.exports = createLogger;
