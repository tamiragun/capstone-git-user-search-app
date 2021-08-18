import React from "react";
import { SearchBar } from "./components/SearchBar";
import { SearchResults } from "./components/SearchResults";
import { SingleUser } from "./components/SingleUser";
import { SingleRepo } from "./components/SingleRepo";
import "./App.css";

function App() {
  const [user, setUser] = React.useState(null);
  const [repo, setRepo] = React.useState(null);
  const [results, setResults] = React.useState(null);
  const [showResults, setShowResults] = React.useState(false);

  //Call the server to return search results
  const handleSearch = async (term) => {
    setUser(null);
    setRepo(null);
    setResults(null);
    setShowResults(true);
    const url = `http://localhost:3001/api/search?term=${term}`;
    try {
      const response = await fetch(url);
      //console.log("Response: ", response, " Type: ", typeof response);
      const jsonResponse = await response.json();
      //console.log("jsonResponse: ", jsonResponse, " Type: ", typeof jsonResponse);
      setResults(jsonResponse);
      //console.log("Results: ", results, " Type: ", typeof results);
    } catch (err) {
      console.log(err);
    }
  };

  const displayUser = async (input) => {
    setUser(null);
    setRepo(null);
    //console.log(input);
    const inputArray = input.split(",");
    //console.log(inputArray);
    const source = inputArray[0];
    //console.log(source);
    const login = inputArray[1];
    //console.log(login);
    const url = `http://localhost:3001/api/user?source=${source}&user=${login}`;
    try {
      const response = await fetch(url);
      //console.log("Response: ", response, " Type: ", typeof response);
      const jsonResponse = await response.json();
      // console.log(
      //   "jsonResponse: ",
      //   jsonResponse,
      //   " Type: ",
      //   typeof jsonResponse
      // );
      setUser(jsonResponse);
    } catch (err) {
      console.log(err);
    }
  };

  const displayRepo = async (source, user, repo) => {
    setRepo(null);
    const repoData = repo.split(",");
    //console.log(repoData);
    const repoName = repoData[0];
    //console.log(repoName);
    const repoId = repoData[1];
    //console.log(repoId);
    const url = `http://localhost:3001/api/repo?source=${source}&user=${user}&reponame=${repoName}&repoid=${repoId}`;
    try {
      const response = await fetch(url);
      //console.log("Response: ", response, " Type: ", typeof response);
      const jsonResponse = await response.json();
      // console.log(
      //   "jsonResponse: ",
      //   jsonResponse,
      //   " Type: ",
      //   typeof jsonResponse
      // );
      setRepo(jsonResponse);
    } catch (err) {
      console.log(err);
    }
  };

  const backToSearch = () => {
    setUser(null);
    setRepo(null);
  };

  const backToUser = () => {
    setRepo(null);
  };

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
        {showResults && (
          <div className="search-results">
            <h2>Search results:</h2>
            {!results ? (
              <div className="placeholder">Loading...</div>
            ) : results.length === 0 ? (
              <div className="placeholder">No results on Github or Gitlab.</div>
            ) : (
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
          {user && (
            <SingleUser
              backToSearch={backToSearch}
              user={user}
              displayRepo={displayRepo}
            ></SingleUser>
          )}
          {repo && (
            <SingleRepo backToUser={backToUser} repo={repo}></SingleRepo>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
