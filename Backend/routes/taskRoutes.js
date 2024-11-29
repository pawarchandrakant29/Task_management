const express = require("express");
const { createTask, getTasks, updateTask, deleteTask } = require("../controllers/taskController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.route("/")
  .get(getTasks)
  .post(roleMiddleware(["user", "admin"]), createTask);

router.route("/:id")
  .put(roleMiddleware(["user", "admin"]), updateTask)
  .delete(roleMiddleware(["user", "admin"]), deleteTask);

module.exports = router;
