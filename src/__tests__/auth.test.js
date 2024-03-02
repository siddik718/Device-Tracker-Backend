const { isEmailExist, isIdExist, isLoggedIn } = require("../middlewires/auth");
const Company = require("../models/company.js");
const { verifyToken } = require("../utils/jwt.js");

jest.mock("../models/company.js");
jest.mock("../utils/jwt.js",()=>({
    verifyToken: jest.fn(),
}));

let mockReq, mockRes, mockNext;

beforeEach(() => {
  mockReq = {
    body: {
      email: "test@example.com",
    },
    params: {
      id: 1,
    },
    cookies: {
      token: "token",
    },
  };
  mockRes = {};
  mockNext = jest.fn();
});

describe("isEmailExist", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should call next if successful Company.findOne", async () => {
    const data = { email: "test@example.com" };
    Company.findOne.mockImplementation(() => data);
    await isEmailExist(mockReq, mockRes, mockNext);
    expect(Company.findOne).toHaveBeenCalledWith({ email: mockReq.body.email });
    expect(mockReq.isExist).toBeDefined();
    expect(mockNext).toHaveBeenCalledTimes(1);
  });
  it("should call next with error if unsuccessful Company.findOne", async () => {
    const error = "Server Error";
    Company.findOne.mockRejectedValue(new Error(error));
    await isEmailExist(mockReq, mockRes, mockNext);
    expect(Company.findOne).toHaveBeenCalledWith({ email: mockReq.body.email });
    expect(mockReq.isExist).not.toBeDefined();
    expect(mockNext).toHaveBeenCalledWith(new Error(error));
  });
});

describe("isIdExist", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should throw error if id not exist", async () => {
    Company.findById.mockImplementation({});
    await isIdExist(mockReq, mockRes, mockNext);
    expect(Company.findById).toHaveBeenCalledWith(mockReq.params.id, {
      password: 0,
    });
    expect(mockReq.isExist).not.toBeDefined();
    expect(mockNext).toHaveBeenCalledWith(
      new Error({ status: 404, message: `No Data Found with this 1` })
    );
  });
  it("should include req.exist if id exist", async () => {
    Company.findById.mockImplementation(() => ({
      id: 1,
    }));
    await isIdExist(mockReq, mockRes, mockNext);
    expect(Company.findById).toHaveBeenCalledWith(mockReq.params.id, {
      password: 0,
    });
    expect(mockReq.isExist).toBeDefined();
    expect(mockNext).toHaveBeenCalledTimes(1);
  });
  it("should throw error for database error", async () => {
    const error = "Server Error";
    Company.findById.mockRejectedValue(new Error(error));
    await isIdExist(mockReq, mockRes, mockNext);
    expect(Company.findById).toHaveBeenCalledWith(mockReq.params.id, {
      password: 0,
    });
    expect(mockReq.isExist).not.toBeDefined();
    expect(mockNext).toHaveBeenCalledWith(new Error(error));
  });
});

describe("isLoogedIn", () => {
    afterEach(()=>{
        jest.clearAllMocks();
    });
    it('should call next with error if token does not exist',async()=>{
        mockReq.cookies.token = "";
        await isLoggedIn(mockReq,mockRes,mockNext);
        expect(verifyToken).not.toHaveBeenCalled();
        expect(mockReq.decodedData).toBeUndefined();
        expect(mockNext).toHaveBeenCalledWith({status: 401, message: 'Access token not found'});
    });
    it('should call next with decoded data if token does exist',async()=>{
        const decodedData = { userId: 123 };
        verifyToken.mockReturnValue(decodedData);
        await isLoggedIn(mockReq,mockRes,mockNext);
        expect(verifyToken).toHaveBeenCalledTimes(1);
        expect(mockReq.decodedData).toStrictEqual(decodedData);
        expect(mockNext).toHaveBeenCalledTimes(1);
    });
});
