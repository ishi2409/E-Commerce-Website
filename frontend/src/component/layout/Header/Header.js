import React, { useState } from "react";
// import 'bootstrap/dist/css/bootstrap.css'
import "./Header.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { logout } from "../../../actions/userAction";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Search from "../../Product/Search";
 
const Header = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [click, setclick] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [divHovered, divSetHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleMouseEnterInDiv = () => {
    if(hovered==true)
    divSetHovered(true);
  };

  const handleMouseLeaveInDiv = () => {
    divSetHovered(false);
  };

  const Clk = () => {
    if (window.innerWidth <= 991) setclick(false);
  };
  const Clk1 = () => {
    if (window.innerWidth <= 991) setclick(true);
  };
  const Routing = () => {
    if (user.role == "admin")
      return (
        <>
          <NavLink
            className="dropdownItem"
            to="/admin/dashboard"
            onClick={Clk}
          >
            <DashboardIcon />
            -Dashboard{" "}
          </NavLink>
        </>
      );
    else {
      return <></>;
    }
  };
  const Change = () => {
    dispatch(logout());
    alert.success("logout successfully");
    navigate("/");
  };

  return (
    <>
      <nav className="navbarDiv">
        <div className="headerLogo">
          <img src="https://i.pinimg.com/originals/66/f7/72/66f77296282b5ab7c2780724802614c0.png" />
          <a className="navbarTitle" href="#">
            COLO<span>SHOP</span>
          </a>
        </div>
        {/* <button
          onClick={Clk1}
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button> */}
        {/* <div
          className="searchbar"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item active">
              <NavLink className="nav-link" to="/" onClick={Clk}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/products" onClick={Clk}>
                Products
              </NavLink>
            </li>
            <li className="nav-item active">
              <NavLink className="nav-link" to="/contact" onClick={Clk}>
                Contact
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about" onClick={Clk}>
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/search" onClick={Clk}>
                Search
              </NavLink>
            </li>
            {isAuthenticated ? (
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <img
                    className="speedDialIcon"
                    src={
                      user.avatar.url
                        ? user.avatar.url
                        : "https://www.pngitem.com/pimgs/m/9-93862_my-account-account-vector-icon-png-transparent-png.png"
                    }
                    alt="Profile"
                  />
                </a>
                <div
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navbarDropdown"
                >
                  <Routing />
                  <NavLink
                    className="dropdown-item"
                    to="/account"
                    onClick={Clk}
                  >
                    <PersonIcon /> My Account
                  </NavLink>
                  <NavLink className="dropdown-item" to="/cart" onClick={Clk}>
                    <ShoppingCartIcon /> Cart
                  </NavLink>
                  <NavLink className="dropdown-item" to="/orders" onClick={Clk}>
                    <ListAltIcon /> Orders
                  </NavLink>
                  <button className="dropdown-item" onClick={Change}>
                    {" "}
                    <ExitToAppIcon /> Logout
                  </button>
                </div>
              </li>
            ) : (
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  SignIn
                </NavLink>
              </li>
            )}
          </ul>
        </div> */}
        <Search />
        <div className="navbarSiderOption">
          <ul>
            {isAuthenticated ? (
              <>
                <li
                  class="navItem"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <a
                    class="navLink"
                    href="#"
                    id="navbarDropdown"
                  >
                    <img
                      className="speedDialIcon"
                      src={
                        user.avatar.url
                          ? user.avatar.url
                          : "https://www.pngitem.com/pimgs/m/9-93862_my-account-account-vector-icon-png-transparent-png.png"
                      }
                      alt="Profile"
                    />
                  </a>
                </li>
                <div
                  className={`dropdownMenu ${(hovered || divHovered) ? "showDropdown" : ""}`}
                  onMouseEnter={handleMouseEnterInDiv}
                  onMouseLeave={handleMouseLeaveInDiv}
                >
                  {/* <Routing /> */}
                  <NavLink
                    className="dropdownItem"
                    to="/account"
                    onClick={Clk}
                  >
                    <PersonIcon className="dropDownImage" /> My Account
                  </NavLink>
                  <NavLink className="dropdownItem" to="/orders" onClick={Clk}>
                    <ListAltIcon className="dropDownImage" /> Orders
                  </NavLink>
                  <button className="dropdownItem" onClick={Change}>
                    <ExitToAppIcon className="dropDownImage" /> Logout
                  </button>
                </div>

                <li>
                  <NavLink className="cartLogo" to="/cart" onClick={Clk}>
                    <ShoppingCartIcon
                      style={{
                        marginRight: "0.4rem",
                        height: "1.7rem",
                        width: "auto",
                      }}
                    />{" "}
                    Cart
                  </NavLink>
                </li>
              </>
            ) : (
              <li className="navItem">
                <NavLink className="navLink" to="/login">
                  SignIn
                </NavLink>
              </li> 
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
