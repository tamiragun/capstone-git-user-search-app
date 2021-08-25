import React from "react";
import { RepoList } from "./RepoList";
import PropTypes from "prop-types";
import { getData } from "../utils/getData.js";

//This component takes a prop in the form of a user object, and displays
//its details. It also takes a prop with the backToSearch and DisplayRepo
//functions of the parent (App) for when the buttons are clicked
export function SingleUser(props) {
  //repos will determine whether the repos are displayed vs a loading
  //placeholder, and contain the necessary top 5 repos info
  const [repos, setRepos] = React.useState(null);

  //As soon as the component is rendered, this function will run and fetch
  //the list of repos to display.
  React.useEffect(() => {
    //Nest an async function within useEffect, because useEffect is synchronous
    const fetchData = async () => {
      //Construct the server endpoint url using the props
      const url = `/api/repos?source=${props.user.source}&user=${props.user.login}`;
      // Fetch the data
      const result = await getData(url);
      //Update the state to contain the array of repos
      setRepos(result);
    };
    //Call the async function to execute the fetch
    fetchData();
    //Run this effect every time the user info changes
  }, [props.user]);

  return (
    <div className="single-user">
      <h2>{props.user.login}</h2>
      <div className="user-details">
        <img src={props.user.avatar} alt="user avatar" className="avatar"></img>
        <p>
          <a href={props.user.url}>{props.user.url}</a>
        </p>
        <h3>Latest 5 repositories:</h3>
        {/*If the repos fetch is till pending, display a placeholder */}
        {!repos ? (
          <div className="placeholder">Loading...</div>
        ) : /*If the commits fetch yields zero results, display a message */
        repos.length === 0 ? (
          <div className="placeholder">No repositories yet</div>
        ) : (
          /*If the commits fetch yields results, display the commits.
          Pass the array of repos from the state, but also pass on 2 of the
          props (user and DisplayRepo) received from the parent (App) */
          <RepoList
            user={props.user}
            repos={repos}
            displayRepo={props.displayRepo}
          ></RepoList>
        )}
      </div>
      <div className="TBC">
        {/*No need for a separate event handler, this invokes the function 
          that was passed down as a prop */}
        <button
          onClick={props.backToSearch}
          className="back-button back-to-search-button"
        >
          Go back to search results
        </button>
      </div>
    </div>
  );
}

//The props are required, and should be a repo object and two functions.
SingleUser.propTypes = {
  user: PropTypes.object.isRequired,
  backToSearch: PropTypes.func.isRequired,
  displayRepo: PropTypes.func.isRequired,
};
