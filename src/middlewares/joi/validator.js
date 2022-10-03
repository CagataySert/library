import schemas from "./schemas";

const validator = (schemaName) => {
  if (!schemas.hasOwnProperty(schemaName))
    throw new Error(`'${schemaName}' schema is not exist`);

  return async function (req, res, next) {
    const schema = schemas[schemaName];
    const data = req.body;

    const { error, value } = schema.validate(data);

    if (error) {
      console.log(error.message);
      res.status(422).json({
        message: "Invalid request",
        data,
        error: error.message,
      });
    } else {
      next();
    }
  };
};

export default validator;
