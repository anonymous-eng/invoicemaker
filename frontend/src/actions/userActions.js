import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from "../constants/userConstants";
import axios from "axios";
import {toast} from "react-toastify";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
    toast.success("Logged In Successfully", {
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
      type: USER_LOGIN_FAIL,
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
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
  toast.success("Logged Out Successfully", {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
};

export const register = (email, password, name) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users",
      { email, password, name },
      config
    );

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    toast.success("Registered Successfully", {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};