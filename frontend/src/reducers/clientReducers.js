import {
    CLIENT_REQUEST,
    CLIENT_FAIL,
    CLIENT_LIST_SUCCESS,
    CLIENT_UPDATE_SUCCESS,
    CLIENT_CREATE_SUCCESS,
    CLIENT_DELETE_SUCCESS,
} from "../constants/clientConstants";

export const clientReducer = (state = {clients: []}, action) => {
  switch (action.type) {
    case CLIENT_REQUEST:
      return { loading: true };
    case CLIENT_LIST_SUCCESS:
      return { loading: false, clients: action.payload };
    case CLIENT_CREATE_SUCCESS:
      return { success: true };
    case CLIENT_UPDATE_SUCCESS:
        return { success: true };
    case CLIENT_DELETE_SUCCESS:
      return { success: true};
    case CLIENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};