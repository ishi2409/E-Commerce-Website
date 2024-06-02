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
import HomeIcon from '@mui/icons-material/Home';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import Search from "../../Product/Search";

const Header = ({ isSearch }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [click, setclick] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [divHovered, divSetHovered] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const handleMouseEnter = () => {
    if(isOpen == false)
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleMouseEnterInDiv = () => {
    if (hovered == true) divSetHovered(true);
  };

  const handleMouseLeaveInDiv = () => {
    divSetHovered(false);
  };

  const Clk = () => {
    if (window.innerWidth <= 991) setclick(false);
  };
  const Clk1 = () => {
    if (window.innerWidth <= 991) setclick(true);
    setHovered(false);
    divSetHovered(false);
  };

  const Routing = () => {
    if (user.role == "admin")
      return (
        <>
          <NavLink
            className="dropdownItem"
            to="/admin/dashboard"
            onClick={Clk1}
          >
            <DashboardIcon className="dropDownImage" /> Dashboard
          </NavLink>
        </>
      );
    else {
      return <></>;
    }
  };
  const Change = () => {
    setHovered(false);
    divSetHovered(false);
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
        {!isSearch && <Search />}
        <div className="navbarSiderOption">
          <ul>
            {isAuthenticated ? (
              <>
                <li
                  class="navItem"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => setOpen((prev) => !prev)}
                >
                  <a class="navLink" href="#" id="navbarDropdown">
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
                  className={`dropdownMenu ${
                    hovered || divHovered 
                      ? user.role == "admin"
                        ? "showDropdownAdmin"
                        : "showDropdown"
                      : ""
                  } 
                  ${
                    isOpen
                      ? user.role == "admin"
                        ? "showDropdownAdminClick"
                        : "showDropdownClick"
                      : ""
                  }`}
                  onMouseEnter={handleMouseEnterInDiv}
                  onMouseLeave={handleMouseLeaveInDiv}
                >
                  <Routing />
                  <NavLink className="dropdownItem" to="/" onClick={Clk1}>
                    <HomeIcon className="dropDownImage" /> Home
                  </NavLink>
                  <NavLink className="dropdownItem" to="/products" onClick={Clk1}>
                    <LocalGroceryStoreIcon className="dropDownImage" /> Shop
                  </NavLink>
                  <NavLink
                    className="dropdownItem"
                    to="/account"
                    onClick={Clk1}
                  >
                    <PersonIcon className="dropDownImage" /> My Account
                  </NavLink>
                  <NavLink className="dropdownItem" to="/orders" onClick={Clk1}>
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
                        marginRight: "0.4vmax",
                      }}
                    />{" "}
                    Cart
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="navItem">
                  <NavLink className="navLink" to="/login">
                    SignIn
                  </NavLink>
                </li>
                <li>
                  <NavLink className="cartLogo" to="/login" onClick={Clk}>
                    <ShoppingCartIcon
                      style={{
                        marginRight: "0.4vmax",
                      }}
                    />{" "}
                    Cart
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
