const authManagement = require("feathers-authentication-management");
const hooks = require("./authmanagement.hooks");

module.exports = function (app) {
	// Initialize our service with any options it requires
	const options = {
		service: "users",
		notifier: async function (type, user, notifierOptions) {
			const mailer = await app.integration("sendgrid").build(app);
			switch (type) {
				//sending the user the verification email
				case "resendVerifySignup":
					await mailer.verify(user);
					return Promise.resolve();

				// confirming verification
				case "verifySignup":
					await mailer.verifyDone(user);
					return Promise.resolve();

				// sending password reset email
				case "sendResetPwd":
					await mailer.reset(user);
					return Promise.resolve();

				// reset password
				case "resetPwd":
					await mailer.resetDone(user);
					return Promise.resolve();

				// changing password
				case "passwordChange":
					await mailer.passwordChange(user);
					return Promise.resolve();

				case "identityChange":
					await mailer.emailChange(user);
					return Promise.resolve();

				default:
					return Promise.reject("Invalid Action");
			}
		},
	};
	app.configure(authManagement(options));

	// Get our initialized service so that we can register hooks and filters
	const service = app.service("authManagement");

	service.hooks(hooks);
};
