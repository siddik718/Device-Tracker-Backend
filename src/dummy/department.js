const dummyData = [
  {
    company: "65e1ab2f23826e981973fcf7",
    name: "Department 1",
  },
  {
    company: "65e1ab2f23826e981973fcf7",
    name: "Department 2",
  },
  {
    company: "65e1ab2f23826e981973fcf7",
    name: "Department 3",
  },
  {
    company: "65e1ab2f23826e981973fcf7",
    name: "Department 4",
  },
  {
    company: "65e1ab2f23826e981973fcf7",
    name: "Department 5",
  },
  {
    company: "65e1ab2f23826e981973fcf8",
    name: "Department 1",
  },
  {
    company: "65e1ab2f23826e981973fcf8",
    name: "Department 2",
  },
  {
    company: "65e1ab2f23826e981973fcf8",
    name: "Department 3",
  },
  {
    company: "65e1ab2f23826e981973fcf8",
    name: "Department 4",
  },
  {
    company: "65e1ab2f23826e981973fcf8",
    name: "Department 5",
  },
  {
    company: "65e1ab2f23826e981973fcf9",
    name: "Department 1",
  },
  {
    company: "65e1ab2f23826e981973fcf9",
    name: "Department 2",
  },
  {
    company: "65e1ab2f23826e981973fcf9",
    name: "Department 3",
  },
  {
    company: "65e1ab2f23826e981973fcf9",
    name: "Department 4",
  },
  {
    company: "65e1ab2f23826e981973fcf9",
    name: "Department 5",
  },
];

const Department = require('../models/department.js');

async function dummy(req,res,next) {
    try {
        // remove existing data
        await Department.deleteMany({});
        // insert new dummy data.
        const data = await Department.insertMany(dummyData);
        return res.status(201).json(data);
    } catch (error) {
        next(error)
    }
}
module.exports = dummy;