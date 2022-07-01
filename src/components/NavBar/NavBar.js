import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Logo from "../Images/truly-logo.svg";
import "./Navbar.scss";

export default function NavBar() {
  const [click, setClick] = useState(true);

  const handleClick = () => setClick(!click);

  return (
    <div>
      <nav className="navbar">
        <img src={Logo} width="100px" alt="Truly" className="navbar__logo" />
        <div className={click ? "navbar__menu--active" : "navbar__menu"}>
          <a href="" className="navbar__menu--links">
            Redeem your gift certificate
          </a>
          <a href="" className="navbar__menu--links">
            Contact us
          </a>
        </div>
        <div className="navbar__hamburger" onClick={handleClick}>
          {click ? <FaTimes size={30} /> : <FaBars size={30} />}
        </div>
      </nav>
    </div>
  );
}
