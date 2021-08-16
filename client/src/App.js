import React from "react";
import { SearchBar } from "./components/SearchBar";
import { SearchResults } from "./components/SearchResults";
import { SingleUser } from "./components/SingleUser";
import { SingleRepo } from "./components/SingleRepo";
import "./App.css";

function App() {
  const [user, setUser] = React.useState(null);
  const [repo, setRepo] = React.useState(null);

  const handleSearch = (term) => {
    console.log(term);
  };

  const displayUser = (id) => {
    console.log(id);
    setUser({
      id: 1,
      name: "Tamira",
      repos: [
        { id: "rep1", repoName: "project1", commitMsg: "initial commit" },
        { id: "rep2", repoName: "project2", commitMsg: "initial commit" },
      ],
    });
  };

  const displayRepo = (id) => {
    console.log(id);
    setRepo({
      id: "rep1",
      repoName: "Tamira",
      commitMsg: "initial commit",
    });
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
              results={[
                { id: 1, name: "Tamira" },
                { id: 2, name: "Nono" },
                { id: 3, name: "Schmeef" },
              ]}
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
