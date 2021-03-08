let mongoose = require("mongoose");
let Movie = require("../movie.model");

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");
let should = chai.should();

chai.use(chaiHttp);

describe("Movies", () => {
  beforeEach((done) => {
    Movie.remove({}, (err) => {
      done();
    });
  });

  /*
   * Test the /GET route
   */
  describe("/GET movie", () => {
    it("it should GET all the movies", (done) => {
      chai
        .request(server)
        .get("/api/movies")
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  /*
   * Test the /GET route
   */
  describe("/GET top 10 movies", () => {
    it("it should GET the top 10 movies", (done) => {
      chai
        .request(server)
        .get("/api/movies/top10")
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  /*
   * Test the /POST route
   */
  describe("/POST movie", () => {
    it("it should POST a movie ", (done) => {
      let movie = {
        name: "The Lord of the Rings",
        genre: "Fantasy",
        year: 1954,
        rate: 9.9,
        synopsis: "One ring to rule them all",
        url: "www.google.com",
      };
      chai
        .request(server)
        .post("/api/movies")
        .send(movie)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("message").eql("New movie created!");
          done();
        });
    });
  });
  /*
   * Test the /PUT/:id route
   */
  describe("/PUT/:id movie", () => {
    it("it should UPDATE a movie given the id", (done) => {
      let movie = new Movie({
        name: "The Lord of the Ringssaa",
        genre: "Fantasy",
        year: 1957,
        rate: 9.9,
        synopsis: "One ring to rule them all",
        url: "www.google.com",
      });
      movie.save((err, movie) => {
        chai
          .request(server)
          .put("/api/movies/" + movie.id)
          .send({
            name: "The Lord of the Lords: Second Movie",
            genre: "Fantasy",
            year: 1954,
            rate: 9.9,
            synopsis: "One ring to rule them all",
            url: "www.google.com",
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("message").eql("Movie Info updated");
            done();
          });
      });
    });
  });
  /*
   * Test the /DELETE/:id route
   */
  describe("/DELETE/:id movie", () => {
    it("it should DELETE a movie given the id", (done) => {
      let movie = new Movie({
        name: "The Lord of the Ringgo",
        genre: "Fantasy",
        year: 1954,
        rate: 9.9,
        synopsis: "One ring to rule them all",
        url: "www.google.com",
      });
      movie.save((err, movie) => {
        chai
          .request(server)
          .delete("/api/movies/" + movie.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("message").eql("Movie deleted");
            done();
          });
      });
    });
  });
});
