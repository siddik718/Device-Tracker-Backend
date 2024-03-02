const dummyData = [
  {
    company: "65e1ab2f23826e981973fcf7",
    Type: "Laptop",
    description: "A high-performance laptop with a sleek design.",
  },
  {
    company: "65e1ab2f23826e981973fcf7",
    Type: "Desktop",
    description: "A powerful desktop computer suitable for heavy tasks.",
  },
  {
    company: "65e1ab2f23826e981973fcf7",
    Type: "Smartphone",
    description: "A cutting-edge smartphone with advanced features.",
  },
  {
    company: "65e1ab2f23826e981973fcf7",
    Type: "Tablet",
    description: "A lightweight tablet for convenient on-the-go use.",
  },
  {
    company: "65e1ab2f23826e981973fcf7",
    Type: "Printer",
    description: "A versatile printer for all printing needs.",
  },
  {
    company: "65e1ab2f23826e981973fcf8",
    Type: "Laptop",
    description: "A high-performance laptop with a sleek design.",
  },
  {
    company: "65e1ab2f23826e981973fcf8",
    Type: "Desktop",
    description: "A powerful desktop computer suitable for heavy tasks.",
  },
  {
    company: "65e1ab2f23826e981973fcf8",
    Type: "Smartphone",
    description: "A cutting-edge smartphone with advanced features.",
  },
  {
    company: "65e1ab2f23826e981973fcf8",
    Type: "Tablet",
    description: "A lightweight tablet for convenient on-the-go use.",
  },
  {
    company: "65e1ab2f23826e981973fcf8",
    Type: "Printer",
    description: "A versatile printer for all printing needs.",
  },
  {
    company: "65e1ab2f23826e981973fcf9",
    Type: "Laptop",
    description: "A high-performance laptop with a sleek design.",
  },
  {
    company: "65e1ab2f23826e981973fcf9",
    Type: "Desktop",
    description: "A powerful desktop computer suitable for heavy tasks.",
  },
  {
    company: "65e1ab2f23826e981973fcf9",
    Type: "Smartphone",
    description: "A cutting-edge smartphone with advanced features.",
  },
  {
    company: "65e1ab2f23826e981973fcf9",
    Type: "Tablet",
    description: "A lightweight tablet for convenient on-the-go use.",
  },
  {
    company: "65e1ab2f23826e981973fcf9",
    Type: "Printer",
    description: "A versatile printer for all printing needs.",
  },
];

const Device = require("../models/device.js");

async function dummy(req, res, next) {
  // return res.json("DUMMY");
  try {
    // remove existing data
    await Device.deleteMany({});
    // insert new dummy data.
    const data = await Device.insertMany(dummyData);
    return res.status(201).json(data);
  } catch (error) {
    next(error);
  }
}
module.exports = dummy;
