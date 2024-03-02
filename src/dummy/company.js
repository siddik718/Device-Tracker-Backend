const dummyOffices = [
  {
    name: "Office 1",
    address: "123 Main St, City, Country",
    email: "office1@example.com",
    password: "password123",
    branch: ["Branch 1", "Branch 2"],
  },
  {
    name: "Office 2",
    address: "456 Elm St, Town, Country",
    email: "office2@example.com",
    password: "password456",
    branch: ["Branch 3"],
  },
  {
    name: "Office 3",
    address: "789 Oak St, Village, Country",
    email: "office3@example.com",
    password: "password789",
    branch: ["Branch 4"],
  },
  {
    name: "Office 4",
    address: "1011 Pine St, Hamlet, Country",
    email: "office4@example.com",
    password: "password1011",
    branch: ["Branch 5"],
  },
  {
    name: "Office 5",
    address: "123 Main St, City, Country",
    email: "office5@example.com",
    password: "password123",
    branch: ["Branch 1", "Branch 2"],
  },
  {
    name: "Office 6",
    address: "456 Elm St, Town, Country",
    email: "office6@example.com",
    password: "password456",
    branch: ["Branch 3"],
  },
  {
    name: "Office 7",
    address: "789 Oak St, Village, Country",
    email: "office7@example.com",
    password: "password789",
    branch: ["Branch 4"],
  },
  {
    name: "Office 8",
    address: "1011 Pine St, Hamlet, Country",
    email: "office8@example.com",
    password: "password1011",
    branch: ["Branch 5"],
  },
];

const Company = require('../models/company.js');

async function dummy(req,res,next) {
    try {
        // remove existing data
        await Company.deleteMany({});
        // insert new dummy data.
        const data = await Company.insertMany(dummyOffices);
        return res.status(201).json(data);
    } catch (error) {
       next(error);
    }
}
module.exports = dummy;
