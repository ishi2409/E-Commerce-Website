import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css'
import './Header.css'
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { logout } from "../../../actions/userAction";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const Header = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const {isAuthenticated,user } = useSelector(
    (state) => state.user
  );
  const [click, setclick] = useState(true);
  const Clk = () => {
    if(window.innerWidth<=991)
       setclick(false);
  }
  const Clk1 = () => {
    if(window.innerWidth<=991)
      setclick(true);
  }
  const Routing = () => {
    if(user.role=='admin')
      return (
        <>
          <NavLink className="dropdown-item" to="/admin/dashboard" onClick={Clk}><DashboardIcon/>-Dashboard </NavLink>
        </>
      );
    else {
      return (
        <>

        </>
      );
    }
  }
  const Change = () => {
    dispatch(logout());
    alert.success("logout successfully")
    navigate('/');
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#"><span>E-Bay</span></a>
        <button onClick={Clk1} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={click ? "collapse navbar-collapse" : "none"} id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item active">
              <NavLink className="nav-link" to="/" onClick={Clk}>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/products" onClick={Clk}>Products</NavLink>
            </li>
            <li className="nav-item active">
              <NavLink className="nav-link" to="/contact" onClick={Clk}>Contact</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about" onClick={Clk}>About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/search" onClick={Clk}>Search</NavLink>
            </li>
            {isAuthenticated ?
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <img
                    className="speedDialIcon"
                    src={user.avatar.url ? user.avatar.url : "https://www.pngitem.com/pimgs/m/9-93862_my-account-account-vector-icon-png-transparent-png.png"}
                    alt="Profile"
                  />
                </a>
                <div className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                  <Routing/>
                  <NavLink className="dropdown-item" to="/account" onClick={Clk}><PersonIcon/> My Account</NavLink>
                  <NavLink className="dropdown-item" to="/cart" onClick={Clk}><ShoppingCartIcon/> Cart</NavLink>
                  <NavLink className="dropdown-item" to="/orders" onClick={Clk}><ListAltIcon/> Orders</NavLink>
                  <button className="dropdown-item" onClick={Change}> <ExitToAppIcon/> Logout</button>
                </div>
              </li>
              :
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">SignIn</NavLink>
              </li>
            }
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;