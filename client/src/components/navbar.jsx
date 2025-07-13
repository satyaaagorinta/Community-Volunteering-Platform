//  import { IconButton } from "@mui/material";
import { IoSearchOutline } from "react-icons/io5";
//  import { Search, Person, Menu } from "@mui/icons-material";
import {  Search,Person, Menu } from "@mui/icons-material";
 import variables from "../styles/variables.scss";
 import { useState } from "react";
 import { useSelector, useDispatch } from "react-redux";
 import "../styles/Navbar.scss";
 import { Link, useNavigate } from "react-router-dom";
 
 import { setLogout } from "../redux/state";

import React from "react";
const Navbar = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);

  const user = useSelector((state) => state.user);

   const dispatch = useDispatch();

  const [search, setSearch] = useState("")

   const navigate = useNavigate()

return (
    <div className="navbar">
      <a href="/" className="logo">
        <img src="/assets/logo1.png" alt="logo" />
      </a>

      <div className="navbar_search">
        <input 
        className="SearchBg"
          type="text"
          placeholder="Search ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <IoSearchOutline disabled={search === ""}>
          <Search
            sx={{ color: variables.darkgrey }}
            onClick={() => {navigate(`/properties/search/${search}`)}}
          />
        </IoSearchOutline>
      </div>

      <div className="navbar_right">
        {user ? (
          <a href="/CreateEvent" className="host">
            Create an Event/Organization Profile
          </a>
        ) : (
          <a href="/login" className="host">
            Create an Event/Organization Profile
          </a>
        )}

        <button
          className="navbar_right_account"
          onClick={() => setDropdownMenu(!dropdownMenu)}
        >
          <Menu sx={{ color: variables.darkgrey }} />
          {!user ? (
            <Person sx={{ color: variables.darkgrey }} />
          ) : (
            <img
              src={`http://localhost:3001/${user.profileImagePath.replace(
                "public",
                ""
              )}`}
              alt="img"
              style={{ objectFit: "cover", borderRadius: "50%" }}
            />
          )}
        </button>

        {dropdownMenu && !user && (
          <div className="navbar_right_accountmenu">
            <Link to="/login">Log In</Link>
            <Link to="/register">Sign Up</Link>
          </div>
        )}

        {dropdownMenu && user && (
          <div className="navbar_right_accountmenu">
            <Link to="http://localhost:3000/67f6f99b5420e49d42b8fb94/67f75a1a1253998e2f6fee5e">Sent Requests</Link>
            {/* <Link to="`/${user._id}/wishList`">Wish List</Link> */}
            <Link to="`/WishList`">Wish List</Link>
            <Link to="`/PropertyList`">Your Events/Organization Profile</Link>
            <Link to="`/${user._id}/reservations`">Received Requests</Link>
            <Link to="/CreateEvent">Create an Event/Organization Profile</Link>

            <Link
              to="/login"
              onClick={() => {
                dispatch(setLogout());
              }}
            >
              Log Out
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;