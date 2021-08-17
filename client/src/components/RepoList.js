import React from "react";

export function RepoList(props) {
  const repos = props.repos;
  const handleClick = (e) => {
    props.displayRepo(props.user, e.target.value);
  };
  const reposList = repos.map((repo) => {
    return (
      <li key={repo.id} className="bullet">
        <p>
          <strong>Name: </strong> {repo.name} <br></br>
        </p>

        <button value={repo.name} onClick={handleClick}>
          View this repo
        </button>
      </li>
    );
  });

  return (
    <div>
      <h5>Repos:</h5>
      <ul className="repo-list">{reposList}</ul>
    </div>
  );
}
