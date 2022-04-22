const request = require("superagent");
const agent = request.agent();

// Read more about superagent - https://visionmedia.github.io/superagent/

class Request {
	static build(app, options = {}) {
		return new Request(app, options);
	}

	constructor(app, options = {}) {
		this.options = options;
		this.baseURL = options.baseURL;
		this.headers = options.headers;
		this.app = app;

		this.client = agent
			.set(this.headers)
			.accept("application/json")
			.timeout(60000)
			.retry(4);
	}

	process(request) {
		return request
			.then((response) => {
				return Promise.resolve(response.body);
			})
			.catch((error) => {
				this.app.logger.error("helpers:request:process:", error);
				return Promise.reject({
					status: error.status,
					message: error.message,
					error,
				});
			});
	}

	get(url, params = {}) {
		return this.process(this.client.get(this.baseURL + url).query(params));
	}

	post(url, data = {}, params = {}) {
		return this.process(
			this.client
				.post(this.baseURL + url)
				.query(params)
				.send(data)
		);
	}

	put(url, data = {}, params = {}) {
		return this.process(
			this.client
				.put(this.baseURL + url)
				.send(data)
				.query(params)
		);
	}

	patch(url, data = {}, params = {}) {
		return this.process(
			this.client
				.patch(this.baseURL + url)
				.send(data)
				.query(params)
		);
	}

	delete(url, params = {}) {
		return this.process(this.client.delete(this.baseURL + url).query(params));
	}
}

module.exports = function (app) {
	app.helpers["request"] = Request;
};
