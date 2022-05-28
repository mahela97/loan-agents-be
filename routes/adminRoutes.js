const {register} = require("../controllers/userControllers/adminController");
const router = require("express").Router();

router.post("/register", register)


module.exports = router;
