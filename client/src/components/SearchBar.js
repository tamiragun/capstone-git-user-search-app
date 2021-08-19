import React from "react";
import PropTypes from "prop-types";

//This component takes a prop in the form of a search function, and displays
//a form. When input is entered, this component updates its own state and when
//the form is submitted, is passes the info to the search function of the
//parent (App).
export class SearchBar extends React.Component {
  //Set the state to have the search term as an empty string
  constructor(props) {
    super(props);
    this.state = { searchString: "" };

    //Bind the two functions defined below
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //Each time something is typed in the input field, update the
  //state to reflect the latest value.
  handleUserInput(e) {
    this.setState({ searchString: e.target.value });
  }

  //Once the form is submitted, execute the search
  handleSubmit(e) {
    //Prevent the browser from refreshing
    e.preventDefault();
    //Call the function passed as a prop by the parent (App)
    //And pass it the latest state of the searchString.
    this.props.handleSearch(this.state.searchString);
    //Clear the input field by setting the state back to an empty string
    this.setState({ searchString: "" });
  }

  render() {
    return (
      <div>
        {/*Upon form submit, call the handler function defined above */}
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            //Set the value to whatever the current state is, to control this input field
            value={this.state.searchString}
            //Every time its content changes, call the change handler to update the state
            onChange={this.handleUserInput}
            className="search-input"
            required
          ></input>
          <button type="submit" className="select-button">
            Search
          </button>
        </form>
      </div>
    );
  }
}

//The prop is required, and should be a function.
SearchBar.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};
