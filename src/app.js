require("module-alias/register");
const dotenv = require("dotenv");
dotenv.config();

const { v4: uuid } = require("uuid");
const compress = require("compression");
const helmet = require("helmet");
const cors = require("cors");
const logger = require("@utils/logger");
const notify = require("@utils/notify");
const morgan = require("morgan");

const feathers = require("@feathersjs/feathers");
const configuration = require("@feathersjs/configuration");
const express = require("@feathersjs/express");

const middleware = require("@middleware");
const appHooks = require("@hooks/app.hooks");
const channels = require("@channels");
const services = require("@services");
const integrations = require("@integrations");
const helpers = require("@helpers");

const authentication = require("@services/authentication");
const sequelize = require("@database/sequelize");

const app = express(feathers());

// HTTP Logger
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// Attach logger
app.logger = logger("app");
app.setLogger = (name) => (app.logger = logger(name));

// Attach webhook trigger
app.notify = notify;

// Load app configuration
app.configure(configuration());
// Enable security, CORS, compression, favicon and body parsing
app.use(
	helmet({
		contentSecurityPolicy: false,
	})
);
app.set("trust proxy", 1);
app.use(cors({}));
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up Plugins and providers
app.configure(express.rest());

// Create a unique request ID and attach to feathers
app.use((req, res, next) => {
	req.feathers.requestId = uuid();
	next();
});

// Set up database configuration
app.configure(sequelize);

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);

// Set up our service authentication (see `services/authentication/index.js`)
app.configure(authentication);

// Set up our helpers (see `helpers/index.js`)
app.configure(helpers);

// Set up our integrations (see `integrations/index.js`)
app.configure(integrations);

// Set up our services (see `services/index.js`)
app.configure(services);

// Set up event channels (see channels.js)
app.configure(channels);

// Configure a middleware for 404s and the error handler
app.use(express.errorHandler({ logger }));
app.use(express.notFound());

app.hooks(appHooks);

module.exports = app;
