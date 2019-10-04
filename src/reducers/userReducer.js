import {
    GET_STARS,
    GET_USER,
    GET_USERS,
    SET_LOADING,
    USERS_ERROR
} from '../actions/types';

const initialState = {
    users: null,
    loading: false,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false
            };
        case GET_STARS:
            const newUsersWithStars = state.users.map(user => {
                if (user.id === action.payload.userId) {
                    user['stars'] = action.payload.stars;
                    return user;
                }
                return user;
            });
            return {
                ...state,
                users: newUsersWithStars
            };
        case GET_USER:
            const newUsers = state.users.map(user => {
                if (user.id === action.payload.id) {
                    return Object.assign(user, action.payload);
                }
                return user;
            });
            return {
                ...state,
                users: newUsers
            };
        case SET_LOADING:
            return {
                ...state,
                loading: true
            };
        case USERS_ERROR:
            console.error(action.payload);
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        default:
            return state;
    }
};
