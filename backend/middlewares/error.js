const HandleErrors = (func) => async (req, res, next) => {
    try {
      await func(req, res, next);
    } catch (err) {
      console.error("error handler", err);
      res.status(400).send(err);
      next(err);
    }
  };
  module.exports = HandleErrors;
  