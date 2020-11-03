import {combineReducers} from "redux";
import {fetchPostsReducer} from "../fetchPosts/fetchPostsReducer";

export const rootReducer = combineReducers({
    posts: fetchPostsReducer
})