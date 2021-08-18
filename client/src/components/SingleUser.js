import React from "react";
import { RepoList } from "./RepoList";
const fetch = require("node-fetch");

export function SingleUser(props) {
  const [repos, setRepos] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
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
    };
    fetchData();
  }, [props.user]);

  // const handleClick = (e) => {
  //   props.goBack();
  // };

  return (
    <div className="single-user">
      <h2>{props.user.login}</h2>
      <div className="TBC">
        <img src={props.user.avatar} alt="user avatar"></img>
        <br></br>
        <a href={props.user.url}>{props.user.url}</a>
        <h3>Latest 5 repositories:</h3>
        {!repos ? (
          <div className="placeholder">Loading...</div>
        ) : repos.length === 0 ? (
          <div className="placeholder">No repositories yet</div>
        ) : (
          <RepoList
            user={props.user}
            repos={repos}
            displayRepo={props.displayRepo}
          ></RepoList>
        )}
      </div>
      <div className="TBC">
        <button onClick={props.backToSearch} className="back-button">
          Go back to search results
        </button>
      </div>
    </div>
  );
}
