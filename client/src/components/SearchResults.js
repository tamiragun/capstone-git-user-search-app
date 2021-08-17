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
          <strong>Name: </strong>
          {result.login} <br></br>
        </p>

        <button value={result.login} onClick={handleClick}>
          View this user
        </button>
      </li>
    );
  });

  return (
    <div className="search-results">
      <h3>Search results:</h3>
      <ul className="results-list">{resultsList}</ul>
    </div>
  );
}
