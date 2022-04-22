const sendgrid = require("./sendgrid/sendgrid.integration");

module.exports = function (app) {
	// all the integrations will be registered to this object
	app.integrations = {};

	// support function get integrations by name with the same syntax as service.
	// app.service(<name>) -> app.integration(<name>)
	app.integration = (path) => app.integrations[path];

	// register all integrations
	app.configure(sendgrid);
};
