import React from "react";

export function CommitList(props) {
  const commits = props.commits;

  const commitsList = commits.map((commit) => {
    return (
      <li key={commit.id} className="commit-bullet">
        {commit.message} <br></br>({commit.committed_date})
      </li>
    );
  });

  return (
    <div>
      <ol className="commits-list">{commitsList}</ol>
    </div>
  );
}
