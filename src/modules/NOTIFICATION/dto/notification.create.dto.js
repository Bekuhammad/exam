const Joi = require("joi");

const notificationCreateDto = Joi.object({
  userId: Joi.string().required().messages({
    "string.empty": "User ID is required",
  }),
  message: Joi.string().required().messages({
    "string.empty": "Message is required",
  }),
});

module.exports = { notificationCreateDto };
