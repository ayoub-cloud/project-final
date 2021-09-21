import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { UidContext } from "../components/AppContext";

// home | trending | profile | dashboard only for admin

const LeftNav = () => {
    const uid = useContext(UidContext);
    const userData = useSelector((state) => state.userReducer);
    return (
        <div className="left-nav-container">
            <div className="icons">
                <div className="icons-bis">
                    <NavLink to="/" exact activeClassName="active-left-nav">
                        <img src="./img/icons/home.svg" alt="home" />
                    </NavLink>
                    <br />
                    <NavLink
                        to="/trending"
                        exact
                        activeClassName="active-left-nav"
                    >
                        <img src="./img/icons/rocket.svg" alt="home" />
                    </NavLink>
                    <br />
                    <NavLink
                        to="/profil"
                        exact
                        activeClassName="active-left-nav"
                    >
                        <img src="./img/icons/user.svg" alt="home" />
                    </NavLink>
                    {uid && userData && userData.role === "on" && (
                        <NavLink
                            to="/admin"
                            exact
                            activeClassName="active-left-nav"
                        >
                            <img src="./img/icons/admin.png" alt="home" />
                        </NavLink>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LeftNav;
