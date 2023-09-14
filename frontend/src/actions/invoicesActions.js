import {
    START_LOADING,
    INVOICE_LIST_SUCCESS,
    INVOICE_FAIL,
    INVOICE_CREATE_SUCCESS,
    INVOICE_GET_SUCCESS,
    INVOICE_DELETE_SUCCESS,
    INVOICE_UPDATE_SUCCESS,
} from '../constants/invoicesConstants';
import axios from "axios";
import{toast} from "react-toastify";

export const listInvoices = (searchQuery) => async(dispatch, getState) => {
    try {
    dispatch({
      type: START_LOADING,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    
    const { data } = await axios.get(`/api/invoices?search=${searchQuery.search}`, config);
    
    dispatch({
      type: INVOICE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: INVOICE_FAIL,
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

export const createInvoice = (invoice, navigate) => async(dispatch, getState) => {
    try {
    dispatch({
      type: START_LOADING,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    
    const { data } = await axios.post(`/api/invoices`, invoice, config);
     
    dispatch({
      type: INVOICE_CREATE_SUCCESS,
      payload: data,
    });
    navigate(`/invoice/${data._id}`);
    toast.success('Invoice Created Successfully', {
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
      type: INVOICE_FAIL,
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

export const getInvoice = (id) => async(dispatch, getState) => {
    try {
    dispatch({
      type: START_LOADING,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    
    const { data } = await axios.get(`/api/invoices/${id}`, config);
    
    dispatch({
      type: INVOICE_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: INVOICE_FAIL,
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

export const updateInvoice = (id, invoice) => async(dispatch, getState) => {
    try {
    dispatch({
      type: START_LOADING,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    
    const { data } = await axios.patch(`/api/invoices/${id}`, invoice, config);
    
    dispatch({
      type: INVOICE_UPDATE_SUCCESS,
      payload: data,
    });
    toast.success("Invoice Updated Successfully", {
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
      type: INVOICE_FAIL,
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

export const deleteInvoice = (id) => async(dispatch, getState) => {
    try {
    dispatch({
      type: START_LOADING,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    
    await axios.delete(`/api/invoices/${id}`, config);
    
    dispatch({
      type: INVOICE_DELETE_SUCCESS,
      payload: id,
    });
    toast.success("Invoice Deleted Successfully", {
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
      type: INVOICE_FAIL,
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