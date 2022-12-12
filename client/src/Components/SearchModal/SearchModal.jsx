import React from "react";

import classes from "./SearchModal.module.css";
import search_icon_black from "../../images/search_icon_black.svg";
import close_icon_black from "../../images/close_icon_black.svg";

const SearchModal = (props) => {
    return (
        <div className={classes.searchModal}>
            <div className={classes.backdrop} onClick={props.closeClick} />
            <div className={classes.modal}>
                <button className={classes.closeButton} onClick={props.closeClick}><img src={close_icon_black} alt="Close" /></button>
                <form className={classes.searchControls}>
                    <img src={search_icon_black} className={classes.searchIcon} alt="Search" />
                    <input placeholder={"Search for blog posts..."} className={classes.searchBar} autoFocus />
                </form>
                <div className={classes.searchResults}>Start typing to view results instantly</div>
            </div>
        </div>
    );
};

export default SearchModal;
