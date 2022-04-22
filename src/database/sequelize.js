const Sequelize = require("sequelize");

module.exports = function (app) {
	const postgresConfig = app.get("postgres");
	const connectionString = `postgres://${postgresConfig.user}:${postgresConfig.password}@${postgresConfig.ip}:${postgresConfig.port}/${postgresConfig.db}`;
	const sequelize = new Sequelize(connectionString, {
		dialect: "postgres",
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
