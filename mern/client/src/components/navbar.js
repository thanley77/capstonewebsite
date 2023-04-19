import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const history = useHistory();

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // navigate to the search results page with the search query as a parameter
    history.push(`/search?q=${searchQuery}`);
  };

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        {/* Navbar brand/logo */}
        <NavLink className="navbar-brand" to="/">
          <img style={{"width" : 25 + '%'}} src="https://d3cy9zhslanhfa.cloudfront.net/media/3800C044-6298-4575-A05D5C6B7623EE37/4B45D0EC-3482-4759-82DA37D8EA07D229/webimage-8A27671A-8A53-45DC-89D7BF8537F15A0D.png" alt="MongoDB logo of green leaf and word MongoDB"></img>
        </NavLink>

        {/* Navbar toggle button */}
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar links */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/list">
                Create Record
              </NavLink>
            </li>
            {/* Additional links */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/record/pentest_hyatt">
                records in hyatt
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/record/pentest_ninjakiwi">
                records in ninjakiwi
              </NavLink>
            </li>
            {/* Add more links as needed */}

            {/* Search bar */}
            <li className="nav-item">
              <form className="form-inline my-2 my-lg-0" onSubmit={handleSearchSubmit}>
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={searchQuery}
                  onChange={handleSearchQueryChange}
                />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
                  Search
                </button>
              </form>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
