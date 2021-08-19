import React from "react";
import PropTypes from "prop-types";

//This component takes a prop in the form of an array of result objects,
//and displays an unordered list of them. It also takes a prop with the
//displayUser function of the parent (App) for when the button is clicked.
export function SearchResults(props) {
  //Extract the list of repos from the given props
  const results = props.results;

  //Event handler which is triggered when the button is clicked, and in
  //turn invokes the displayUser function which was passed down as a prop.
  const handleClick = (e) => {
    //As argument, pass the the value of the button that was clicked
    props.displayUser(e.target.value);
  };

  //For every search result in the array of search results that was passed in
  //as a prop, display the name, source, and assign a unique key to each.
  const resultsList = results.map((result) => {
    return (
      <li key={result.id} className="result-bullet">
        <p>
          <strong>Username: </strong>
          {result.login} <br></br>
          <strong>Source: </strong>
          {result.source} <br></br>
        </p>
        <button
          //Assign two values to this, as both are needed by the server API
          //This results in a comma separated string which will be handled
          //by the function it is passed to
          value={[result.source, result.login]}
          onClick={handleClick}
          className="select-button"
        >
          View this user
        </button>
      </li>
    );
  });

  return <ul className="results-list">{resultsList}</ul>;
}

//The props are required, and should be an array of commit objects, and object,
//and a function.
SearchResults.propTypes = {
  results: PropTypes.array.isRequired,
  displayUser: PropTypes.func.isRequired,
};
