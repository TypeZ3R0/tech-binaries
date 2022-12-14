// Third party imports
import React, { useState } from "react";
import { Link } from "react-router-dom";

// Local imports
import classes from "./Navbar.module.css";
import search_icon from "../../images/search_icon.svg";
import SearchModal from "../../Components/SearchModal/SearchModal";
import RegisterModal from "../../Components/AuthenticationModal/RegisterModal";
import LoginModal from "../../Components/AuthenticationModal/LoginModal";

// The Navbar component
const Navbar = () => {
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);

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
                        setShowRegisterModal(true)
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
                </ul>

                {/* Nav buttons */}
                <div className={classes.navbuttons}>
                    <button
                        onClick={() => {
                            setShowLoginModal(true);
                        }}
                    >
                        LOGIN
                    </button>
                    <button
                        onClick={() => {
                            setShowSearchModal(true);
                        }}
                    >
                        <img src={search_icon} className={classes.searchIcon} alt="Search" />
                    </button>
                    <button
                        onClick={() => {
                            setShowRegisterModal(true);
                        }}
                    >
                        REGISTER
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
