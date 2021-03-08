let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
var cors = require("cors");
let app = express();
app.use(cors());

let apiRoutes = require("./api-routes");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

const uri = process.env.ATLAS_URI || "mongodb://localhost/moviedb";

mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  dbName: "moviedb"
});
var db = mongoose.connection;

if (!db) console.log("Error connecting db");
else console.log("Db connected successfully");

var port = process.env.PORT || 8080;

app.get("/", (req, res) => res.send("Hello World"));

app.use("/api", apiRoutes);
app.listen(port, function () {
  console.log("Running on port " + port);
});
