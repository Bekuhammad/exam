const Joi = require("joi");

const TaskCreateDto = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  userId: Joi.string().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
  status: Joi.string().valid("pending", "in-progress", "completed").optional(),
});

module.exports = { TaskCreateDto };
