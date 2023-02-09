import React, { useContext, useRef } from "react";

import classes from "./SearchModal.module.css";
import search_icon_black from "../../images/search_icon_black.svg";
import close_icon_black from "../../images/close_icon_black.svg";
import { PostsContext } from "../../Contexts/PostContext";
import SinglePost from "../SinglePost/SinglePost";
import { Link } from "react-router-dom";

const SearchModal = (props) => {
    const { handleQueryInput, foundPosts } = useContext(PostsContext);
    const searchInputRef = useRef();

    return (
        <div className={classes.searchModal}>
            <div className={classes.backdrop} onClick={props.closeClick} />
            <div className={classes.modal}>
                <button className={classes.closeButton} onClick={props.closeClick}>
                    <img src={close_icon_black} alt="Close" />
                </button>
                <form className={classes.searchControls}>
                    <img src={search_icon_black} className={classes.searchIcon} alt="Search" />
                    <input
                        placeholder={"Search for blog posts..."}
                        className={classes.searchBar}
                        autoFocus
                        onChange={(e) => {
                            e.preventDefault();
                            handleQueryInput(searchInputRef.current.value);
                        }}
                        required
                        ref={searchInputRef}
                    />
                </form>
                <div className={classes.searchResults}>
                    {foundPosts.length !== 0 ? (
                        foundPosts.map((singlePost) => {
                            return (
                                <Link
                                    style={{ textDecoration: "none", color: "black" }}
                                    to={`posts/${singlePost.id}`}
                                    key={singlePost.id}
                                >
                                    <SinglePost
                                        key={singlePost.id}
                                        date={singlePost.updatedAt}
                                        imgUrl={singlePost.image}
                                        title={singlePost.title}
                                        author={singlePost.author.authorName}
                                    />
                                </Link>
                            );
                        })
                    ) : (
                        <p>Start typing to view results instantly.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchModal;
