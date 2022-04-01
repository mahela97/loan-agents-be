const {
    test,
    registerUser,
} = require("../controllers/userControllers/userController");
const router = require("express").Router();

router.get("/", test);
router.post("/register", registerUser);

module.exports = router;
