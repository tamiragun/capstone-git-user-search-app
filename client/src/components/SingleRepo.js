import React from "react";
import { CommitList } from "./CommitList";
import PropTypes from "prop-types";
import { getData } from "../utils/getData.js";

//This component takes a prop in the form of a repo object, and displays
//its details. It also takes a prop with the backToUser function of the
//parent (App) for when the button is clicked
export function SingleRepo(props) {
  //commits will determine whether the commits are displayed vs a loading
  //placeholder, and contain the necessary top 5 commits info
  const [commits, setCommits] = React.useState(null);

  //As soon as the component is rendered, this function will run and fetch
  //the list of commits to display.
  React.useEffect(() => {
    //Nest an async function within useEffect, because useEffect is synchronous
    const fetchData = async () => {
      //Construct the server endpoint url using the props
      const url = `/api/commits?source=${props.repo.source}&user=${props.repo.owner}&reponame=${props.repo.name}&repoid=${props.repo.id}`;
      // Fetch the data
      const result = await getData(url);
      //Update the state to contain the array of commits
      setCommits(result);
    };
    //Call the async function to execute the fetch
    fetchData();
    //Run this effect every time the repo info changes
  }, [props.repo]);

  return (
    <div className="single-repo">
      <h2>{props.repo.name}</h2>
      <div className="TBC">
        <p>
          {props.repo.description}
          <br></br>
          <br></br>
          <strong>First created: </strong>
          {props.repo.created_at}
          <br></br>
          <strong>Last updated: </strong>
          {props.repo.updated_at}
          <br></br>
        </p>
        <h3>Latest 5 commits:</h3>
        {/*If the commits fetch is till pending, display a placeholder */}
        {!commits ? (
          <div className="placeholder">Loading...</div>
        ) : /*If the commits fetch yields zero results, display a message */
        commits.length === 0 ? (
          <div className="placeholder">No commits yet</div>
        ) : (
          /*If the commits fetch yields results, display the commits. Pass 
          on the list of commits from the state. */
          <CommitList commits={commits}></CommitList>
        )}
      </div>
      <div className="TBC">
        {/*No need for a separate event handler, this invokes the function 
          that was passed down as a prop */}
        <button onClick={props.backToUser} className="back-button">
          Go back to user profile
        </button>
      </div>
    </div>
  );
}

//The props are required, and should be a repo object and a function.
SingleRepo.propTypes = {
  repo: PropTypes.object.isRequired,
  backToUser: PropTypes.func.isRequired,
};
