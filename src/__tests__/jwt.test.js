const { createToken, verifyToken } = require("../utils/jwt.js");
const jwt = require("jsonwebtoken");

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
  verify: jest.fn(),
}));

describe("createToken", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should throw an error if payload is not a non-empty object", async () => {
    await expect(createToken("", "key", "1m")).rejects.toThrow(
      "Payload Must be a non empty object"
    );
  });

  it("should throw an error if key is not string", async () => {
    await expect(createToken({ id: 123 }, 123, "1m")).rejects.toThrow(
      "key Must be a non empty string"
    );
  });

  it("should throw an error if key is empty", async () => {
    await expect(createToken({ id: 123 }, "", "1m")).rejects.toThrow(
      "key Must be a non empty string"
    );
  });

  it("should call jwt.sign with correct arguments and return a token", async () => {
    jwt.sign.mockReturnValue("token");
    const result = await createToken({ id: 123 }, "key", "2m");
    expect(jwt.sign).toHaveBeenCalledWith({ id: 123 }, "key", {
      expiresIn: "2m",
    });
    expect(result).toEqual("token");
  });

  it("should throw an error if jwt.sign throw error", async () => {
    const errorMessage = "Can't create token now";
    jwt.sign.mockRejectedValue(new Error(errorMessage));
    await expect(createToken({ id: 123 }, "key", "1m")).rejects.toThrow(
      errorMessage
    );
  });
});

describe("verifyToken", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should throw an error if token is invalid", () => {
    const errorMessage = "Invalid Access Token";
    jwt.verify.mockRejectedValue(new Error(errorMessage));
    expect(verifyToken("InvalidToken", "key")).rejects.toThrow(errorMessage);
    expect(jwt.verify).toHaveBeenCalledWith("InvalidToken", "key");
  });

  it("should return the data after successfull verification", () => {
    const token = { id: 123 },
      key = "unique";
    jwt.verify.mockReturnValue(token);
    const data = verifyToken(token, key);
    expect(data).toStrictEqual(token);
    expect(jwt.verify).toHaveBeenCalledWith(token, key);
  });
});
