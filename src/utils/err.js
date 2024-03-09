const raise = (status = 404, message = "No Data Found") => {
  throw { status, message };
};

module.exports = {
    raise,
}