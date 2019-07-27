const theDatabase = require('../config/db.js').theDb;
const coachSchema = theDatabase.import('../schema/coach.js');

// 通过表（teacher）中用户tea_id查找
const getTeaById = async function(id) {
  const teacherInfo = await coachSchema.findOne({
    where: {
      coach_id: id
    }
  });
  return teacherInfo
}

//根据id修改tel
const updateTel = async (id, tel) => {
  await coachSchema.update(
    {
      coach_phone: tel
    },
    {
      where: {
        coach_id: id
      }
    }
  );
  return true;
}

//
const updateInfo = async (coach_id, coach_name, coach_gender, coach_phone, coach_strong, coach_income) => {
  await coachSchema.update(
    {
      coach_id,
      coach_gender,
      coach_phone,
      coach_strong,
      coach_income
    },
    {
      where: {
        coach_id
      }
    }
  );
  return true;
}

//删除工号为coach_id的教职工信息
const delTeacher = async (coach_id) => {
  await coachSchema.destroy({
    where: {
      coach_id
    }
  });
  return true;
}
//add a teacher
const addTeacher = async (coach_id, coach_name, coach_gender, coach_phone, coach_strong, coach_income) => {
  await coachSchema.create({
    coach_id,
    coach_name,
    coach_gender,
    coach_phone,
    coach_strong,
    coach_income
  });
  return true;
}
//查询表（teacher）中所有用户信息
const getTeaList = async function() {
  return await coachSchema.findAndCount(); // findAndCount() 用 get 路由访问，会得到 204 状态：无数据返回。改用 post 就行
}

const getTea = async function(coach_id) {
  return await coachSchema.findAndCount({
    where:{
      coach_id
    }
  }); // findAndCount() 用 get 路由访问，会得到 204 状态：无数据返回。改用 post 就行
}

module.exports = {
  getTeaById,
  getTeaList,
  updateTel,
  updateInfo,
  delTeacher,
  addTeacher,
  getTea
}
