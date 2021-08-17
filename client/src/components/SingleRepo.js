import React from "react";

export function SingleRepo(props) {
  const handleClick = (e) => {
    props.goBack();
  };

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
          <strong>Last updated: </strong>
          {props.repo.updated_at}
          <br></br>
        </p>
      </div>
      <div className="TBC">
        <button onClick={props.goBack}>Go back</button>
      </div>
    </div>
  );
}
