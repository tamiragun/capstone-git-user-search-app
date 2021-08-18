import React from "react";

export function SearchResults(props) {
  const results = props.results;
  const handleClick = (e) => {
    props.displayUser(e.target.value);
  };
  const resultsList = results.map((result) => {
    return (
      <li key={result.id} className="bullet">
        <p>
          <strong>Username: </strong>
          {result.login} <br></br>
          <strong>Source: </strong>
          {result.source} <br></br>
        </p>

        <button
          value={[result.source, result.login]}
          onClick={handleClick}
          className="select-button"
        >
          View this user
        </button>
      </li>
    );
  });

  return (
    <div>
      <ul className="results-list">{resultsList}</ul>
    </div>
  );
}
