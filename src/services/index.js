const users = require("./users/users.service.js");
const authmanagement = require("./authmanagement/authmanagement.service.js");

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
	app.configure(users);
	app.configure(authmanagement);
};
