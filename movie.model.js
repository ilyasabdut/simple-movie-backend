var mongoose = require("mongoose");

var movieSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  year: String,
  genre: String,
  rate: Number,
  synopsis: String,
  url: String,
});

var Movie = (module.exports = mongoose.model("movie", movieSchema));
module.exports.get = function (callback, limit) {
  Movie.find(callback).limit(limit);
};
