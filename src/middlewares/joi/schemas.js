import Joi from "joi";

const schemas = {
  createUsers: Joi.object({
    name: Joi.string().required(),
  }),

  createBooks: Joi.object({
    name: Joi.string().required(),
  }),
};

export default schemas;
