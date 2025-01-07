const Joi = require("joi");

const messageCreateDto = Joi.object({
  sender: Joi.string().required(),  
  receiver: Joi.string().required(), 
  content: Joi.string().min(1).max(500).required(),
});

module.exports = { messageCreateDto };
