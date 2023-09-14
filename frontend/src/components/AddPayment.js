import React, {useState, useEffect, Fragment} from 'react'
import { useDispatch } from 'react-redux';
import { updateInvoice } from '../actions/invoicesActions';
import {toast} from "react-toastify";

const AddPayment = ({isVisible, onClose, invoice}) => {

    const [payment, setPayment] = useState({
        amountPaid: 0,
        datePaid: new Date(),
        paymentMethod: '',
        note: '',
        paidBy: ''
    })

    const dispatch = useDispatch();

    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().substring(0,10));
    const [paymentRecords, setPaymentRecords] = useState([])
    const [method, setMethod] = useState("Invalid")
    const [totalAmountReceived, setTotalAmountReceived] = useState(0)
    const [updatedInvoice, setUpdatedInvoice] = useState({})

    useEffect(() => {
      setPayment({...payment, paymentMethod: method})
    },[method])

    useEffect(() => {
      setPayment({...payment, datePaid: selectedDate})
    },[selectedDate])

    useEffect(() => {
      if(invoice) {
        setPayment({...payment, amountPaid: (Number(invoice.total) - Number(invoice.totalAmountReceived)).toFixed(2), paidBy: invoice?.client?.name})
      }
    },[invoice])
    
    useEffect(() => {
        if(invoice?.paymentRecords) {
            setPaymentRecords(invoice?.paymentRecords)
           
        }
    }, [invoice])

    useEffect(() => {
      let totalReceived = 0
      for(var i = 0; i < invoice?.paymentRecords?.length; i++) {
        totalReceived += Number(invoice?.paymentRecords[i]?.amountPaid)
        setTotalAmountReceived(totalReceived)
      }
    }, [invoice, payment] )

    useEffect(() => {
      setUpdatedInvoice({...invoice, status: (Number(totalAmountReceived) + Number(payment.amountPaid)) 
        >= 
        invoice?.total ? 'Paid' : 'Partial', 
        paymentRecords: [...paymentRecords, payment], 
        totalAmountReceived:  Number(totalAmountReceived) + Number(payment.amountPaid)
      })
    },[payment, paymentRecords, totalAmountReceived, invoice] )
  
  if(!isVisible)
    return null;

  const handleClose = (e) => {
    if(e.target.id === "wrapper"){
        onClose();
    }
  }

  const handleSubmitPayment =(e)=> {
        e.preventDefault();

        if(payment.amountPaid < 1){
          toast.warning(`Minimum Payment Amount should be ${invoice.currency} 1`, {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        
        if(method === "Invalid"){
            toast.warning('Invalid Payment Method', {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        
        if(payment.amountPaid > (invoice.total - invoice.totalAmountReceived)){
            toast.warning('Amount Paid excceded the remaining Balance', {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }

        onClose()
        dispatch(updateInvoice(invoice._id, updatedInvoice))
        setPayment({
        amountPaid: 0,
        datePaid: new Date(),
        paymentMethod: '',
        note: '',
        paidBy: ''
        });
        setMethod("Invalid");
        setSelectedDate(new Date().toISOString().substring(0,10));
    }
  
  return (
    <Fragment>
        <div className=' fixed inset-0 z-50 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'
            id="wrapper" onMouseDown={handleClose}>
            <div className=' bg-white rounded-lg flex flex-col gap-4 p-4 px-6'>
                <h2 className='font-bold text-2xl text-center'> Record Payment </h2>
                <hr className='my-2' />

                <input className='bg-gray-100 rounded-lg p-2 px-4 w-80 border-2 border-gray-300' value={selectedDate} onChange={e => setSelectedDate(e.target.value)} type="date" />
                <input className='bg-gray-100 rounded-lg p-2 px-4 w-80 border-2 border-gray-300' onChange={(e) => setPayment({...payment, amountPaid: e.target.value})} value={payment.amountPaid} type="number" placeholder='Amount Paid *' />
                <select className='bg-gray-100 rounded-lg p-2 px-4 border-2 border-gray-300 w-80 ' value={method} onChange={(e) => setMethod(e.target.value)} name="Payment Method">
                    <option  value="Invalid">Select Payment Method</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Cash">Cash</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="PayPal">PayPal</option>
                    <option value="Others">Others</option>
                </select>
                <textarea className='bg-gray-100 rounded-lg p-2 px-4 border-2 border-gray-300 w-80' onChange={(e) => setPayment({...payment, note: e.target.value})} value={payment.note} type="text" placeholder='Note ' />
                <button className='bg-indigo-500 hover:bg-indigo-600 font-bold  focus:outline-none text-sm
                  text-white py-2.5 px-5 text-center rounded-lg w-fit mx-auto' 
                    onClick={
                        handleSubmitPayment}>
                    Save Record
                </button>
            </div>
          </div>
    </Fragment>
  )
}

export default AddPayment