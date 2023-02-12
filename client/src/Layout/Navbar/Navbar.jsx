// Third party imports
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Local imports
import classes from "./Navbar.module.css";
import search_icon from "../../images/search_icon.svg";
import ham_menu_mobile from "../../images/ham_menu_mobile.svg";
import SearchModal from "../../Components/SearchModal/SearchModal";
import RegisterModal from "../../Components/AuthenticationModal/RegisterModal";
import LoginModal from "../../Components/AuthenticationModal/LoginModal";
import { axiosJWT } from "../../services/axios.js";
import baseURL from "../../backend.js";
import { UserContext } from "../../Contexts/UserContext";
import { PostsContext } from "../../Contexts/PostContext";

// The Navbar component
const Navbar = () => {
    const navigate = useNavigate();

    const [showSearchModal, setShowSearchModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);

    const { user, dispatch } = useContext(UserContext);
    const { dispatch: foundPostDispatch } = useContext(PostsContext);

    const handleLogout = async () => {
        try {
            const { data } = await axiosJWT.get(`${baseURL}users/logout`);
            console.log(data);
            if (data.logoutSuccess) {
                dispatch({ type: "REMOVE_USER" });
                dispatch({ type: "REMOVE_AUTHOR" });
                dispatch({ type: "SET_RERENDER_STRING", payload: data.userId });
                navigate("/", { replace: true });
            }
        } catch (err) {
            dispatch({ type: "DELETE_USER" });
            console.log(err);
        }
    };

    return (
        <nav className={classes.navbar}>
            {showSearchModal && (
                <SearchModal
                    closeClick={() => {
                        setShowSearchModal(false);
                        foundPostDispatch({ type: "CLEAR_QUERIED_POSTS" });
                    }}
                />
            )}
            {showRegisterModal && (
                <RegisterModal
                    closeClick={() => {
                        setShowRegisterModal(false);
                    }}
                    openLogin={() => {
                        setShowLoginModal(true);
                        setShowRegisterModal(false);
                    }}
                />
            )}
            {showLoginModal && (
                <LoginModal
                    closeClick={() => {
                        setShowLoginModal(false);
                    }}
                    openRegister={() => {
                        setShowRegisterModal(true);
                        setShowLoginModal(false);
                    }}
                />
            )}
            <div className={classes.navItems}>
                {/* Main title */}
                <Link to={"/"} style={{ textDecoration: "none" }}>
                    <h1 className={classes.titleTabletAndPc}>
                        TECH
                        <br />
                        BINARIES
                        <div style={{ width: "60%", height: "1px", backgroundColor: "#2c3531", marginTop: "0.5rem" }} />
                    </h1>
                    <h1 className={classes.titleMobile}>TECH BINARIES</h1>
                </Link>

                {/* Nav links */}
                <ul className={classes.navlinks}>
                    <Link style={{ textDecoration: "none", color: "#2c3531" }} to={"/category"}>
                        <li>Categories</li>
                    </Link>
                    <Link style={{ textDecoration: "none", color: "#2c3531" }} to={"more"}>
                        <li>More</li>
                    </Link>
                </ul>

                {/* Nav buttons */}
                {user && user.isAuthor && (
                    <Link to={"/users/authors/author-dashboard"} className={classes.dashboardBtn}>
                        DASHBOARD
                    </Link>
                )}
                <div className={classes.navbuttons}>
                    {user ? (
                        <button onClick={handleLogout}>LOGOUT</button>
                    ) : (
                        <button
                            onClick={() => {
                                setShowLoginModal(true);
                            }}
                        >
                            LOGIN
                        </button>
                    )}
                    <button
                        onClick={() => {
                            setShowSearchModal(true);
                        }}
                    >
                        <img src={search_icon} className={classes.searchIcon} alt="Search" />
                    </button>
                    {user ? (
                        <Link to={"users/profile"} className={classes.profileButton}>
                            PROFILE
                        </Link>
                    ) : (
                        <button
                            onClick={() => {
                                setShowRegisterModal(true);
                            }}
                        >
                            REGISTER
                        </button>
                    )}
                </div>
                <button className={classes.hamMenuMobile}>
                    <img src={ham_menu_mobile} alt="ham_menu_mobile" />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
