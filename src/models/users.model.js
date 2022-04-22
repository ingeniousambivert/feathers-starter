// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
	const sequelizeClient = app.get("sequelizeClient");
	const users = sequelizeClient.define(
		"users",
		{
			id: {
				type: DataTypes.UUID,
				primaryKey: true,
				defaultValue: DataTypes.UUIDV4,
				unique: true,
			},
			firstname: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			lastname: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				isEmail: true,
				allowNull: false,
				unique: true,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			isActive: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: true,
			},
			permissions: {
				type: DataTypes.ENUM({
					values: ["user", "admin"],
				}),
				allowNull: false,
				defaultValue: "user",
			},
			isVerified: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			verifyToken: { type: DataTypes.STRING },
			verifyExpires: { type: DataTypes.DATE, isDate: true },
			resetToken: { type: DataTypes.STRING },
			resetExpires: { type: DataTypes.DATE, isDate: true },
		},
		{
			hooks: {
				beforeCount(options) {
					options.raw = true;
				},
			},
		}
	);

	// eslint-disable-next-line no-unused-vars
	users.associate = function (models) {
		// users.belongsToMany(models.workspaces, {
		// 	through: members,
		// 	as: "workspaces",
		// 	foreignKey: "userId",
		// 	otherKey: "workspaceId",
		// });
		// Define associations here
		// See http://docs.sequelizejs.com/en/latest/docs/associations/
	};

	return users;
};
