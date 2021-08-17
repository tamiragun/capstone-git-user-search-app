import React from "react";
import { RepoList } from "./RepoList";
const fetch = require("node-fetch");

export function SingleUser(props) {
  const [repos, setRepos] = React.useState(null);

  React.useEffect(async () => {
    const url = `http://localhost:3001/api/repos?source=${props.user.source}&user=${props.user.login}`;
    try {
      const response = await fetch(url);
      //console.log("Response: ", response, " Type: ", typeof response);
      const jsonResponse = await response.json();
      // console.log(
      //   "jsonResponse: ",
      //   jsonResponse,
      //   " Type: ",
      //   typeof jsonResponse
      // );
      setRepos(jsonResponse);
    } catch (err) {
      console.log(err);
    }
  }, [props.user.login]);

  const handleClick = (e) => {
    props.goBack();
  };

  return (
    <div className="single-user">
      <h3>Selected user</h3>
      <div className="TBC">
        <p>
          <strong>Name: </strong>
          {props.user.login}
          <br></br>
          <strong>Url: </strong>
          {props.user.url}
          <br></br>
        </p>
        {!repos ? (
          "Loading"
        ) : (
          <RepoList
            user={props.user.login}
            repos={repos}
            displayRepo={props.displayRepo}
          ></RepoList>
        )}
      </div>
      <div className="TBC">
        <button onClick={props.goBack}>Go back</button>
      </div>
    </div>
  );
}
