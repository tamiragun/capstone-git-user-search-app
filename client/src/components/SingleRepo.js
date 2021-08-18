import React from "react";
import { CommitList } from "./CommitList";

export function SingleRepo(props) {
  // const handleClick = (e) => {
  //   props.goBack();
  // };
  const [commits, setCommits] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const url = `http://localhost:3001/api/commits?source=${props.repo.source}&user=${props.repo.owner}&reponame=${props.repo.name}&repoid=${props.repo.id}`;
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
      <h3>Selected repo</h3>
      <div className="TBC">
        <p>
          <strong>Name: </strong>
          {props.repo.name}
          <br></br>
          <strong>Description: </strong>
          {props.repo.description}
          <br></br>
          <strong>First created: </strong>
          {props.repo.created_at}
          <br></br>
          <strong>Last updated: </strong>
          {props.repo.updated_at}
          <br></br>
        </p>
        {!commits ? "Loading" : <CommitList commits={commits}></CommitList>}
      </div>
      <div className="TBC">
        <button onClick={props.goBack}>Go back</button>
      </div>
    </div>
  );
}
