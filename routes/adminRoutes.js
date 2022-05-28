const {register, login, getCurrentUser} = require("../controllers/userControllers/adminController");
const {isAdmin} = require("../middlewares/isAdmin");
const router = require("express").Router();

router.post("/register", register)
router.post("/login", login)
router.get("/me", isAdmin, getCurrentUser)

module.exports = router;
