const dummyData = [
  {
    company: "65e1ab2f23826e981973fcf7",
    dept: "65e1ac50527bff52d07bb2b1",
    name: "John Doe",
    nid: "123456789",
    email: "john.doe@example.com",
    designation: "Software Engineer",
    salary: 50000,
  },
  {
    company: "65e1ab2f23826e981973fcf7",
    dept: "65e1ab2f23826e981973fcf7",
    name: "Jane Smith",
    nid: "987654321",
    email: "jane.smith@example.com",
    designation: "Product Manager",
    salary: 70000,
  },
  {
    company: "65e1ab2f23826e981973fcf7",
    dept: "65e1ab2f23826e981973fcf7",
    name: "Jane Doe",
    nid: "457891234",
    email: "jane.doe@example.com",
    designation: "Software Engineer Backend",
    salary: 50000,
  },
  {
    company: "65e1ab2f23826e981973fcf7",
    dept: "65e1ab2f23826e981973fcf7",
    name: "Loura Smith",
    nid: "987654321",
    email: "Loura.smith@example.com",
    designation: "Quality Assurance",
    salary: 70000,
  },
];

const Employee = require('../models/employee.js');

async function dummy(req, res, next) {
  // return res.json("DUMMY");
  try {
    // remove existing data
    await Employee.deleteMany({});
    // insert new dummy data.
    const data = await Employee.insertMany(dummyData);
    return res.status(201).json(data);
  } catch (error) {
    next(error);
  }
}
module.exports = dummy;