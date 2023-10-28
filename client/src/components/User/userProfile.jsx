import React, { Fragment, useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import Loader from "../layout/Loader/loader";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import "./userProfile.css";

const UserProfile = () => {
    const { user, status, isAuth } = useSelector((state) => state.auth);
    
  return (
    <Fragment>
      {status =='loading' ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${user.name}'s Profile`} />
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              <img src={user.avatar.url} alt={user.name} />
              <Link to="/account/update">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                {/* <p>{String(user.createdAt).substr(0, 10)}</p> */}
              </div>

              <div>
                <Link to="/orders">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UserProfile;
