// Third party imports
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Local imports
import classes from "./Navbar.module.css";
import search_icon from "../../images/search_icon.svg";
import SearchModal from "../../Components/SearchModal/SearchModal";
import RegisterModal from "../../Components/AuthenticationModal/RegisterModal";
import LoginModal from "../../Components/AuthenticationModal/LoginModal";
import { axiosJWT } from "../../services/axios.js";
import baseURL from "../../backend.js";
import { getCookie, removeCookie } from "../../services/cookie.js";

// The Navbar component
const Navbar = () => {
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [foundUser, setFoundUser] = useState();
    const [authorId, setAuthorId] = useState();

    useEffect(() => {
        const getAuthorId = async () => {
            const accessToken = getCookie("accessToken");
            try {
                const { data } = await axiosJWT.get(`${baseURL}users/authors/nav-author`, {
                    headers: { authorization: `Bearer ${accessToken}` },
                });
                setAuthorId(data.authorId);
            } catch (err) {
                console.log(err);
                if (err) {
                    setAuthorId();
                }
            }
        };
        getAuthorId();
        const getNavProfile = async () => {
            const accessToken = getCookie("accessToken");
            try {
                const { data } = await axiosJWT.get(`${baseURL}users/nav-profile`, {
                    headers: { authorization: `Bearer ${accessToken}` },
                });
                setFoundUser(data.userId);
            } catch (err) {
                console.log(err);
                if (err) {
                    console.log("Please login");
                }
            }
        };
        getNavProfile();
    }, [axiosJWT]);

    const handleLogout = async () => {
        const accessToken = getCookie("accessToken");
        const refreshToken = getCookie("refreshToken");
        try {
            const { data } = await axiosJWT.post(
                `${baseURL}users/logout`,
                { token: refreshToken },
                { headers: { authorization: `Bearer ${accessToken}` } }
            );
            if (data.successfullyLoggedOut) {
                removeCookie("accessToken");
                removeCookie("refreshToken");
                setFoundUser();
                window.location.reload();
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <nav className={classes.navbar}>
            {showSearchModal && (
                <SearchModal
                    closeClick={() => {
                        setShowSearchModal(false);
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
                    <h1 className={classes.title}>
                        TECH
                        <br />
                        BINARIES
                        <div style={{ width: "60%", height: "1px", backgroundColor: "#2c3531", marginTop: "0.5rem" }} />
                    </h1>
                </Link>

                {/* Nav links */}
                <ul className={classes.navlinks}>
                    <Link style={{ textDecoration: "none", color: "#2c3531" }} to={"category/gadgets-and-apps"}>
                        <li>Gadgets And Apps</li>
                    </Link>
                    <Link style={{ textDecoration: "none", color: "#2c3531" }} to={"category/gaming-and-entertainment"}>
                        <li>Gaming And Entertainment</li>
                    </Link>
                    <Link style={{ textDecoration: "none", color: "#2c3531" }} to={"category/mobile-phones"}>
                        <li>Mobile Phones</li>
                    </Link>
                    <Link style={{ textDecoration: "none", color: "#2c3531" }} to={"category/science-and-technology"}>
                        <li>Science And Technology</li>
                    </Link>
                    <Link style={{ textDecoration: "none", color: "#2c3531" }} to={"category/pcs-and-laptops"}>
                        <li>PCs And Laptops</li>
                    </Link>
                    <Link style={{ textDecoration: "none", color: "#2c3531" }} to={"more"}>
                        <li>More</li>
                    </Link>
                </ul>

                {/* Nav buttons */}
                {authorId ? (
                    <Link to={`users/authors/author-dashboard`} className={classes.dashboardButton}>
                        DASHBOARD
                    </Link>
                ) : null}
                <div className={classes.navbuttons}>
                    {foundUser ? (
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
                    {foundUser ? (
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
            </div>
        </nav>
    );
};

export default Navbar;
