import React from "react";
import { SearchBar } from "../components/SearchBar";
import renderer from "react-test-renderer";

test("SearchBar is shown", () => {
  const tree = renderer.create(<SearchBar />).toJSON();
  expect(tree).toMatchSnapshot();
});
