import React from "react";
import { SearchBar } from "./components/SearchBar";
import { SearchResults } from "./components/SearchResults";
import { SingleUser } from "./components/SingleUser";
import { SingleRepo } from "./components/SingleRepo";
import "./App.css";

function App() {
  //Declare the various state hooks

  //User will determine whether a single user is displayed, and contain the
  //necessary user info
  const [user, setUser] = React.useState(null);
  //Repo will determine whether a single repo is displayed, and contain the
  //necessary repo info
  const [repo, setRepo] = React.useState(null);
  //Results will determine whether the results are displayed vs a loading
  //placeholder, and contain the necessary results info
  const [results, setResults] = React.useState(null);
  //ShowResults will determine whether the results (loading placeholder or list)
  //are displayed or not
  const [showResults, setShowResults] = React.useState(false);

  //When a search is triggered by the child component (SearchBar), call the
  //server to get the search results for that particular search term
  const handleSearch = async (term) => {
    //First, set the other states to null so that the previous cards disappear
    //from the screen.
    setUser(null);
    setRepo(null);
    setResults(null);
    //Allow the app to render the search results (which will first show 'loading'
    //until the data is received, then it will display the data)
    setShowResults(true);
    //Construct the server endpoint url using the argument passed into the function
    const url = `/api/search?term=${term}`;
    try {
      //Call the endpoint
      const response = await fetch(url);
      const jsonResponse = await response.json();
      //Update the state to contain the array of search results
      setResults(jsonResponse);
      //If the request is unsuccessful, print the error message to the console
    } catch (err) {
      console.log(err);
    }
  };

  //When the "Show this user" button is triggered by the child component (SearchResults), call the
  //server to get the user results for that particular user
  const displayUser = async (input) => {
    //First, set the other states to null so that the previous cards disappear
    //from the screen.
    setUser(null);
    setRepo(null);
    //The argument passed into the function is a string separated by a comma.
    //To access each element separately, split the string so it becomes an array
    //The first element should be the source and the second should be the username
    const inputArray = input.split(",");
    const source = inputArray[0];
    const login = inputArray[1];
    //Construct the server endpoint url
    const url = `/api/user?source=${source}&user=${login}`;
    try {
      //Call the endpoint
      const response = await fetch(url);
      const jsonResponse = await response.json();
      //Update the state to contain the returned user object
      setUser(jsonResponse);
      //If the request is unsuccessful, print the error message to the console
    } catch (err) {
      console.log(err);
    }
  };

  //When the "Show this repo" button is triggered by the child component (SingleUser), call the
  //server to get the repo results for that particular user
  const displayRepo = async (source, user, repo) => {
    //First, set the repo state to null so that the previous card disappears
    //from the screen.
    setRepo(null);
    //The argument passed into the function is a string separated by a comma.
    //To access each element separately, split the string so it becomes an array
    //The first element should be the name and the second should be the id
    const repoData = repo.split(",");
    const repoName = repoData[0];
    const repoId = repoData[1];
    //Construct the server endpoint url
    const url = `/api/repo?source=${source}&user=${user}&reponame=${repoName}&repoid=${repoId}`;
    try {
      //Call the endpoint
      const response = await fetch(url);
      const jsonResponse = await response.json();
      //Update the state to contain the returned repo object
      setRepo(jsonResponse);
      //If the request is unsuccessful, print the error message to the console
    } catch (err) {
      console.log(err);
    }
  };

  //When the "Go back to search results" button is clicked on the child component
  //(SingleUser), the user and repo status should be reset to null so that they
  //vanish from the screen and only the search results are shown
  const backToSearch = () => {
    setUser(null);
    setRepo(null);
  };

  //When the "Go back to user" button is clicked on the child component
  //(SingleRepo), the repo status should be reset to null so that it
  //vanishes from the screen and only the search results and user are shown
  const backToUser = () => {
    setRepo(null);
  };

  //When the "Search again" button is clicked on the child component
  //(SearchResults), the results, user and repo status should be reset to null
  //so that they vanish from the screen. the showResults state should be set to
  //false so that only the search bar is shown
  const backToHome = () => {
    setUser(null);
    setRepo(null);
    setResults(null);
    setShowResults(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Search users across Github and Gitlab</h1>
      </header>
      <div className="main-body">
        <SearchBar handleSearch={handleSearch}></SearchBar>
        {/*Search results are displayed if the state showSearch is set to true*/}
        {showResults && (
          <div className="search-results">
            <h2>Search results:</h2>
            {/*Search results show a placeholder if the results are still null*/}
            {!results ? (
              <div className="placeholder">Loading...</div>
            ) : /*Search results show a message if the results are empty*/
            results.length === 0 ? (
              <div className="placeholder">No results on Github or Gitlab.</div>
            ) : (
              /*Search results show the results once the data is in*/
              <SearchResults
                displayUser={displayUser}
                results={results}
              ></SearchResults>
            )}
            <button onClick={backToHome} className="back-button">
              Search again
            </button>
          </div>
        )}
        <div className="single-cards">
          {/*User card is displayed only if the state has a user object set*/}
          {user && (
            <SingleUser
              backToSearch={backToSearch}
              user={user}
              displayRepo={displayRepo}
            ></SingleUser>
          )}
          {/*Repo card is displayed only if the state has a repo object set*/}
          {repo && (
            <SingleRepo backToUser={backToUser} repo={repo}></SingleRepo>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
