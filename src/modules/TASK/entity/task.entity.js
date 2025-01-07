const { Schema, model } = require("mongoose");

const TaskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, enum: ["pending", "in-progress", "completed"], default: "pending" },
});

const TaskModel = model("Task", TaskSchema);

module.exports = { TaskModel };
