const request = require("./request/request.helper");

module.exports = function (app) {
	// all the helpers will be registered to this object
	app.helpers = {};

	// support function get helpers by name with the same syntax as service.
	// app.service(<name>) -> app.helper(<name>)
	app.helper = (path) => app.helpers[path];

	// register all helpers
	app.configure(request);
};
