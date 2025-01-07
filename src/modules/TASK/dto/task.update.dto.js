const Joi = require("joi");

const TaskUpdateDto = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  startDate: Joi.date().optional(),
  endDate: Joi.date().optional(),
  status: Joi.string().valid("pending", "in-progress", "completed").optional(),
});

module.exports = { TaskUpdateDto };
