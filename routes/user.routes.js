const router = require("express").Router();
const { createUser, updateUser } = require("../controller/user");

router.post("/", createUser);
router.patch('/:id', updateUser)

module.exports = router;
