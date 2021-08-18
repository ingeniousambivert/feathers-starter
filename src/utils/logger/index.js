const { createLogger, format, transports } = require("winston");

const config = {
	format: format.combine(
		format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
		format.printf((log) => `${log.level}: ${[log.timestamp]}: ${log.message}`)
	),
	transports: [
		new transports.Console({
			level: "debug",
		}),
		new transports.File({
			level: "error",
			filename: "logs/server.log",
		}),
	],
};

const logger = createLogger(config);

module.exports = logger;
