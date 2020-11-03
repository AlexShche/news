import {CHANGE_PAGE_POSTS, FETCH_BY_CATEGORY_POSTS, FETCH_BY_COUNTRY_POSTS, FETCH_POSTS} from "../../types";

const initialState = {
    posts: [],
    activePage: 1
}

export const fetchPostsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_POSTS:
            return {
                ...state,
                posts: [...action.payload]
            }
        case CHANGE_PAGE_POSTS:
            return {
                ...state,
                posts: [...action.payload]
            }
        case FETCH_BY_COUNTRY_POSTS:
            return {
                ...state,
                posts: [...action.payload]
            }
        case FETCH_BY_CATEGORY_POSTS:
            return {
                ...state,
                posts: [...action.payload]
            }
        default:
            return {...state}
    }
}