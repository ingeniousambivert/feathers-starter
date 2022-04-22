module.exports = async function (app) {
	const mailer = await app.integration("sendgrid").build(app);
	return {
		notifier: async function (type, user, notifierOptions) {
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
};
