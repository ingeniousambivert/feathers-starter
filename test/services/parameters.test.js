const assert = require("assert");
const app = require("../../src/app");

describe("'parameters' service", () => {
	it("registered the service", () => {
		const service = app.service("parameters");

		assert.ok(service, "Registered the service");
	});
});
