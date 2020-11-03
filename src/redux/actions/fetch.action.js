import axios from 'axios'
import {CHANGE_PAGE_POSTS, FETCH_BY_CATEGORY_POSTS, FETCH_BY_COUNTRY_POSTS, FETCH_POSTS} from "../types";

export function posts(posts) {
    return {
        type: FETCH_POSTS,
        payload: posts
    }
}

export function fetchPosts() {
    return (dispatch) => {
        const url = `http://newsapi.org/v2/top-headlines?country=ru&apiKey=a64c1d9e0f7a4a96ba5e7ea5f64b6c71`;
        axios.get(url)
            .then(res => {
                dispatch(posts(res.data.articles))
            })
    }
}

export function fetchChangePagePost(post) {
    return{
        type: CHANGE_PAGE_POSTS,
        payload: post
    }
}

export function fetchByCountryPost(post) {
    return{
        type: FETCH_BY_COUNTRY_POSTS,
        payload: post
    }
}

export function fetchByCategoryPost(post) {
    return{
        type: FETCH_BY_CATEGORY_POSTS,
        payload: post
    }
}

export function fetchOtherPosts(page, code, category) {
    return (dispatch) => {
        const url = `http://newsapi.org/v2/top-headlines?country=${code}${category && (`&category=${category}`)}&apiKey=a64c1d9e0f7a4a96ba5e7ea5f64b6c71&page=${page}`;
        axios.get(url)
            .then(res => {
                dispatch(fetchChangePagePost(res.data.articles))
            })
    }
}

export function fetchByCountry(code, category) {
    return (dispatch) => {
        const url = `http://newsapi.org/v2/top-headlines?country=${code}${category && (`&category=${category}`)}&apiKey=a64c1d9e0f7a4a96ba5e7ea5f64b6c71`;
        axios.get(url)
            .then(res => {
                dispatch(fetchByCountryPost(res.data.articles))
            })
    }
}

export function fetchByCategory(category, code) {
    return (dispatch) => {
        const url = `http://newsapi.org/v2/top-headlines?country=${code}&category=${category}&apiKey=a64c1d9e0f7a4a96ba5e7ea5f64b6c71`;
        axios.get(url)
            .then(res => {
                dispatch(fetchByCategoryPost(res.data.articles))
            })
    }
}