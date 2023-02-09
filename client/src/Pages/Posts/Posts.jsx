import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

import classes from "../../assets/pagination.module.css";
import { PostsContext } from "../../Contexts/PostContext";
import SinglePost from "../../Components/SinglePost/SinglePost";

const Posts = () => {
    const { posts, maxPages, dispatch } = useContext(PostsContext);
    const handlePageClick = (e) => {
        const clickedPageNo = e.selected;
        dispatch({ type: "SET_PAGE_NO", payload: clickedPageNo });
    };

    return (
        <div>
            <h1>ALL POSTS</h1>
            <br />
            {posts ? (
                posts.map((singlePost) => {
                    return (
                        <Link
                            style={{ textDecoration: "none", color: "black" }}
                            to={`${singlePost.id}`}
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
                <p>No posts to show.</p>
            )}
            <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={2}
                pageCount={maxPages}
                previousLabel="<"
                renderOnZeroPageCount={null}
                containerClassName={classes.pagination}
                pageClassName={classes.pageItem}
                pageLinkClassName={classes.pageLink}
                previousClassName={classes.pageNavBtn}
                nextClassName={classes.pageNavBtn}
                previousLinkClassName={classes.pageLink}
                nextLinkClassName={classes.pageLink}
                activeClassName={classes.activePage}
                activeLinkClassName={classes.activeLink}
            />
        </div>
    );
};

export default Posts;
