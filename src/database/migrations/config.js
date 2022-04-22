/* eslint-disable no-dupe-else-if */
const app = require("../../app");
const env = process.env.NODE_ENV || "development";
const dialect = "postgres";
const postgresConfig = app.get(dialect);

let connectionString = `postgres://${postgresConfig.ip}:${postgresConfig.port}/${postgresConfig.db}`;

if (postgresConfig.user) {
	connectionString = `postgres://${postgresConfig.user}@${postgresConfig.ip}:${postgresConfig.port}/${postgresConfig.db}`;
} else if (postgresConfig.user && postgresConfig.password) {
	connectionString = `postgres://${postgresConfig.user}:${postgresConfig.password}@${postgresConfig.ip}:${postgresConfig.port}/${postgresConfig.db}`;
}

module.exports = {
	[env]: {
		dialect,
		url: connectionString,
		migrationStorageTableName: "_migrations",
	},
};
