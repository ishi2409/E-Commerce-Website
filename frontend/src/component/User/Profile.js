import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
    const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login")
    }
  }, [navigate, isAuthenticated]);
    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title={`${user.name}'s Profile`} />
                    <h2 className="profileTitle">Profile</h2>
                    <div className="profileContainer">
                        <div className="profile_1">
                            <img src={user.avatar.url} alt={user.name} />
                            <Link to="/me/update">Edit Profile</Link>
                        </div>
                        <div className="userDetails">
                            <div>
                                <h5>Full Name</h5>
                                <p>{user.name}</p>
                            </div>
                            <div>
                                <h5>Email</h5>
                                <p>{user.email}</p> 
                            </div>
                            <div>
                                <h5>Joined On</h5>
                                <p>{String(user.createdAt).substr(0, 10)}</p>
                            </div>

                            <div className="profileButtonDetails">
                                <Link to="/orders" style={{textDecoration:'none'}} className="profileLink">My Orders</Link>
                                <Link to="/password/update" style={{textDecoration:'none',marginLeft:'2rem'}} className="profileLink">Change Password</Link>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
     
    );
};

export default Profile;