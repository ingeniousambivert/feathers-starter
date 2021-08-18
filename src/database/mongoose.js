const mongoose = require("mongoose");
const logger = require("@utils/logger");

module.exports = function (app) {
	mongoose
		.connect(app.get("mongodb"), {
			useCreateIndex: true,
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.catch((err) => {
			logger.error(err);
		});

	mongoose.Promise = global.Promise;

	app.set("mongooseClient", mongoose);
};
