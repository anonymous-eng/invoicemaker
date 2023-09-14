import {
    CLIENT_REQUEST,
    CLIENT_FAIL,
    CLIENT_LIST_SUCCESS,
    CLIENT_UPDATE_SUCCESS,
    CLIENT_CREATE_SUCCESS,
    CLIENT_DELETE_SUCCESS,
} from "../constants/clientConstants";
import axios from "axios";
import { toast } from "react-toastify";

export const getClientsByUser =(searchQuery) => async (dispatch, getState) => {
    try {
    dispatch({
      type: CLIENT_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    
    const { data } = await axios.get(`/api/clients/user?search=${searchQuery.search}`, config);
    
    dispatch({
      type: CLIENT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: CLIENT_FAIL,
      payload: message,
    });
    toast.error(message, {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
}

export const createClient =(client) => async (dispatch, getState) => {

    try {
    dispatch({
      type: CLIENT_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    
    const { data } = await axios.post(
      `/api/clients`,
      client,
      config
    );

    dispatch({
      type: CLIENT_CREATE_SUCCESS,
      payload: data,
    });
    toast.success('Customer Added Successfully', {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: CLIENT_FAIL,
      payload: message,
    });
    toast.error(message, {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
}


export const updateClient =(id, client) => async (dispatch, getState) => {

    try {
    dispatch({
      type: CLIENT_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.patch(
      `/api/clients/${id}`,
      client,
      config
    );

    dispatch({
      type: CLIENT_UPDATE_SUCCESS,
      payload: data,
    });
    toast.success("Customer Updated Successfully", {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: CLIENT_FAIL,
      payload: message,
    });
    toast.error(message, {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
}

export const deleteClient =(id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CLIENT_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(
      `/api/clients/${id}`,
      config
    );

    dispatch({
      type: CLIENT_DELETE_SUCCESS,
      payload: id,
    });
    toast.success("Customer Deleted Successfully", {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: CLIENT_FAIL,
      payload: message,
    });
    toast.error(message, {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
}
