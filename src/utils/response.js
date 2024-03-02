function errorMessgae(res, error) {
  let status = error.status || 500;
  let message = error.message || "Internal Server Issue";
  return res.status(status).json({
    status: status,
    message: message,
  });
}
function successMessage(res, code = 200, message = "Success", payload = {}) {
  return res.status(code).json({
    status: code,
    message: message,
    payload: payload,
  });
}

module.exports = {
  errorMessgae,
  successMessage,
};
