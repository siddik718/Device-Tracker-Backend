const { validateEmail, validatePassword } = require("../utils/validator")

describe("Validate Email",()=>{
    it("should return true if given email is valid email",()=>{
        expect(validateEmail("test@example.com")).toBeTruthy();
        expect(validateEmail("user1234@test.co.uk")).toBeTruthy();
        expect(validateEmail("another.email@test123.net")).toBeTruthy();
        expect(validateEmail("email-with-dash@example-test.com")).toBeTruthy();
    });
    it("should return false if given email is valid email",()=>{
        expect(validateEmail("invalidemail.com")).toBeFalsy();
        expect(validateEmail("test@invalid")).toBeFalsy();
        expect(validateEmail("test@.com")).toBeFalsy();
        expect(validateEmail("test@@example.com")).toBeFalsy();
        expect(validateEmail("test@example.")).toBeFalsy();
    });

});

describe('validate password', () => { 
    it('should return true if password is atleat 8 length contains atleast one uppercase, atleast one lowercase, atleast one digit, atleast one special charachter',()=>{
        expect(validatePassword("1aA!&12345678")).toBeTruthy();
    });
    it('should return false if password is atleat 8 length contains atleast one uppercase, atleast one lowercase, atleast one digit, atleast one special charachter',()=>{
        expect(validatePassword("1aA12345678")).toBeFalsy(); // no special character
    });
 });