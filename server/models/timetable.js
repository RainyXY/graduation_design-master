const theDatabase = require('../config/db.js').theDb;
const timeSchema = theDatabase.import('../schema/timetable.js');

const getTimetable = async function(t_user) {
  return await timeSchema.findAndCount({
    where:{
      t_user
    }
  });
}

module.exports = {
  getTimetable
}
