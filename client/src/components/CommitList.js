import React from "react";

export function CommitList(props) {
  const commits = props.commits;

  const commitsList = commits.map((commit) => {
    return (
      <li key={commit.id} className="bullet">
        <p>
          <strong>Description: </strong> {commit.message} <br></br>
          <strong>Date: </strong> {commit.committed_date} <br></br>
        </p>
      </li>
    );
  });

  return (
    <div>
      <h5>Last 5 commits:</h5>
      <ul className="commits-list">{commitsList}</ul>
    </div>
  );
}
