/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define("coach", {
		coach_id: {
			type: DataTypes.STRING(20),
			allowNull: false,
			primaryKey: true
		},
		coach_name: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		coach_gender: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		coach_phone: {
			type: DataTypes.STRING(11),
			allowNull: true
		},
		coach_strong: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		coach_income: {
			type: DataTypes.STRING(255),
			allowNull: true
		}
	}, {
		tableName: "coach"
	});
};
