const express = require("express");
const app = express();
const connectDB = require("./config/db");
const morgan = require('morgan')
const dotenv = require("dotenv");
const {engine} = require("express-handlebars");

dotenv.config({ path: "./config/.env" });
// Connect DB
connectDB();

// Handlebars
app.use(express.static(__dirname + '/public'))

app.set('view engine', 'hbs')

app.engine('hbs', engine({
  extname: "hbs",
  defaultLayout: 'index',
  layoutDir: __dirname + '/views/layouts',
  partialsDir: __dirname + '/views/partials',
}))

// Body Parser just in case
app.use(express.json())
//Mounting Router
const assignment = require('./router/router')

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// Mounting Routes
app.use('/', assignment)


const port = process.env.PORT || 5000
app.listen(3000, () => {
  console.log(`Server is running on Port ${port}`);
});
