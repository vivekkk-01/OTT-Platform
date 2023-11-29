import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation, Link } from "react-router-dom";

import "./header.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const searchQueryHandler = (event) => {
    setTimeout(() => {
      setShowSearch(false);
    }, 5000);
    if (query.length > 0 && event.key === "Enter") {
      navigate(`/search/${query}`);
    }
  };

  const navbarControl = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", navbarControl);
  }, [lastScrollY]);

  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };
  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <Link to="/" className="logo">
          <img src={logo} alt="" />
        </Link>
      </ContentWrapper>
      <ul className="menuItems">
        <Link
          style={{ textDecoration: "none" }}
          to={`/explore/movie`}
          className="menuItem"
        >
          Movies
        </Link>
        <Link
          style={{ textDecoration: "none" }}
          to={`/explore/tv`}
          className="menuItem"
        >
          TV Shows
        </Link>
        <li className="menuItem">
          <HiOutlineSearch onClick={() => setShowSearch(true)} />
        </li>
      </ul>

      <div className="mobileMenuItems">
        <HiOutlineSearch onClick={() => setShowSearch(true)} />
        {mobileMenu ? (
          <VscChromeClose onClick={() => setMobileMenu(false)} />
        ) : (
          <SlMenu onClick={openMobileMenu} />
        )}
      </div>

      {showSearch && (
        <div className="searchBar">
          <ContentWrapper>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for a movie or a TV show..."
                onKeyUp={searchQueryHandler}
                onChange={(event) => setQuery(event.target.value)}
              />
              <VscChromeClose onClick={() => setShowSearch(false)} />
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export default Header;
