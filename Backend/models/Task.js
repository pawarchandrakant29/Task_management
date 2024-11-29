const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: String,
  dueDate: Date,
  priority: String,
  status: { type: String, enum: ["pending", "completed", "overdue"], default: "pending" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

TaskSchema.pre("save", function (next) {
  if (this.dueDate && new Date(this.dueDate) < new Date()) {
    this.status = "overdue";
  }
  next();
});

module.exports = mongoose.model("Task", TaskSchema);
