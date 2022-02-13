const express = require("express");
const app = express();
const csv = require('csvtojson')
// const csv = require("csv-parser");
// const fs = require("fs");
const {readFileSync} = require("fs");
// const {parser, Parser} = require('json2csv')

let json_made = []

// const results = [];
let b = () => {
  let data = JSON.parse(readFileSync('./output.json'));

  const multi = x => x['field4'] === 'CONFIRMED' && x['field26'] < 1.6 && (x['field32'] >= .36 && x['field32'] <= 1.11)
const db = data.filter(multi)

json_made.push(db)
  // console.log('dataaa', db)
}

b()

console.log('json',json_made)



app.get("/", (req, res) => {
 
  res.send(json_made);
});



















app.listen(3000, () => {
  console.log("Server is running on Port 5000");
});
