import { FETCH_ACTION_ITEMS_REQUEST, FETCH_ACTION_ITEMS_SUCCESS, FETCH_ACTION_ITEMS_FAILURE } from './ActionTypes';
import axios from 'axios';

export const fetchActionItems = () => {
    return async (dispatch) => {
        dispatch({ type: FETCH_ACTION_ITEMS_REQUEST });
        try {
            const response = await axios.get('/api/next-action-items');
            dispatch({ type: FETCH_ACTION_ITEMS_SUCCESS, payload: response.data });
        } catch (error) {
            dispatch({ type: FETCH_ACTION_ITEMS_FAILURE, error });
        }
    };
};
