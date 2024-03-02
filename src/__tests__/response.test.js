const { errorMessgae, successMessage } = require("../utils/response");

let mockResponse;
beforeEach(() => {
  mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
});

describe("errorMessgae", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should return response with error status and message", () => {
    const mockError = {
      status: 404,
      message: "Not Found",
    };
    errorMessgae(mockResponse, mockError);
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith("Not Found");
  });
  it("should return response with default error status and message", () => {
    const mockError = {};
    errorMessgae(mockResponse, mockError);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Internal Server Issue",
    });
  });
});

describe("successMessage",() => {
    afterEach(()=>{
        jest.clearAllMocks();
    });
    it("should return response with sucess status,message and payload",()=>{
        const code = 200;
        const message = "All Ok";
        const payload = {
            data: "example",
        }
        successMessage(mockResponse,code,message,payload);
        expect(mockResponse.status).toHaveBeenCalledWith(code);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message,payload
        });
    });
    it("should return response with default sucess status,message and empty payload",()=>{
        const code = 200;
        const message = "Success";
        const payload = {}
        successMessage(mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(code);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message,payload
        });
    });
});