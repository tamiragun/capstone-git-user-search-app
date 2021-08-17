var express = require("express");
var router = express.Router();
const fetch = require("node-fetch");

//Disable CORS
router.use((req, res, next) => {
  res.header({ "Access-Control-Allow-Origin": "*" });
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

//Return search results for a given search term
router.get("/api/search", async (req, res, next) => {
  //console.log("Query: ", req.query, ", Type: ", typeof req.query);
  const term = req.query.term;
  //console.log("Term: ", term, ", Type: ", typeof term);
  const url = `https://api.github.com/search/users?q=${term}`;
  try {
    const response = await fetch(url);
    //console.log("Response: ", response, ", Type: ", typeof response);
    const jsonResponse = await response.json();
    //console.log("jsonResults: ", jsonResponse, ", Type: ", typeof jsonResponse);
    const results = jsonResponse.items;
    //console.log("Results: ", results, ", Type: ", typeof results);
    res.send(results);
  } catch (err) {
    next(err);
  }
});

//Return a single user
router.get("/api/user", async (req, res, next) => {
  //console.log("Query: ", req.query, ", Type: ", typeof req.query);
  const user = req.query.user;
  //console.log("User: ", user, ", Type: ", typeof user);
  const url = `https://api.github.com/users/${user}`;
  try {
    const response = await fetch(url);
    console.log("Response: ", response, ", Type: ", typeof response);
    const jsonResponse = await response.json();
    console.log("jsonResults: ", jsonResponse, ", Type: ", typeof jsonResponse);
    //const results = jsonResponse.items;
    //console.log("Results: ", results, ", Type: ", typeof results);
    res.send(jsonResponse);
  } catch (err) {
    next(err);
  }
});

//Return a user's repositories
router.get("/api/repos", async (req, res, next) => {
  //console.log("Query: ", req.query, ", Type: ", typeof req.query);
  const user = req.query.user;
  //console.log("User: ", user, ", Type: ", typeof user);
  const url = `https://api.github.com/users/${user}/repos`;
  try {
    const response = await fetch(url);
    //console.log("Response: ", response, ", Type: ", typeof response);
    const jsonResponse = await response.json();
    //console.log("jsonResults: ", jsonResponse, ", Type: ", typeof jsonResponse);
    res.send(jsonResponse);
  } catch (err) {
    next(err);
  }
});

//Return a single repo
router.get("/api/repo", async (req, res, next) => {
  //console.log("Query: ", req.query, ", Type: ", typeof req.query);
  const user = req.query.user;
  const repo = req.query.repo;
  //console.log("User: ", user, ", Type: ", typeof user);
  const url = `https://api.github.com/repos/${user}/${repo}`;
  try {
    const response = await fetch(url);
    //console.log("Response: ", response, ", Type: ", typeof response);
    const jsonResponse = await response.json();
    //console.log("jsonResults: ", jsonResponse, ", Type: ", typeof jsonResponse);
    res.send(jsonResponse);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
