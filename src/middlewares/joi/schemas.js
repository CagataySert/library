import Joi from "joi";

const schemas = {
  createUsers: Joi.object({
    name: Joi.string().required(),
  }),

  createBooks: Joi.object({
    name: Joi.string().required(),
  }),
  returnBook: Joi.object({
    score: Joi.number().integer().min(1).max(10),
  }),
};

export default schemas;
