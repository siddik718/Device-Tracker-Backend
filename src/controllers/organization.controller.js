const Organization = require("../models/organization.js");
const { successMessage } = require("../utils/response.js");
const { raise } = require("../utils/err.js");

const organization = async (req, res, next) => {
  try {
    const { org } = req;
    await org.populate("dept");
    return successMessage(res, 200, "Organization Found", org);
  } catch (error) {
    next(error);
  }
};


const update = async (req, res, next) => {
  try {
    const { org, body } = req;
    if (!body.name || body.name.length < 3) {
      raise(406, "Name is not acceptable");
    }
    const n_org = await Organization.findByIdAndUpdate(org._id, body, {
      new: true,
    }).select("-password -refreshToken");
    return successMessage(res, 200, "Name Updated Sucessfully");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  organization,
  update,
};
