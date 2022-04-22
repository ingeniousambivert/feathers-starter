const sendgrid = require("@sendgrid/mail");

class SendGrid {
	static build(app) {
		return new SendGrid(app);
	}

	constructor(app) {
		this.app = app;
		this.client = sendgrid;
		this.client.setApiKey(app.get("sendgrid").apiKey);
		this.from = app.get("sendgrid").from;
		this.baseURL = app.get("website");
		this.live = app.get("live");
	}

	getLink(type, hash) {
		if (type === "reset") type = "reset-password";
		return this.baseURL + "/" + type + "?token=" + hash;
	}

	async send(data) {
		// send emails only in live mode/production
		if (this.live) {
			try {
				const response = await this.client.send(data);
				this.app.logger.info("integrations:sendgrid:send:", data, response);
				return Promise.resolve(response);
			} catch (error) {
				this.app.notify(`"integrations:sendgrid:send:"${error.message}`);
				this.app.logger.error("integrations:sendgrid:send:", error);
			}
		} else {
			this.app.logger.error("integrations:sendgrid:send:TEST-MODE:", data);
			return Promise.resolve(data);
		}
	}

	verify(user) {
		const data = {
			from: this.from,
			personalizations: [
				{
					to: [{ email: user.email }],
					dynamic_template_data: {
						name: user.firstname + " " + user.lastname,
						link: this.getLink("verify", user.verifyToken),
					},
				},
			],
			template_id: this.app.get("sendgrid").templateKeys.verify,
		};

		return this.send(data);
	}

	verifyDone(user) {
		const data = {
			from: this.from,
			personalizations: [
				{
					to: [{ email: user.email }],
					dynamic_template_data: {
						name: user.firstname + " " + user.lastname,
						link: this.baseURL + "/signin",
					},
				},
			],
			template_id: this.app.get("sendgrid").templateKeys.verifyDone,
		};

		return this.send(data);
	}

	invite(payload) {
		const data = {
			from: this.from,
			personalizations: [
				{
					to: [{ email: payload.invited }],
					dynamic_template_data: {
						invitee: payload.invitee,
						workspace: payload.workspace,
						link: this.baseURL,
					},
				},
			],
			template_id: this.app.get("sendgrid").templateKeys.invite,
		};

		return this.send(data);
	}

	reset(user) {
		const data = {
			from: this.from,
			personalizations: [
				{
					to: [{ email: user.email }],
					dynamic_template_data: {
						name: user.firstname + " " + user.lastname,
						link: this.getLink("reset", user.resetToken),
					},
				},
			],
			template_id: this.app.get("sendgrid").templateKeys.reset,
		};

		return this.send(data);
	}

	resetDone(user) {
		const data = {
			from: this.from,
			personalizations: [
				{
					to: [{ email: user.email }],
					dynamic_template_data: {
						name: user.firstname + " " + user.lastname,
						link: this.baseURL + "/signin",
					},
				},
			],
			template_id: this.app.get("sendgrid").templateKeys.resetDone,
		};

		return this.send(data);
	}

	passwordChange(user) {
		const data = {
			from: this.from,
			personalizations: [
				{
					to: [{ email: user.email }],
					dynamic_template_data: {
						name: user.firstname + " " + user.lastname,
						link: this.baseURL + "/signin",
					},
				},
			],
			template_id: this.app.get("sendgrid").templateKeys.passwordChange,
		};

		return this.send(data);
	}

	emailChange(user) {
		const data = {
			from: this.from,
			personalizations: [
				{
					to: [{ email: user.email }],
					dynamic_template_data: {
						name: user.firstname + " " + user.lastname,
						link: this.getLink("verify", user.verifyToken),
					},
				},
			],
			template_id: this.app.get("sendgrid").templateKeys.emailChange,
		};

		return this.send(data);
	}
}

module.exports = function (app) {
	app.integrations["sendgrid"] = SendGrid;
};
