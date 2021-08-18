const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();

chai.use(chaiHttp);

//Test to ensure that the search API is working
describe("1/5: Display search results API", function () {
  //Testing with a given Github account
  describe("In the case of a currect Github user: ", function () {
    it("It should return the correct Github user object", function (done) {
      //This user only exists on Github, not Gitlab
      let query = { term: "tamiragun" };
      //So the query should return an array with one object
      chai
        .request("http://localhost:3001")
        .get("/api/search")
        .query(query)
        .end((err, res) => {
          res.should.have.status(200);
          res.text.should.eql(
            '[{"id":37237140,"name":"Tamira","login":"tamiragun","avatar":"https://avatars.githubusercontent.com/u/37237140?v=4","url":"https://api.github.com/users/tamiragun","source":"Github"}]'
          );
          done();
        });
    }).timeout(5000);
  });

  //Testing with a given Gitlab account
  describe("In the case of a currect Gitlab user: ", function () {
    it("It should return the correct Gitlab user object", function (done) {
      //This user only exists on Gitlab, not Github
      let query = { term: "jack_smith" };
      //So the query should return an array with one object
      chai
        .request("http://localhost:3001")
        .get("/api/search")
        .query(query)
        .end((err, res) => {
          res.should.have.status(200);
          res.text.should.eql(
            '[{"id":5023502,"name":"Jack Smith ","login":"jack_smith","avatar":"https://secure.gravatar.com/avatar/7d6526c2dfc4ab33923ebb9bdad29faa?s=80&d=identicon","url":"https://gitlab.com/jack_smith","source":"Gitlab"}]'
          );
          done();
        });
    }).timeout(5000);
  });

  //Testing with a given Github and Gitlab account
  describe("In the case of a currect Github and Gitlab user: ", function () {
    it("It should return an array with the correct Github and Gitlab user objects", function (done) {
      //This user exists on both Gitlab and Github
      let query = { term: "jack" };
      //so the query should return two objects in the array
      chai
        .request("http://localhost:3001")
        .get("/api/search")
        .query(query)
        .end((err, res) => {
          res.should.have.status(200);
          res.text.should.eql(
            '[{"id":85945244,"name":null,"login":"jack","avatar":"https://avatars.githubusercontent.com/u/85945244?v=4","url":"https://api.github.com/users/jack","source":"Github"},{"id":796,"name":"Jack Brown","login":"jack","avatar":"https://secure.gravatar.com/avatar/d1bd5ee624480b3a595660a4e84693c2?s=80&d=identicon","url":"https://gitlab.com/jack","source":"Gitlab"}]'
          );
          done();
        });
    }).timeout(5000);
  });

  //Testing with a non-existent account
  describe("In the case of no matching Github or Gitlab user: ", function () {
    it("It should return an empty array", function (done) {
      //This user exists on neither Gitlab nor Github
      let query = { term: "1Gshdjfsh" };
      //So the query should return an empty array
      chai
        .request("http://localhost:3001")
        .get("/api/search")
        .query(query)
        .end((err, res) => {
          res.should.have.status(200);
          res.text.should.eql("[]");
          done();
        });
    }).timeout(5000);
  });
});

//Test to ensure that the display user API is working
describe("2/5: Display single user API", function () {
  //Testing with a given Github account
  describe("In the case of a currect Github user: ", function () {
    it("It should return the correct Github user object", function (done) {
      //This user exists on Github
      let query = { user: "tamiragun", source: "Github" };

      chai
        .request("http://localhost:3001")
        .get("/api/user")
        .query(query)
        .end((err, res) => {
          res.should.have.status(200);
          res.text.should.eql(
            '{"id":37237140,"name":"Tamira","login":"tamiragun","avatar":"https://avatars.githubusercontent.com/u/37237140?v=4","url":"https://api.github.com/users/tamiragun","source":"Github"}'
          );
          done();
        });
    }).timeout(5000);
  });

  //Testing with a given Gitlab account
  describe("In the case of a currect Gitlab user: ", function () {
    it("It should return the correct Gitlab user object", function (done) {
      //This user exists on Gitlab
      let query = { user: "jack_smith", source: "Gitlab" };

      chai
        .request("http://localhost:3001")
        .get("/api/user")
        .query(query)
        .end((err, res) => {
          res.should.have.status(200);
          res.text.should.eql(
            '{"id":5023502,"name":"Jack Smith ","login":"jack_smith","avatar":"https://secure.gravatar.com/avatar/7d6526c2dfc4ab33923ebb9bdad29faa?s=80&d=identicon","url":"https://gitlab.com/jack_smith","source":"Gitlab"}'
          );
          done();
        });
    }).timeout(5000);
  });

  //Testing with wrong parameters
  describe("In the case of not adding the right parameters: ", function () {
    it("Omitting the source should fail the request", function (done) {
      //This query does not have the source property
      let query = { user: "jack_smith" };

      chai
        .request("http://localhost:3001")
        .get("/api/user")
        .query(query)
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    }).timeout(5000);

    it("Omitting the user should fail the request", function (done) {
      //This query does not have the user property
      let query = { source: "Gitlab" };

      chai
        .request("http://localhost:3001")
        .get("/api/user")
        .query(query)
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    }).timeout(5000);

    it("Getting a 404 from Github should fail the request", function (done) {
      //This user does not exist on Github
      let query = { user: "jack_smith", source: "Github" };

      chai
        .request("http://localhost:3001")
        .get("/api/user")
        .query(query)
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    }).timeout(5000);

    it("Getting a 404 from Gitlab should fail the request", function (done) {
      //This user does not exist on Gitlab
      let query = { user: "tamiragun", source: "Gitlab" };

      chai
        .request("http://localhost:3001")
        .get("/api/user")
        .query(query)
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    }).timeout(5000);
  });
});

//Test to ensure that the display repository API is working
describe("3/5: Display single repository API", function () {
  //Testing with a given Github account
  describe("In the case of a correct Github repo: ", function () {
    it("It should return the correct Github repo object", function (done) {
      //This repository exists on Github
      let query = {
        user: "tamiragun",
        source: "Github",
        reponame: "fedsa-project-1",
        repoid: 385521118,
      };

      chai
        .request("http://localhost:3001")
        .get("/api/repo")
        .query(query)
        .end((err, res) => {
          res.should.have.status(200);
          res.text.should.eql(
            '{"id":385521118,"name":"fedsa-project-1","description":"A mentoring project by Front End Development South Africa","created_at":"2021-07-13T07:47:10Z","updated_at":"2021-08-10T09:17:56Z","owner":"tamiragun","source":"Github"}'
          );
          done();
        });
    }).timeout(5000);
  });

  //Testing with a given Gitlab account
  describe("In the case of a correct Gitlab repo: ", function () {
    it("It should return the correct Gitlab repo object", function (done) {
      //This repository exists on Gitlab
      let query = {
        user: "jack_smith",
        source: "Gitlab",
        reponame: "My Awesome Project",
        repoid: 15532034,
      };

      chai
        .request("http://localhost:3001")
        .get("/api/repo")
        .query(query)
        .end((err, res) => {
          res.should.have.status(200);
          res.text.should.eql(
            '{"id":15532034,"name":"My Awesome Project","description":"This is my Test Project ","created_at":"2019-11-25T20:26:40.178Z","updated_at":"2019-11-25T20:26:40.178Z","owner":"jack_smith","source":"Gitlab"}'
          );
          done();
        });
    }).timeout(5000);
  });

  //Testing with wrong parameters
  describe("In the case of not adding the right parameters: ", function () {
    it("Getting a 404 from Github should fail the request", function (done) {
      //This repository does not exists on Github
      let query = {
        user: "jack_smith",
        source: "Github",
        reponame: "My Awesome Project",
        repoid: 15532034,
      };

      chai
        .request("http://localhost:3001")
        .get("/api/repo")
        .query(query)
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    }).timeout(5000);

    it("Getting a 404 from Gitlab should fail the request", function (done) {
      //This repository does not exists on Gitlab
      let query = {
        user: "tamiragun",
        source: "Gitlab",
        reponame: "fedsa-project-1",
        repoid: 385521118,
      };

      chai
        .request("http://localhost:3001")
        .get("/api/repo")
        .query(query)
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    }).timeout(5000);
  });
});

//Test to ensure that the list repositories API is working
describe("4/5: Display list of repositories API", function () {
  //Testing with a given Github account
  describe("In the case of a correct Github user: ", function () {
    it("It should return the correct list of Github repos for that user", function (done) {
      //This user exists on Github
      let query = {
        user: "tamiragun",
        source: "Github",
      };

      chai
        .request("http://localhost:3001")
        .get("/api/repos")
        .query(query)
        .end((err, res) => {
          res.should.have.status(200);
          res.text.should.eql(
            '[{"id":385521118,"name":"fedsa-project-1","description":"A mentoring project by Front End Development South Africa","created_at":"2021-07-13T07:47:10Z","updated_at":"2021-08-10T09:17:56Z"},{"id":389909822,"name":"hangman","description":"A React app to play the game \'hangman\'","created_at":"2021-07-27T08:42:56Z","updated_at":"2021-08-04T12:57:05Z"},{"id":377929378,"name":"RainbowMeds","description":"Project for hackathon with theme \\"Disrupting monolingualism in digital spaces\\"","created_at":"2021-06-17T18:41:05Z","updated_at":"2021-06-22T18:52:23Z"},{"id":357638666,"name":"tamiragun","description":"Config files for my GitHub profile.","created_at":"2021-04-13T17:37:03Z","updated_at":"2021-04-13T17:38:59Z"}]'
          );
          done();
        });
    }).timeout(5000);
  });

  //Testing with a given Gitlab account
  describe("In the case of a correct Gitlab user: ", function () {
    it("It should return the correct list of Gitlab repos for that user", function (done) {
      //This user exists on Github
      let query = {
        user: "jack_smith",
        source: "Gitlab",
      };

      chai
        .request("http://localhost:3001")
        .get("/api/repos")
        .query(query)
        .end((err, res) => {
          res.should.have.status(200);
          res.text.should.eql(
            '[{"id":15532034,"name":"My Awesome Project","description":"This is my Test Project ","created_at":"2019-11-25T20:26:40.178Z","updated_at":"2019-11-25T20:26:40.178Z"}]'
          );
          done();
        });
    }).timeout(5000);
  });

  //Testing with wrong parameters
  describe("In the case of not adding the right parameters: ", function () {
    it("Getting a 404 from Github should fail the request", function (done) {
      //This user does not exist on Github
      let query = {
        user: "jack_smith",
        source: "Github",
      };

      chai
        .request("http://localhost:3001")
        .get("/api/repos")
        .query(query)
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    }).timeout(5000);

    it("Getting a 404 from Gitlab should fail the request", function (done) {
      //This user does not exist on Gitlab
      let query = {
        user: "tamiragun",
        source: "Gitlab",
      };

      chai
        .request("http://localhost:3001")
        .get("/api/repos")
        .query(query)
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    }).timeout(5000);
  });
});

//Test to ensure that the list commits API is working
describe("5/5: Display list of commits API", function () {
  //Testing with a given Github account
  describe("In the case of a correct Github repo: ", function () {
    it("It should return the correct list of Github commits for that repo", function (done) {
      //This repository exists on Github
      let query = {
        user: "tamiragun",
        source: "Github",
        reponame: "fedsa-project-1",
        repoid: 385521118,
      };

      chai
        .request("http://localhost:3001")
        .get("/api/commits")
        .query(query)
        .end((err, res) => {
          res.should.have.status(200);
          res.text.should.eql(
            '[{"id":"2aeef88bdfecd84e3d314fea07aec5ebb2113e6e","message":"Merge pull request #9 from tamiragun/feat/liked-products\\n\\nFeat/liked products","committed_date":"2021-08-10T09:17:53Z"},{"id":"49e28acadfc90e71f350726d9cbd63666e2231b8","message":"Heart button changes colour when clicked","committed_date":"2021-08-10T09:11:39Z"},{"id":"1b802b82bdc03891f3e81fade067584e72f1dffb","message":"Liked items functionality","committed_date":"2021-08-09T18:18:15Z"},{"id":"3952088193f62ce05cacf65d8164b232fb9304e2","message":"Merge pull request #8 from tamiragun/feat/cart-total\\n\\nAdd dynamic cart total to page","committed_date":"2021-08-08T17:45:32Z"},{"id":"9e7e133afa219ec5a0c3afe7a3ec951317d0e58b","message":"Add dynamic cart total to page","committed_date":"2021-08-08T17:43:16Z"}]'
          );
          done();
        });
    }).timeout(5000);
  });

  //Testing with a given Gitlab account
  describe("In the case of a correct Gitlab repo: ", function () {
    it("It should return the correct list of Gitlab commits for that repo", function (done) {
      //This repository exists on Github, and has commits
      let query = {
        user: "jack",
        source: "Gitlab",
        reponame: "thunderbird-patch-reader",
        repoid: 20083142,
      };

      chai
        .request("http://localhost:3001")
        .get("/api/commits")
        .query(query)
        .end((err, res) => {
          res.should.have.status(200);
          res.text.should.eql(
            '[{"id":"75c1408eb085bb99c6176787d13abec958d3da71","message":"wip\\n","committed_date":"2020-07-21T10:47:18.000-07:00"}]'
          );
          done();
        });
    }).timeout(5000);
  });

  //Testing with wrong parameters
  describe("In the case of not adding the right parameters: ", function () {
    it("Getting a 404 from Github should fail the request", function (done) {
      //This repository does not exist on Github
      let query = {
        user: "jack_smith",
        source: "Github",
        reponame: "feds-project-1",
        repoid: 385521118,
      };

      chai
        .request("http://localhost:3001")
        .get("/api/commits")
        .query(query)
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    }).timeout(5000);

    it("Getting a 404 from Gitlab should fail the request", function (done) {
      //This repository does not exist on Gitlab
      let query = {
        user: "jack",
        source: "Gitlab",
        reponame: "thunderbird-patch-reader",
        repoid: 200142,
      };

      chai
        .request("http://localhost:3001")
        .get("/api/commits")
        .query(query)
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    }).timeout(5000);
  });
});
