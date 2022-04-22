/* eslint-disable no-async-promise-executor */
const faker = require("faker");
const fs = require("fs");

const createUsers = async (app, amount) => {
	return new Promise(async (resolve, reject) => {
		try {
			const users = [];
			for (let i = 1; i <= amount; i++) {
				console.log(`Creating User ${i}`);
				const user = {
					firstname: faker.name.firstName(),
					lastname: faker.name.lastName(),
					email: faker.internet.email(),
					password: faker.internet.password(),
				};
				users.push(user);
				await app.service("users").create(user);
			}
			console.log("Created Users Successfully");
			fs.writeFile("src/users.json", JSON.stringify(users), "utf8", () => {});
			resolve(users);
		} catch (error) {
			console.error(error);
			reject(error);
		}
	});
};

module.exports = createUsers;
