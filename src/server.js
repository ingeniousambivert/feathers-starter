require("module-alias/register");
const logger = require("@utils/logger");
const app = require("@app");
const debug = require("debug")("feathers-starter");
const port = app.get("port");
const server = app.listen(port);

process.on("unhandledRejection", (reason, p) =>
	logger.error("Unhandled Rejection at: Promise ", p, reason)
);

const HOST = app.get("host");

server.on("listening", () => {
	debug("debug listener running");
	logger.info(`server running on : http://${HOST}:${port}`);
});
