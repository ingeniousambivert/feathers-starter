/* eslint-disable no-dupe-else-if */
const Sequelize = require("sequelize");
const dialect = "postgres";

module.exports = function (app) {
	const postgresConfig = app.get(dialect);

	let connectionString = `postgres://${postgresConfig.ip}:${postgresConfig.port}/${postgresConfig.db}`;

	console.log(postgresConfig);

	if (postgresConfig.user !== null && postgresConfig.user !== undefined) {
		connectionString = `postgres://${postgresConfig.user}@${postgresConfig.ip}:${postgresConfig.port}/${postgresConfig.db}`;
	} else if (
		postgresConfig.user !== null &&
		postgresConfig.user !== undefined &&
		postgresConfig.password !== null &&
		postgresConfig.password !== undefined
	) {
		connectionString = `postgres://${postgresConfig.user}:${postgresConfig.password}@${postgresConfig.ip}:${postgresConfig.port}/${postgresConfig.db}`;
	}

	const sequelize = new Sequelize(connectionString, {
		dialect,
		logging: false,
		define: {
			freezeTableName: true,
		},
	});
	const oldSetup = app.setup;

	app.set("sequelizeClient", sequelize);

	// Connection with infinite retries
	const connectWithRetry = (...args) => {
		const result = oldSetup.apply(this, args);

		// Set up data relationships
		const models = sequelize.models;
		Object.keys(models).forEach((name) => {
			if ("associate" in models[name]) {
				models[name].associate(models);
			}
		});

		// Sync to the database
		app.set(
			"sequelizeSync",
			sequelize.sync().catch((error) => {
				app.notify(`"Database sync failed:"${error.message - error.stack}`);
				app.logger.error("Database sync failed", error.message, error.stack);
				setTimeout(connectWithRetry, 5000);
			})
		);

		return result;
	};

	app.setup = connectWithRetry;
};
