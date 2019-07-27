/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define("users", {
		user_id: {
			type: DataTypes.STRING(20),
			allowNull: false,
			primaryKey: true
		},
		user_name: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		user_password: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		user_role: {
			type: DataTypes.INTEGER(2),
			allowNull: true
		}
	}, {
		tableName: "users"
	});
};
