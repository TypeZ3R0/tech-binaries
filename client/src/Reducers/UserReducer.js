const UserReducer = (state, action) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.payload,
            };
        case "LOGIN_USER":
            return {
                ...state,
                loggedInUserId: action.payload,
            };
        case "SET_RERENDER_STRING":
            return {
                ...state,
                rerender: action.payload,
            };
        case "REMOVE_USER":
            return {
                ...state,
                user: null,
            };
        case "SET_AUTHOR":
            return {
                ...state,
                author: action.payload,
            };
        case "REMOVE_AUTHOR":
            return {
                ...state,
                author: null,
            };
        default:
            return state;
    }
};

export default UserReducer;
