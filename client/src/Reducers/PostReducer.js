const PostsReducer = (state, action) => {
    switch (action.type) {
        case "POST_ADDED":
            return {
                ...state,
                addedPost: action.payload,
            };
        case "SET_PAGE_NO":
            return {
                ...state,
                pageNo: action.payload,
            };
        case "SET_MAX_PAGES":
            return {
                ...state,
                maxPages: action.payload,
            };
        case "SET_POSTS":
            return {
                ...state,
                posts: [...action.payload],
            };
        case "QUERY_POSTS":
            return {
                ...state,
                query: action.payload,
            };
        case "SET_QUERIED_POSTS":
            return {
                ...state,
                foundPosts: [...action.payload],
            };
        case "CLEAR_QUERIED_POSTS":
            return {
                ...state,
                foundPosts: [],
            };
        case "POST_UPDATE":
            return {
                ...state,
                updatedPostId: action.payload,
            };
        case "POST_DELETE":
            return {
                ...state,
                deletedPostId: action.payload,
            };
        default:
            return state;
    }
};

export default PostsReducer;
