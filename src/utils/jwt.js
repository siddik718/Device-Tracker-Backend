const jwt = require("jsonwebtoken");

const createToken = async (payload, key, time) => {
  if (typeof payload !== "object" || payload.length === 0) {
    throw new Error("Payload Must be a non empty object");
  }
  if (typeof key !== "string" || key === "") {
    throw new Error("key Must be a non empty string");
  }
  try {
    const token = await jwt.sign(payload, key, { expiresIn: time });
    return token;
  } catch (error) {
    throw error;
  }
};

const verifyToken = (token,key) => {
  const data = jwt.verify(token,key);
  if(!data) {
    throw new Error("Invalid Access Token");
  }
  return data;
}

module.exports = {
  createToken,verifyToken
}