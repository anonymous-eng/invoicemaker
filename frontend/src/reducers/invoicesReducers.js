import {
    START_LOADING,
    INVOICE_LIST_SUCCESS,
    INVOICE_CREATE_SUCCESS,
    INVOICE_FAIL,
    INVOICE_GET_SUCCESS,
    INVOICE_DELETE_SUCCESS,
    INVOICE_UPDATE_SUCCESS,
} from '../constants/invoicesConstants';

export const invoiceListReducer = (state={invoices: []}, action) => {
    switch(action.type){
        case START_LOADING:
            return { loading: true };
        case INVOICE_LIST_SUCCESS:
            return { loading: false, invoices: action.payload };
        case INVOICE_CREATE_SUCCESS:
            return { loading: false,success: true };
        case INVOICE_GET_SUCCESS:
            return { loading: false, invoice: action.payload };
        case INVOICE_DELETE_SUCCESS:
            return { loading:false, success: true};
        case INVOICE_UPDATE_SUCCESS:
            return { loading: false, success: true};
        case INVOICE_FAIL:
            return { loading: false, error: action.payload};
        default:
            return state;
    }
}