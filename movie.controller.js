Movie = require("./movie.model");

exports.index = function (req, res) {
  Movie.get(function (err, movies) {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    }
    res.json({
      status: "success",
      message: "Movies retrieved successfully",
      data: movies,
    });
  });
};

exports.new = function (req, res) {
  var movie = new Movie();
  movie.name = req.body.name ? req.body.name : movie.name;
  movie.genre = req.body.genre;
  movie.year = req.body.year;
  movie.rate = req.body.rate;
  movie.synopsis = req.body.synopsis;
  movie.url = req.body.url;

  movie.save(function (err) {
    res.json({
      message: "New movie created!",
      data: movie,
    });
  });
};

exports.view = function (req, res) {
  Movie.findById(req.params.movie_id, function (err, movie) {
    if (err) res.send(err);
    res.json({
      message: "Movie details loading..",
      data: movie,
    });
  });
};

exports.update = function (req, res) {
  Movie.findById(req.params.movie_id, function (err, movie) {
    if (err) res.send(err);
    movie.name = req.body.name ? req.body.name : movie.name;
    movie.genre = req.body.genre;
    movie.year = req.body.year;
    movie.rate = req.body.rate;
    movie.synopsis = req.body.synopsis;
    movie.url = req.body.url;

    movie.save(function (err) {
      if (err) res.json(err);
      res.json({
        message: "Movie Info updated",
        data: movie,
      });
    });
  });
};

exports.delete = function (req, res) {
  Movie.remove(
    {
      _id: req.params.movie_id,
    },
    function (err, movie) {
      if (err) res.send(err);
      res.json({
        status: "success",
        message: "Movie deleted",
      });
    }
  );
};

exports.topten = function (req, res) {
  Movie.find(
    function (err, movies) {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    }
    res.json({
      status: "success",
      message: "Movies retrieved successfully",
      data: movies,
    });
  }).limit(10).sort({rate: -1});
};