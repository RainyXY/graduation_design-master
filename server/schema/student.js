/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define("student", {
		stu_id: {
			type: DataTypes.STRING(20),
			allowNull: false,
			primaryKey: true
		},
		stu_name: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		stu_gender: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		stu_age: {
			type: DataTypes.INTEGER(3),
			allowNull: true
		},
		stu_height: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		stu_weight: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		stu_tel: {
			type: DataTypes.STRING(11),
			allowNull: true
		},
		stu_major: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		stu_pay: {
			type: DataTypes.STRING(255),
			allowNull: true
		}
	}, {
		tableName: "student"
	});
};
