import axios from 'axios';

import {
    GET_USERS,
    SET_LOADING,
    USERS_ERROR,
    GET_STARS,
    GET_USER
} from './types';

const githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
const githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;

export const getUsers = ( city = 'Kyiv' ) => dispatch => {
    setLoading();

    axios
        .get(`https://api.github.com/search/users?q=location:${city}+sort:followers&per_page=10`)
        .then(res => {
            dispatch({
                type: GET_USERS,
                payload: res.data.items
            });
            res.data.items.forEach(async user => {
                await axios
                    .get(user.repos_url)
                    .then(res => {
                        const stars = res.data.reduce((sum, current) => current.stargazers_count ? sum + current.stargazers_count : sum, 0);
                        dispatch({
                            type: GET_STARS,
                            payload: {
                                userId: user.id,
                                stars
                            },
                        });
                    })
                    .catch(err => dispatch({
                        type: USERS_ERROR,
                        payload: err
                    }));

                axios
                    .get(`https://api.github.com/users/${user.login}?client_id=${githubClientId}&client_secret=${githubClientSecret}`)
                    .then(res => {
                        dispatch({
                            type: GET_USER,
                            payload: res.data
                        });
                    })
                    .catch(err => dispatch({
                        type: USERS_ERROR,
                        payload: err
                    }));
            });
        })
        .catch(err => dispatch({
            type: USERS_ERROR,
            payload: err
        }));
};

export const setLoading = () => {
    return {
        type: SET_LOADING
    };
};
