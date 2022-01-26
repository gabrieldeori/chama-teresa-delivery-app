function midError(err, _req, res, _nex) {
  const { error, statusCode } = err;
  return res.status(statusCode).json(error);
}

module.exports = midError;
