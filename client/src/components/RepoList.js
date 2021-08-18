import React from "react";

export function RepoList(props) {
  const repos = props.repos;
  const handleClick = (e) => {
    //console.log(props.user.source, props.user.login, e.target.value);
    props.displayRepo(props.user.source, props.user.login, e.target.value);
  };
  const reposList = repos.map((repo) => {
    return (
      <li key={repo.id}>
        <div className="repo-bullet">
          <span>{repo.name}</span>
          <button
            value={[repo.name, repo.id]}
            onClick={handleClick}
            className="select-button"
          >
            View this repo
          </button>
        </div>
      </li>
    );
  });

  return (
    <div>
      <ol className="repo-list">{reposList}</ol>
    </div>
  );
}
