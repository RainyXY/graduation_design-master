const theDatabase = require('../config/db.js').theDb;
const courseSchema = theDatabase.import('../schema/course.js');

//删除
const delCourse = async (cor_id) => {
  await courseSchema.destroy({
    where: {
      cor_id
    }
  });
  return true;
};
//查询表所有信息
const getCorListAll = async function() {
  return await courseSchema.findAndCount();
};
const getCorList = async function(cor_major) {
  return await courseSchema.findAndCount({
    where:{
      cor_major
    }
  });
};
//add
const addCourse = async (cor_id,cor_name,cor_major,cor_weekdays,cor_hour,cor_start) => {
  await courseSchema.create({
    cor_id,
    cor_name,
    cor_major,
    cor_weekdays,
    cor_hour,
    cor_start
  });
  return true;
};

const getCorStu = async function(cor_major) {
  return await courseSchema.findAndCount({
    where:{
      cor_major
    }
  });
};

module.exports = {
  delCourse,
  addCourse,
  getCorListAll,
  getCorList,
  getCorStu
};
