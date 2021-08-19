import React from "react";
import PropTypes from "prop-types";

//This component takes a prop in the form of an array of repo objects,
//and displays an ordered list of them. It also takes a prop with the
//displayRepo function of the parent (SingleUser --> App) for when the
//button is clicked, and a third props which is the user object, which
//is used as an argument in that displayRepo function.
export function RepoList(props) {
  //Extract the list of repos from the given props
  const repos = props.repos;

  //Event handler which is triggered when the button is clicked, and in
  //turn invokes the displayRepo function which was passed down as a prop.
  const handleClick = (e) => {
    //As arguments, pass the source and username from the user prop, and
    //the value of the button that was clicked
    props.displayRepo(props.user.source, props.user.login, e.target.value);
  };

  //For every repo in the array of repos that was passed in as a prop,
  //display the name and assign a unique key to each.
  const reposList = repos.map((repo) => {
    return (
      <li key={repo.id}>
        <div className="repo-bullet">
          <span>{repo.name}</span>
          <button
            //Assign two values to this, as both are needed by the server API
            //This results in a comma separated string which will be handled
            //by the function it is passed to
            value={[repo.name, repo.id]}
            onClick={handleClick}
            className="select-button view-repo-button"
          >
            View this repo
          </button>
        </div>
      </li>
    );
  });

  return <ol className="repo-list">{reposList}</ol>;
}

//The props are required, and should be an array of commit objects, an object,
//and a function.
RepoList.propTypes = {
  repos: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  displayRepo: PropTypes.func.isRequired,
};
