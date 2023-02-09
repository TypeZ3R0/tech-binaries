import React, { createContext, useReducer, useEffect } from "react";
import PostsReducer from "../Reducers/PostReducer.js";
import axios from "axios";
import baseURL from "../backend.js";

const INITIAL_STATE = {
    addedPost: null,
    pageNo: 0,
    maxPages: 1,
    posts: [],
    query: "",
    foundPosts: [],
    updatedPostId: "",
    deletedPostId: "",
};

export const PostsContext = createContext(INITIAL_STATE);

export const PostsProvider = (props) => {
    const [state, dispatch] = useReducer(PostsReducer, INITIAL_STATE);
    useEffect(() => {
        const getPosts = async () => {
            try {
                const { data } = await axios.get(`${baseURL}posts?page_no=${state.pageNo}`);
                dispatch({ type: "SET_POSTS", payload: data.postsArray });
                dispatch({ type: "SET_MAX_PAGES", payload: data.maxPages });
            } catch (err) {
                console.log(err);
            }
        };
        getPosts();
    }, [state.pageNo, state.addedPost, state.deletedPostId, state.updatedPostId]);
    const handleQueryInput = (searchPost) => {
        dispatch({ type: "QUERY_POSTS", payload: searchPost });
    };
    useEffect(() => {
        const getPostsOnQuery = async () => {
            try {
                const { data } = await axios.get(`${baseURL}search?q=${state.query}`);
                dispatch({ type: "SET_QUERIED_POSTS", payload: data });
            } catch (err) {
                console.log(err);
            }
        };
        state.query.length > 2 ? getPostsOnQuery() : dispatch({ type: "CLEAR_QUERIED_POSTS" });
    }, [state.query]);
    return (
        <PostsContext.Provider
            value={{
                posts: state.posts,
                dispatch,
                handleQueryInput,
                query: state.query,
                foundPosts: state.foundPosts,
                maxPages: state.maxPages,
            }}
        >
            {props.children}
        </PostsContext.Provider>
    );
};
