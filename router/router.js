const express = require("express");
const router = express.Router();
const csv = require("csvtojson");
const Friend = require("../model/Friend");
// Filtering habitable planet
const csvFilePath = "kepler_data.csv";

const friends = [
  {
    id: 0,
    name: "Albert Einstein",
  },
  {
    id: 1,
    name: "Sir Isaac Newton",
  },
];

const newFrend = [
  {
    id: 2,
    name: "Elon Musk",
  },
];

// Problem 1
// @desc Get habitable planet
// @route GET /
// @Method GET /
// @access Public
router.get("/", (req, res) => {
  // res.json(result);
  let result = [];
  csv()
    .fromFile(csvFilePath)
    .then((kepla_data) => {
      const match = (x) =>
        x["field4"] === "CONFIRMED" &&
        x["field26"] < 1.6 &&
        x["field32"] >= 0.36 &&
        x["field32"] <= 1.11;
      const db = kepla_data.filter(match);
      result.push(db);
      console.log("kepla_data: ", db);
      // res.send("kepla_data: ", db);
    });

  res.render("habi_planet.hbs", {
    result: `Habitable Planet data in on console/terminal of vscode..`,
  });
});

// Problem 2
// @desc Get Friend
// @route /firends
// @method GET
// @access Public
router.get("/friends", async (req, res) => {
  const allfriend = await Friend.find(
    {},
    { addresses: { $slice: [0, 1] }, '_id': false },
    
  );

  // res.json(fri);
  res.render("main", { allfriend });
});

// @desc add Friend
// @route /firends2
// @method POST
// @access Public

router.post("/friend2", async (req, res) => {
  await Friend.create(friends);
  res.json(friends);
});

// Problem 3
// @desc Get Friend
// @route /firends/0
// @method GET
// @access Public
router.get("/friends/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const friend1 = await Friend.findOne({ id },  { addresses: { $slice: [0, 1] }, '_id': false },);
    res.json(friend1);
  } catch (error) {
    console.log(error);
  }
});

// Adding tow Friends
// @desc Get Friend
// @route /firends/0
// @method GET
// @access Public
router.post("/friend", async (req, res) => {
  const addNew = await Friend.create(newFrend);
  res.status(201).json({
    success: true,
    data: addNew,
  });
});

module.exports = router;
