const app = require("./app");
const port = app.get("port");
const server = app.listen(port);

process.on("unhandledRejection", (reason, p) => {
	app.notify(`server:unhandled rejection at: Promise, ${p}, ${reason}`);
	app.logger.error("server:unhandled rejection at: Promise ", p, reason);
});

const HOST = app.get("host");
const LIVE = app.get("live") === true ? "TRUE" : "FALSE";
const ENVIRONMENT = process.env.NODE_ENV && process.env.NODE_ENV.toUpperCase();

server.on("listening", () => {
	app.logger.info(`LIVE:${LIVE} | http://${HOST}:${port} | ENV:${ENVIRONMENT}`);
});
