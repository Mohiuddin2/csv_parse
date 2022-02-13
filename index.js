const express = require("express");
const app = express();

const csvFilePath = "kepler_data.csv";
const csv = require("csvtojson");

let result = [];

csv()
  .fromFile(csvFilePath)
  .then((jsonObj) => {
    const multi = (x) =>
      x["field4"] === "CONFIRMED" &&
      x["field26"] < 1.6 &&
      x["field32"] >= 0.36 &&
      x["field32"] <= 1.11;
    const db = jsonObj.filter(multi);
    result.push(db);
    console.log("jsonObd", db);
  });

  // Get Route for Showing Result
app.get("/", (req, res) => {
  res.send(result);
});

app.listen(3000, () => {
  console.log("Server is running on Port 5000");
});
