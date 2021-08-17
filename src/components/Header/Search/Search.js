import React, { Component } from "react";

import "./Search.css";

import SearchIcon from "react-icons/lib/md/search";

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *HEADER* COMPONENT

export default class Search extends Component {
  render(props) {
    return (
      <section className="Search__parent">
        <div className="Search__content">
          <input
            value={this.props.input}
            onChange={(e) => {
              this.props.handleChange(e.target.value);
            }}
            placeholder="Search Your Feed"
          />

          <SearchIcon
            id="Search__icon"
            onClick={() => {
              this.props.handleClick(this.props.input);
            }}
          />
        </div>
      </section>
    );
  }
}
