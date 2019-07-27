const coachController = require("../controllers/coach.js");
const router = require("koa-router")();

router.post("/coach", coachController.postTeaInfo);
router.post("/coach/updateTel",coachController.updateTel);
router.post("/coach/updateInfo",coachController.updateInfo);
router.post("/coach/list", coachController.getTeaList);
router.post("/coach/add",coachController.addTeacher);
router.post("/coach/delTeacher",coachController.delTeacher);

module.exports = router;
