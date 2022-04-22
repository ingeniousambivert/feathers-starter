"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		/**
		 * Add altering commands here.
		 *
		 */
		await queryInterface.createTable("users", {
			id: {
				type: Sequelize.UUID,
				primaryKey: true,
				defaultValue: Sequelize.UUIDV4,
				unique: true,
			},
			firstname: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			lastname: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			email: {
				type: Sequelize.STRING,
				isEmail: true,
				allowNull: false,
				unique: true,
			},
			password: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			isActive: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: true,
			},
			permissions: {
				type: Sequelize.ENUM({
					values: ["user", "admin", "superAdmin"],
				}),
				allowNull: false,
				defaultValue: "user",
			},
			isVerified: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			subscription: { type: Sequelize.UUID },
			access: {
				type: Sequelize.JSONB,
			},
			usage: {
				type: Sequelize.JSONB,
			},
			verifyToken: { type: Sequelize.STRING },
			verifyExpires: { type: Sequelize.DATE, isDate: true },
			resetToken: { type: Sequelize.STRING },
			resetExpires: { type: Sequelize.DATE, isDate: true },
			config: {
				type: Sequelize.JSONB,
			},
			createdAt: {
				type: Sequelize.DATE,
				defaultValue: Sequelize.fn("NOW"),
			},
			updatedAt: {
				type: Sequelize.DATE,
				defaultValue: Sequelize.fn("NOW"),
			},
		});
	},

	down: async (queryInterface, Sequelize) => {
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('users');
		 */
	},
};
