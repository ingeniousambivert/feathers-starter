const app = require("../../app");
const env = process.env.NODE_ENV || "development";
const dialect = "postgres";
const postgresConfig = app.get(dialect);
const connectionString = `postgres://${postgresConfig.user}:${postgresConfig.password}@${postgresConfig.ip}:${postgresConfig.port}/${postgresConfig.db}`;
module.exports = {
	[env]: {
		dialect,
		url: connectionString,
		migrationStorageTableName: "_migrations",
	},
};
