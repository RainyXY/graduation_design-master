const userModel = require('../models/users.js');
const studentModel = require('../models/student.js');
const courseModel = require('../models/course.js');
// const teacherModel = require('../models/teacher.js');

const getCorList = async function() {
  const currentPage = this.request.body.currentPage;
  const pageSize = this.request.body.pageSize;
  // const college =this.request.body.cor_college;
  const major =this.request.body.cor_major;
  if(major===""){
    let res =await courseModel.getCorListAll();
    let list = res.rows;
    let start = pageSize * (currentPage - 1);
    list = list.slice(start, start + pageSize);
    this.body = {
      success: true,
      list,
      total: res.count,
      msg: '获取课程信息成功！'
    }
  }
  else{
    let res = await courseModel.getCorList(major)
    let list = res.rows;
    let start = pageSize * (currentPage - 1);
    list = list.slice(start, start + pageSize);
    this.body = {
      success: true,
      list,
      total: res.count,
      msg: '获取课程信息成功！'
    }
  }
}

const delCourse =async function(){
  const data = this.request.body;
  let res = courseModel.delCourse(data.cor_id);
  if(res){
    this.body = {
      success: true,
      info: `课程删除成功。`
    }
  }else{
    this.body = {
      success: false,
      info: `课程删除失败。`
    }
  }
}
const addCourse = async function() {
  const data = this.request.body;
  let res = await courseModel.addCourse(data.cor_id,data.cor_name,data.cor_major,data.cor_weekdays,data.cor_hour,data.cor_start);
  if(res){
    this.body = {
      success: true,
      info:'课程添加成功！'
    }
  }else{
    this.body = {
      success: false,
      info:'课程添加失败！'
    }
  }
}

module.exports = {
  addCourse,
  delCourse,
  getCorList
}
