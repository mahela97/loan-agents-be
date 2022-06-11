const {getAllClients, addFavourite, removeFavourite} = require("../controllers/userControllers/userController");
const router = require("express").Router();

router.get("/all", getAllClients);

router.post("/favourite", addFavourite)
router.delete("/favourite", removeFavourite)


module.exports = router;
