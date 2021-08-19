import React from "react";
import { SearchResults } from "../components/SearchResults";
import renderer from "react-test-renderer";

test("SearchResults shows results when a search is complete", () => {
  let resultSet = [
    {
      id: 85945244,
      name: null,
      login: "jack",
      avatar: "https://avatars.githubusercontent.com/u/85945244?v=4",
      url: "https://api.github.com/users/jack",
      source: "Github",
    },
    {
      id: 796,
      name: "Jack Brown",
      login: "jack",
      avatar:
        "https://secure.gravatar.com/avatar/d1bd5ee624480b3a595660a4e84693c2?s=80&d=identicon",
      url: "https://gitlab.com/jack",
      source: "Gitlab",
    },
  ];
  const tree = renderer
    .create(
      <SearchResults
        results={resultSet}
        displayUser={function displayUser() {}}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
