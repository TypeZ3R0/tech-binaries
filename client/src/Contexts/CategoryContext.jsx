import React, { createContext, useReducer } from "react";

const INITIAL_STATE = {
    categories: [],
};

export const CategoryContext = createContext(INITIAL_STATE);

export const CategoriesProvider = () => {
    return  <CategoryContext.Provider></CategoryContext.Provider>
}
