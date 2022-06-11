const {getAllClients} = require("../controllers/userControllers/userController");
const router = require("express").Router();

router.get("/all", getAllClients);

module.exports = router;
