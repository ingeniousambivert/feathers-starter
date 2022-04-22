const agent = require("superagent");
const webhookUrl = process.env.SLACK_WEBHOOK_URL;

async function notify(message) {
	if (process.env.NODE_ENV === "production") {
		try {
			const eventDetails = await agent.post(webhookUrl).send({ text: message });
			return eventDetails;
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = notify;
