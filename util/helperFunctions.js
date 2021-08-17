const fetch = require("node-fetch");

const getData = async (url) => {
  const response = await fetch(url);
  //console.log("Response: ", response, ", Type: ", typeof response);
  const jsonResponse = await response.json();
  //console.log("jsonResults: ", jsonResponse, ", Type: ", typeof jsonResponse);
  return JSON.stringify(jsonResponse);
};

async function main() {
  const data = await getData("https://api.github.com/search/users?q=tamiragun");
  console.log(data);
  //const results = data.items;
  //console.log(results);
}

//main();

module.exports = getData;
