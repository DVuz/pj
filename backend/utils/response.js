const successResponse = (res, data = {}, statusCode = 200, message = 'Success', source= "") => {
  return res.status(statusCode).json({
    status: 'success',
    message,
    data,
    source,
  });
};

const errorResponse = (res, data = {}, statusCode = 500, message = 'Error', source= "") => {
  return res.status(statusCode).json({
    status: 'error',
    message,
    data,
    source
  });``
};

module.exports = {
  successResponse,
  errorResponse,
};
