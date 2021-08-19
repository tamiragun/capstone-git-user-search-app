import React from "react";
import { SingleUser } from "../components/SingleUser";
import renderer from "react-test-renderer";
import App from "../app.js";

test("SingleUser is shown", () => {
  const user = {
    id: 37237140,
    name: "Tamira",
    login: "tamiragun",
    avatar: "https://avatars.githubusercontent.com/u/37237140?v=4",
    url: "https://api.github.com/users/tamiragun",
    source: "Github",
  };
  const tree = renderer
    .create(
      <SingleUser
        user={user}
        backToSearch={function backToSearch() {}}
        displayRepo={function displayRepo() {}}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

// test("displayUser fetches data correctly", () => {
//   return App.displayUser("Github,tamiragun").then((data) => {
//     expect(data).toEqual([
//       {
//         id: 37237140,
//         name: "Tamira",
//         login: "tamiragun",
//         avatar: "https://avatars.githubusercontent.com/u/37237140?v=4",
//         url: "https://api.github.com/users/tamiragun",
//         source: "Github",
//       },
//     ]);
//   });
// });
