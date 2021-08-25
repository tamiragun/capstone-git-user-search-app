const fetch = require("node-fetch");

const getData = async (url) => {
  const response = await fetch(url);
  //console.log("Response: ", response, ", Type: ", typeof response);
  const jsonResponse = await response.json();
  //console.log("jsonResults: ", jsonResponse, ", Type: ", typeof jsonResponse);
  return jsonResponse;
};

module.exports = { getData };
