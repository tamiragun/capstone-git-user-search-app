import React from "react";
import { SearchBar } from "./components/SearchBar";
import { SearchResults } from "./components/SearchResults";
import { SingleUser } from "./components/SingleUser";
import { SingleRepo } from "./components/SingleRepo";
import "./App.css";

function App() {
  const [user, setUser] = React.useState(null);
  const [repo, setRepo] = React.useState(null);
  const [results, setResults] = React.useState([]);

  //Call the server to return search results
  const handleSearch = async (term) => {
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

  const displayUser = async (login) => {
    //console.log(login);
    const url = `http://localhost:3001/api/user?user=${login}`;
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

  const displayRepo = async (user, repo) => {
    const url = `http://localhost:3001/api/repo?user=${user}&repo=${repo}`;
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

  const goBack = () => {
    setUser(null);
    setRepo(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Search users across Github, Gitlab, and Gitbucket</h1>
      </header>
      <div>
        <SearchBar handleSearch={handleSearch}></SearchBar>
        <div className="main-body">
          <div classname="search-results-container">
            <SearchResults
              displayUser={displayUser}
              results={results}
            ></SearchResults>
          </div>
          <div className="single-cards">
            {user && (
              <SingleUser
                goBack={goBack}
                user={user}
                displayRepo={displayRepo}
              ></SingleUser>
            )}
            {repo && <SingleRepo goBack={goBack} repo={repo}></SingleRepo>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
