var express = require("express");
var router = express.Router();
const fetch = require("node-fetch");
//const { getData } = require("../util/helperFunctions.js");

//Helper function to call a third party API and convert the results
const getData = async (url) => {
  const response = await fetch(url);
  const jsonResponse = await response.json();
  return jsonResponse;
};

//CORS settings to allow the client to make requests to the server
router.use((req, res, next) => {
  res.header({ "Access-Control-Allow-Origin": "*" });
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

//API endpoint to return search results for a given search term
router.get("/api/search", async (req, res, next) => {
  //Extract the data received from the request, and construct the urls
  //for the third party endpoints
  const term = req.query.term;
  const urlGithub = `https://api.github.com/users/${term}`;
  const urlGitlab = `https://gitlab.com/api/v4/users?username=${term}`;
  //Initialize empty array, to which we will push the results
  let resultsArray = [];

  try {
    //First, fetch results from Github:
    const dataGithub = await getData(urlGithub);
    //If there are results, create a custom object using only the fields we need
    if (dataGithub.message !== "Not Found") {
      const resultGithub = {
        id: dataGithub.id,
        name: dataGithub.name,
        login: dataGithub.login,
        avatar: dataGithub.avatar_url,
        url: dataGithub.url,
        source: "Github",
      };
      //Then add the object to the array of search results
      resultsArray.push(resultGithub);
    }

    //Next, fetch results from Gitlab:
    const dataGitlab = await getData(urlGitlab);
    //If there are results, create a custom object with the same structure as
    //above, but mapping the Gitlab-specific properties to those keys.
    if (dataGitlab[0]) {
      const resultGitlab = {
        id: dataGitlab[0].id,
        name: dataGitlab[0].name,
        login: dataGitlab[0].username,
        avatar: dataGitlab[0].avatar_url,
        url: dataGitlab[0].web_url,
        source: "Gitlab",
      };
      //Add the object to the array of search results
      resultsArray.push(resultGitlab);
    }
    //Respond to the client with the array of search results
    res.send(resultsArray);
    //Catch any errors that might have occurred during the fetch operations
  } catch (err) {
    next(err);
  }
});

//API endpoint to return a single user
router.get("/api/user", async (req, res, next) => {
  //Extract the data received from the request, and construct the urls
  //for the third party endpoints
  const user = req.query.user;
  const source = req.query.source;
  const urlGithub = `https://api.github.com/users/${user}`;
  const urlGitlab = `https://gitlab.com/api/v4/users?username=${user}`;

  try {
    //Depending on which source was given, either call Github or Gitlab API
    if (source === "Github") {
      //Make the API call with helper function
      const data = await getData(urlGithub);
      //If Github returns empty results, fail the request
      if (data.message === "Not Found") {
        res.status(500).send("User not found");
        //If Github does respond with user data, construct own object and map only
        //the properties that we need
      } else {
        const resultGithub = {
          id: data.id,
          name: data.name,
          login: data.login,
          avatar: data.avatar_url,
          url: data.url,
          source: "Github",
        };
        //Then respond to the client with this custom user object
        res.send(resultGithub);
      }

      //If the source was Gitlab, make the API call to Gitlab instead
    } else if (source === "Gitlab") {
      const data = await getData(urlGitlab);
      //If Gitlab returns an empty array, fail the request
      if (!data[0]) {
        res.status(500).send("User not found");
        //Otherwise, construct a custom object with the same keys as the Github
        //one, but mapping the unique Gitlab properties to the values.
      } else {
        const resultGitlab = {
          id: data[0].id,
          name: data[0].name,
          login: data[0].username,
          avatar: data[0].avatar_url,
          url: data[0].web_url,
          source: "Gitlab",
        };
        //Send the custom user object back to the client.
        res.send(resultGitlab);
      }
      //If the source is not defined properly, throw error
    } else {
      throw new Error("not one of the sources Github or Gitlab");
    }
    //Handle errors by passing them on to the last middleware
  } catch (err) {
    next(err);
  }
});

//API endpoint that returns a user's repositories
router.get("/api/repos", async (req, res, next) => {
  //Extract the data received from the request, and construct the urls
  //for the third party endpoints
  const user = req.query.user;
  const source = req.query.source;
  const urlGithub = `https://api.github.com/users/${user}/repos`;
  const urlGitlab = `https://gitlab.com/api/v4/users/${user}/projects`;
  try {
    //Depending on which source was given, either call Github or Gitlab API
    if (source === "Github") {
      //Make the API call with helper function
      const data = await getData(urlGithub);
      //If Github returns empty results, fail the request
      if (data.message === "Not Found") {
        res.status(500).send("Repositories not found");
      }
      //If Github does respond with user data, construct a new array of
      //custom objects, which map only the needed Github properties to the
      //keys
      else {
        const resultGithub = data.map((object) => {
          return {
            id: object.id,
            name: object.name,
            description: object.description,
            created_at: object.created_at,
            updated_at: object.updated_at,
          };
        });
        //To limit the results to the top 5, spice the array
        const top5ReposGithub = resultGithub.splice(0, 5);
        //Return the shortened array to the client
        res.send(top5ReposGithub);
      }

      //If the source was Gitlab, make the API call to Gitlab instead
    } else if (source === "Gitlab") {
      const data = await getData(urlGitlab);
      //If Gitlab returns an empty array, fail the request
      if (!data[0]) {
        res.status(500).send("User not found");
      }
      //If results were found, create a new array of custom objects with
      //the same structure as those of Github, but mapping the Gitlab-specific
      //properties to the keys instead
      else {
        const resultGitlab = data.map((object) => {
          return {
            id: object.id,
            name: object.name,
            description: object.description,
            created_at: object.created_at,
            updated_at: object.last_activity_at,
          };
        });
        //To limit the results to the top 5, spice the array
        const top5ReposGitlab = resultGitlab.splice(0, 5);
        //Return the shortened array to the client
        res.send(top5ReposGitlab);
      }
      //If the source is not defined properly, throw error
    } else {
      throw new Error("not one of the sources Github or Gitlab");
    }
    //Handle errors by passing them on to the last middleware
  } catch (err) {
    next(err);
  }
});

//API endpoint that returns a single repo
router.get("/api/repo", async (req, res, next) => {
  //Extract the data received from the request, and construct the urls
  //for the third party endpoints
  const source = req.query.source;
  const user = req.query.user;
  const repoName = req.query.reponame;
  const repoId = req.query.repoid;
  const urlGithub = `https://api.github.com/repos/${user}/${repoName}`;
  const urlGitlab = `https://gitlab.com/api/v4/projects/${repoId}`;
  try {
    //Depending on which source was given, either call Github or Gitlab API
    if (source === "Github") {
      //Make the API call with helper function
      const data = await getData(urlGithub);
      //If Github returns empty results, fail the request
      if (data.message === "Not Found") {
        res.status(500).send("Repository not found");
      }
      //If Github does respond with user data, construct a custom object
      //which maps only the needed Github properties to the keys.
      else {
        const result = {
          id: data.id,
          name: data.name,
          description: data.description,
          created_at: data.created_at,
          updated_at: data.updated_at,
          //These values are not from the API call, but are needed by the
          //React components to handle props and state, so we add it to the
          //user object here:
          owner: user,
          source: "Github",
        };
        //Return the repo object to the client
        res.send(result);
      }

      //If the source was Gitlab, make the API call to Gitlab instead
    } else if (source === "Gitlab") {
      const data = await getData(urlGitlab);
      //If Gitlab returns empty results, fail the request
      if (data.message === "404 Project Not Found") {
        res.status(500).send("Repository not found");
      }
      //If Gitlab does respond with user data, construct a custom object
      //which the same keys as the Github version, but which maps the
      //Gitlab-specific property names to the values.
      else {
        const result = {
          id: data.id,
          name: data.name,
          description: data.description,
          created_at: data.created_at,
          updated_at: data.last_activity_at,
          //These values are not from the API call, but are needed by the
          //React components to handle props and state, so we add it to the
          //user object here:
          owner: user,
          source: "Gitlab",
        };
        //Return the repo object to the client
        res.send(result);
      }
      //If the source is not defined properly, throw error
    } else {
      throw new Error("not one of the sources Github or Gitlab");
    }
    //Handle errors by passing them on to the last middleware
  } catch (err) {
    next(err);
  }
});

//API endpoint that returns a user's commits
router.get("/api/commits", async (req, res, next) => {
  //Extract the data received from the request, and construct the urls
  //for the third party endpoints
  const source = req.query.source;
  const user = req.query.user;
  const repoName = req.query.reponame;
  const repoId = req.query.repoid;
  const urlGithub = `https://api.github.com/repos/${user}/${repoName}/commits`;
  const urlGitlab = `https://gitlab.com/api/v4/projects/${repoId}/repository/commits`;
  try {
    //Depending on which source was given, either call Github or Gitlab API
    if (source === "Github") {
      //Make the API call with helper function
      const data = await getData(urlGithub);
      //If Github returns empty results, fail the request
      if (data.message === "Not Found") {
        res.status(500).send("Repositories not found");
      }
      //If Github does respond with user data, construct a new array of
      //custom objects, which map only the needed Github properties to the
      //keys
      else {
        const resultGithub = data.map((object) => {
          return {
            id: object.sha,
            message: object.commit.message,
            committed_date: object.commit.committer.date,
          };
        });
        //To limit the results to the top 5, spice the array

        const top5ResultsGithub = resultGithub.slice(0, 5);
        //Return the shortened array to the client

        res.send(top5ResultsGithub);
      }

      //If the source was Gitlab, make the API call to Gitlab instead
    } else if (source === "Gitlab") {
      const data = await getData(urlGitlab);
      //If Gitlab returns an invalid response, fail the request
      if (data.message === "404 Project Not Found") {
        res.status(500).send("Repository not found");
      }
      //If results were found, create a new array of custom objects with
      //the same structure as those of Github, but mapping the Gitlab-specific
      //properties to the keys instead
      else {
        const resultGitlab = data.map((object) => {
          return {
            id: object.id,
            message: object.message,
            committed_date: object.committed_date,
          };
        });
        //To limit the results to the top 5, spice the array

        const top5ResultsGitlab = resultGitlab.slice(0, 5);
        //Return the shortened array to the client

        res.send(top5ResultsGitlab);
      }
      //If the source is not defined properly, throw error
    } else {
      throw new Error("not one of the sources Github or Gitlab");
    }
    //Handle errors by passing them on to the last middleware
  } catch (err) {
    next(err);
  }
});

module.exports = router;
