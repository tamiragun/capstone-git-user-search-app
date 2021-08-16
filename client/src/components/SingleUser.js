import React from "react";
import { RepoList } from "./RepoList";

export function SingleUser(props) {
  const [repo, setRepo] = React.useState(null);

  const handleClick = (e) => {
    props.goBack();
  };

  return (
    <div className="single-user">
      <h3>Selected user</h3>
      <div className="TBC">
        <p>
          <strong>Name: </strong>
          {props.user.name}
          <br></br>
          <strong>Url: </strong>
          {props.user.url}
          <br></br>
        </p>
        <RepoList
          repos={props.user.repos}
          displayRepo={props.displayRepo}
        ></RepoList>
      </div>
      <div className="TBC">
        <button onClick={props.goBack}>Go back</button>
      </div>
    </div>
  );
}
