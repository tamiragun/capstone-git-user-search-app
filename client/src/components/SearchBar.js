import React from "react";

export class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchString: "" };

    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUserInput(e) {
    this.setState({ searchString: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.handleSearch(this.state.searchString);
    this.setState({ searchString: "" });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="TBC">
          <input
            type="text"
            value={this.state.searchString}
            onChange={this.handleUserInput}
            required
          ></input>
          <button type="submit">Search</button>
        </form>
      </div>
    );
  }
}
