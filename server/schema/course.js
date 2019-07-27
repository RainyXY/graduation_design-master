/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define("course", {
		cor_id: {
			type: DataTypes.STRING(20),
			allowNull: false,
			primaryKey: true
		},
		cor_name: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		cor_major: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		cor_weekdays: {
			type: DataTypes.INTEGER(20),
			allowNull: true
		},
		cor_hour: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		cor_start: {
			type: DataTypes.TIME,
			allowNull: true
		}
	}, {
		tableName: "course"
	});
};
