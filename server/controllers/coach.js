const teacherModel = require('../models/coach.js');
const userModel = require('../models/users.js');


const postTeaInfo = async function() {
  const data = this.request.body; // 用 post 传过来的数据存放于 request.body
  console.log("data.id:" + data.id)
  const teaInfo = await teacherModel.getTeaById(data.id);

  if (teaInfo != null) { // 如果查无此用户会返回 null
    this.body = {
      success: true,
      data: teaInfo
    }
  } else {
    this.body = {
      success: false,
      data:teaInfo,
      info: '暂无此用户'
    }
  }
}

//修改coach表的tel字段
const updateTel =async function(){
  const data = this.request.body;
  const teaInfo = await teacherModel.getTeaById(data.id);
  if(data.id && teaInfo){
    await teacherModel.updateTel(data.id,data.tel);
    this.body = {
      success: true,
      info: '手机号码修改成功！'
    }
  }
}
//update teacher's information
const updateInfo =async function(){
  const data = this.request.body;
  await teacherModel.updateInfo(data.coach_id, data.coach_name, data.coach_gender, data.coach_phone, data.coach_strong, data.coach_income);
  this.body = {
    success: true,
    info: '教练信息更新成功！'
  }
}
//fetch teacher's information with tea_id
const getTeaList = async function() {
  const result = await teacherModel.getTeaList();
  const currentPage = this.request.body.currentPage;
  const pageSize = this.request.body.pageSize;
  let list = result.rows;
  let start = pageSize * (currentPage - 1);
  list = list.slice(start, start + pageSize);
  this.body = {
    success: true,
    list,
    total: result.count,
    msg: '获取教练列表成功！'
  }
}
//add
const addTeacher = async function() {
  const data = this.request.body;
  let tea = await teacherModel.addTeacher(data.coach_id, data.coach_name, data.coach_gender, data.coach_phone, data.coach_strong, data.coach_income);
  let user = await userModel.addUser(data.coach_id,data.coach_name,data.coach_id,1);
  if(tea&&user){
    this.body = {
      success: true,
      info:'教练信息添加成功！'
    }
  }else{
    this.body = {
      success: false,
      info:'教练信息添加失败！'
    }
  }
}
//delete a teacher's information with coach_id
const delTeacher = async function(){
  const data = this.request.body;
  let res = await teacherModel.delTeacher(data.coach_id);
  let res1= await userModel.delUser(data.coach_id);
  if(res){
    this.body={
      success:true,
      info:'教练信息删除成功！'
    }
  }else{
    this.body={
      success:false,
      info:'教练信息删除失败。'
    }
  }
}
module.exports = {
  postTeaInfo,
  getTeaList,
  updateTel,
  addTeacher,
  updateInfo,
  delTeacher
}
