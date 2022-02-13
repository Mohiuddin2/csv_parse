const express = require("express");
const app = express();

const csv = require("csv-parser");
const fs = require("fs");
const {readFileSync} = require("fs");

const results = [];
fs.createReadStream('a.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    
    let data = JSON.parse(readFileSync(results));
    const multi = x => x['field4'] === 'CONFIRMED' && x['field26'] < 1.6 && (x['field32'] >= .36 && x['field32'] <= 1.11)
    const db = data.filter(multi)
    console.log(db);
  });



app.get("/", (req, res) => {
  const new1 = results.filter((word) => word.value === "koi_disposition");
  console.log(new1);
  res.send(new1);
});












app.listen(3000, () => {
  console.log("Server is running on Port 5000");
});
