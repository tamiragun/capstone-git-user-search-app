# Git user search

This was my capstone project for the Node Express and React portion of my coding bootcamp. It allows a user to retrieve a user from Github and/or Gitlab, and then view some basic profile info, including the latest 5 repositories. Clicking on that in turn shows some basic repository info along with the latest 5 commit messages.

## The brief

These were the detailed instructions for the capstone project:

- Create a full-stack web application that interfaces with the most popular VCS providers to facilitate a seamless browsing experience. Integrate with the GitHub and GitLab APIs (both free and open).
- Implement a user search box with results from both platforms.
- Display user details - including some of their repos, their profile picture, bio, etc.
- Display repo details - including last commit date, creation date, description, etc. Should also list the last 5 commits’ descriptions.
- Your code for interfacing with the third-party API’s should be handled by the backend of your application.
- The UI should be attractive, easy to use and intuitive. This means clicking on a user from the search results should go to your app’s user details page.
- You should include at least one snapshot test and appropriate unit tests for both the front-end and back-end of the application.
- Use Helmet to secure your app.
- The file structure of the project should be well organized and easy to understand and use. The code should also be easy to read adhering to Google’s style guide about indentation, meaningful variable and component names etc.
- Your code should be well documented with appropriate comments.
- You do not have to authenticate users at this stage.
- You do not have to create a database for this application.
- Your app need not do any caching of third party API responses.
- Do not integrate with any authenticated (private) third party API endpoints. Just focus on publicly accessible data.

## How to install this project

1. Clone the repository on Github into a directory of your choice.
2. If you don't already have Node and Npm installed, go ahead and do that first.
3. Navigate to the directory in your CLI and type `npm install` to get the node modules on your local computer.
4. Type `npm start` to get the server up and running.
5. In a new CLI, navigate to the "client" subfolder, and type `npm start` there to open the React App on your browser.
6. To run the test suites, type `npm test` in either the root dorectory (for server-side tests) or the 'client' folder (for client-side tests)

## How to contribute

By all means, feel free to request improvements or indeed make them yourself! To make a request, open a new issue on the repository. To make an improvement, submit a pull request.

## Credits

Huge thanks to [Martin](https://github.com/martink-rsa) for his code review and general advice.
