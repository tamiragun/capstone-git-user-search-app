import React from "react";
import { CommitList } from "./CommitList";

export function SingleRepo(props) {
  // const handleClick = (e) => {
  //   props.goBack();
  // };
  const [commits, setCommits] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const url = `/api/commits?source=${props.repo.source}&user=${props.repo.owner}&reponame=${props.repo.name}&repoid=${props.repo.id}`;
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
        setCommits(jsonResponse);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [props.repo]);

  return (
    <div className="single-repo">
      <h2>{props.repo.name}</h2>
      <div className="TBC">
        <p>
          {props.repo.description}
          <br></br>
          <br></br>
          <strong>First created: </strong>
          {props.repo.created_at}
          <br></br>
          <strong>Last updated: </strong>
          {props.repo.updated_at}
          <br></br>
        </p>
        <h3>Latest 5 commits:</h3>
        {!commits ? (
          <div className="placeholder">Loading...</div>
        ) : commits.length === 0 ? (
          <div className="placeholder">No commits yet</div>
        ) : (
          <CommitList commits={commits}></CommitList>
        )}
      </div>
      <div className="TBC">
        <button onClick={props.backToUser} className="back-button">
          Go back to user profile
        </button>
      </div>
    </div>
  );
}
