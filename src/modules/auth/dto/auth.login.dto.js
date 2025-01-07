const Joi = require("joi");

const authCreateDto = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  fullName: Joi.string().min(3).required(),
  role: Joi.string().valid("admin", "leader", "manager", "employee").required(),
});

module.exports = { authCreateDto };