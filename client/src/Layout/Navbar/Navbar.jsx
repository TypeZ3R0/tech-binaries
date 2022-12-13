// Third party imports
import React, { useState } from "react";
import { Link } from "react-router-dom";

// Local imports
import classes from "./Navbar.module.css";
import search_icon from "../../images/search_icon.svg";
import SearchModal from "../../Components/SearchModal/SearchModal";

// The Navbar component
const Navbar = () => {

    const [showModal, setShowModal] = useState(false);

    const handleSearchClick = () => {
        setShowModal(true);
    }

    const handleCloseSearchClick = () => {
        setShowModal(false);
    }

    return (
        <nav className={classes.navbar}>
            {showModal && <SearchModal closeClick={handleCloseSearchClick} />}
            <div className={classes.navItems}>
                {/* Main title */}
                <Link to={"/"} style={{ textDecoration: "none" }}>
                    <h1 className={classes.title}>
                        TECH
                        <br />
                        BINARIES
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
                    <button>LOGIN</button>
                    <button onClick={handleSearchClick}>
                        <img src={search_icon} className={classes.searchIcon} alt="Search" />
                    </button>
                    <button>REGISTER</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
