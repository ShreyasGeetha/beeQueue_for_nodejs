const Joi = require('joi');

const createTask = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    id: Joi.string(),
    refreshToken: Joi.string()
  }),
};

const listTask = {
  body: Joi.object().keys({    
  })
};

const completedTask = {
  body: Joi.object().keys({    
  })
};

module.exports = {
  createTask,
  listTask,
  completedTask
};

