import React from "react";
import PropTypes from "prop-types";

//This component takes a prop in the form of an array of commit objects,
//and displays an ordered list of them.
export function CommitList(props) {
  //Extract the list of commits from the given props
  const commits = props.commits;

  //For every commit in the array of commits that was passed in as a prop,
  //display the message and the date. Also assign a unique key to each.
  const commitsList = commits.map((commit) => {
    return (
      <li key={commit.id} className="commit-bullet">
        {commit.message} <br></br>({commit.committed_date})
      </li>
    );
  });

  return <ol className="commits-list">{commitsList}</ol>;
}

//The prop is required, and should be an array of commit objects.
CommitList.propTypes = {
  commits: PropTypes.array.isRequired,
};
