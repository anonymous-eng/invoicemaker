import React, {useState, useEffect, Fragment} from 'react';
import {initialState} from '../initialState';
import moment from "moment";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { getClientsByUser } from '../actions/clientActions';
import { createInvoice } from '../actions/invoicesActions';
import AddClient from './AddClient';
import {toast} from "react-toastify";
import Skeleton from 'react-loading-skeleton';

const Create = () => {
  
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const clientList = useSelector((state) => state.clientList);
  const { clients, success, loading } = clientList;  

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialStateCopy = JSON.parse(JSON.stringify(initialState));
  const [invoiceData, setInvoiceData] = useState(initialStateCopy);
  const [ rates, setRates] = useState("");
  const [currency, setCurrency] = useState("");
  const [vat, setVat] = useState(0)
  const [subTotal, setSubTotal] = useState(0)
  const [total, setTotal] = useState(0)
  const [notes, setNotes] = useState("");
  const[status, setStatus] = useState('Unpaid');

  const today = new Date();
  today.setDate(today.getDate() + 8);
  const date = today.toISOString().substring(0,10);
  const [selectedDate, setSelectedDate] = useState(date);
  const [ isOpen, setIsOpen] = useState(false);
  const [client, setClient] = useState(null);
  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
      getTotalCount();
  },[])

  const getTotalCount = async() => {
    
    try {
      const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo?.token}`
      },
      };

      const response = await axios.get(`/api/invoices/count?search=${userInfo?._id}`, config);
      
      setInvoiceData({...invoiceData, invoiceNumber: (Number(response.data) + 1).toString().padStart(3, '0')})
      
    } catch (error) {
      const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
      
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

  useEffect(() => {
    if(!userInfo)
      navigate("/");
    else 
      dispatch(getClientsByUser({search: userInfo?._id}));
  }, [dispatch, navigate, userInfo, success]);


  useEffect(() => {
            //Get the subtotal
    const subTotal =()=> {
      var arr = document.getElementsByName("amount");
      var subtotal = 0;
      for(var i = 0; i < arr.length; i++) {
        if(arr[i].value) {
          subtotal += +arr[i].value;
        }
            // document.getElementById("subtotal").value = subtotal;
        setSubTotal(subtotal);
      }
        }
     subTotal()
       
  }, [invoiceData])
  
  useEffect(() => {
        const total =() => {
            
            //Tax rate is calculated as (input / 100 ) * subtotal + subtotal 
            const overallSum = (rates /100 * subTotal + subTotal).toFixed(2);
            //VAT is calculated as tax rates /100 * subtotal
            setVat((rates /100 * subTotal).toFixed(2));
            setTotal(overallSum)


        }
        total()
    }, [ invoiceData, rates, subTotal])

  const handleRates = (e) => {
    setRates(e.target.value)
    setInvoiceData((prevState) => ({...prevState, tax: e.target.value}))
  }

  const handleAddField = (e) => {
    e.preventDefault()
    setInvoiceData((prevState) => ({...prevState, items: [...prevState.items,  {itemName: '', unitPrice: '', quantity: '', discount: '' }]}))
  }

  const handleChange = (index, e) => {
    const values = [...invoiceData.items]
    values[index][e.target.name] = e.target.value
    setInvoiceData({...invoiceData, items: values})
  }

  const handleRemoveField = (index) => {
    const values = invoiceData.items
    values.splice(index, 1)
    setInvoiceData((prevState) => ({...prevState, values}))
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if(invoiceData.invoiceNumber === ""){
      toast.warning('Enter Valid Invoice Number', {
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

    if(!client){
      toast.warning('Add Customer Information', {
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

    if(invoiceData.items.some(item => Object.values(item).some(value => value === ''))){
      toast.warning('Fill the Items Table', {
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

    if(invoiceData.items.some(item => Number(item.discount) > 100)){
      toast.warning('Discount limit Exceeded', {
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

    if(!rates){
      toast.warning('Enter Valid Tax Rates', {
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
    
    if (new Date(selectedDate) < new Date().setHours(0,0,0,0)) {
      toast.warning('Invalid Due Date', {
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

    if(!currency || (/\d/.test(currency))){
      toast.warning('Enter Valid Currency', {
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

        dispatch(createInvoice({
            ...invoiceData, 
            subTotal: subTotal, 
            total: total, 
            vat: vat, 
            rates: rates, 
            currency: currency, 
            dueDate: selectedDate, 
            invoiceNumber: `${
                invoiceData.invoiceNumber < 100 ? 
                (Number(invoiceData.invoiceNumber)).toString().padStart(3, '0') 
                : Number(invoiceData.invoiceNumber)
            }`,
            client, 
            notes: notes,
            status: status, 
            totalAmountReceived: 0,
            paymentRecords: [], 
            creator: [userInfo?._id] },
            navigate
            ));

      // setInvoiceData(initialState)
      // setRates(0)
      // setClient(null)
      // setStatus('Unpaid')
      // setSelectedDate(date)
      // setNotes("");
      // setCurrency("");
      
  }

  function toCommas(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <Fragment>
      <AddClient isVisible={open} onClose={() => setOpen(false)}  currentId={currentId} setCurrentId={setCurrentId} />
      <div className='bg-slate-100 m-4 shadow-2xl rounded-lg p-4 flex gap-4 flex-col'>
      <div className='mb-4 p-2 flex flex-col md:flex-row md:items-center gap-4'>
        <h2 className='text-gray-700 font-bold text-xl'>Invoice Number: </h2>
        <input className='bg-[#6DA5C0] shadow-lg w-[25%] text-white placeholder:text-white font-semibold p-2 rounded-lg' placeholder='Ex: 001'
          value={invoiceData.invoiceNumber} onChange={e => setInvoiceData({...invoiceData, invoiceNumber: e.target.value})} type='number'></input>
      </div>

      <div className='p-2 flex flex-col gap-4 md:flex-row md:justify-between'>
        <div>
          <h2 className='text-gray-700 font-bold mb-3 text-xl'>Bill To:</h2>
          {client ? 
              <div className='space-y-1'> 
                <h2 className='font-medium text-gray-700 tracking-wide font-serif text-lg'>{client.name}</h2>
                <h2 className='font-medium text-gray-700 tracking-wide font-serif text-lg'>{client.email}</h2>
                <h2 className='font-medium text-gray-700 tracking-wide font-serif text-lg'>{client.phone}</h2>
                <h2 className='font-medium text-gray-700 tracking-wide font-serif text-lg'>{client.address}</h2>
                <button onClick={() => setClient(null)} className='w-fit tracking-wider bg-[#0F959C] shadow-lg p-2 rounded-lg font-semibold text-white'>Change</button>
              </div>
          : <div className='relative flex flex-col md:flex-row gap-4'>
            <button onClick={() => setOpen((prev) => !prev)} className='w-fit overflow-clip tracking-wider bg-[#0F959C] shadow-lg p-2 border-4 border-transparent active:border-black duration-100 active:text-black rounded-lg font-semibold text-white'>New Customer</button>
            <button onClick={() => setIsOpen((prev) => !prev)} className='flex items-center overflow-clip justify-between tracking-wider border-4 border-transparent active:border-black duration-100 active:text-black w-fit bg-[#0F959C] shadow-lg p-2 rounded-lg font-semibold text-white' >
              Existing Customer
              {isOpen? (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.2048 7.29258L18.1189 15.7412C18.49 16.2715 18.1107 17 17.4635 17L6.53652 17C5.88931 17 5.50998 16.2715 5.88114 15.7412L11.7952 7.29258C11.8947 7.1504 12.1053 7.1504 12.2048 7.29258Z" fill="#fff"/>
                </svg>) : 
                (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.1808 15.8297L6.54199 9.20285C5.89247 8.27496 6.55629 7 7.68892 7L16.3111 7C17.4437 7 18.1075 8.27496 17.458 9.20285L12.8192 15.8297C12.4211 16.3984 11.5789 16.3984 11.1808 15.8297Z" fill="#fff"/>
                </svg>)}
              {isOpen && loading && <div className='bg-[#0F959C] px-2 absolute top-28 left-0 md:left-[158px] md:top-14 w-48 rounded-lg'>
                            <Skeleton className=' rounded-lg my-1 focus:outline-none border-2 border-dashed' count={5} />
                            </div>
              }

              {isOpen && clients &&
                <div className='bg-[#0F959C] absolute top-28 left-0 md:left-[158px] md:top-14 w-48 max-h-52 overflow-y-auto  flex flex-col items-center rounded-lg'>
                  { 
                    clients.map((c) => (
                      <div onClick={() => {
                          setIsOpen(false);
                          setClient(c);
                            }}  className='w-full hover:bg-yellow-400 cursor-pointer rounded-r-lg border-l-transparent hover:border-l-black hover:text-black border-l-4 p-4' key={c._id}>
                        <h2 className='font-semibold'>{c.name}</h2>
                      </div>
                    ))}
                </div>
              }
            </button>
          </div>
          }
        </div>

        <div className='flex flex-col p-2 items-end'>
          <h2 className='text-gray-700 font-bold text-xl'>STATUS</h2>
          <h2 className='font-bold text-white bg-red-500 p-1 rounded-lg w-fit tracking-wide font-serif text-lg mb-2'>{status}</h2>
          <h2 className='text-gray-700 font-bold text-xl'>DATE</h2>
          <h2 className='font-medium text-gray-700 tracking-wide font-serif text-lg mb-2'>{moment().format("MMM Do YYYY")}</h2>
          <h2 className='text-gray-700 font-bold text-xl'>DUE DATE</h2>
          <h2 className='font-medium text-gray-700 tracking-wide font-serif text-lg mb-2'>{selectedDate ? moment(selectedDate).format("Do MMM YYYY") : '1st Jan 2023' }</h2>
          <h2 className='text-gray-700 font-bold text-xl'>AMOUNT</h2>
          <h2>{currency} {toCommas(total)}</h2>
        </div>
      </div>
      
      <div className='bg-zinc-200 overflow-x-auto rounded-lg shadow-lg p-4'>
        <table>
          <thead className=' bg-gray-100 border-b-2'>
            <tr>
              <th className='w-[40%] p-3 text-sm font-semibold tracking-wide text-left'>Item Name</th>
              <th className='w-[12%] p-3 text-sm font-semibold tracking-wide text-left'>Quantity</th>
              <th className='w-[12%] p-3 text-sm font-semibold tracking-wide text-left'>Price</th>
              <th className='w-[12%] p-3 text-sm font-semibold tracking-wide text-left'>Discount(%)</th>
              <th className='w-[12%] p-3 text-sm font-semibold tracking-wide text-left'>Amount</th>
              <th className='w-[12%] p-3 text-sm font-semibold tracking-wide text-left'>Action</th>
            </tr>
          </thead>
            <tbody>
            { invoiceData.items.map((item, index) => (
              <tr>
                <td className=' p-3 font-semibold'><input name='itemName' value={item.itemName} className='bg-[#6DA5C0] text-white placeholder:text-white w-[100%] rounded-lg p-2' type="text" onChange={e => handleChange(index, e)} placeholder='Item Name or Description' /></td>
                <td className=' p-3 font-semibold'><input name='quantity' value={item.quantity} className='bg-[#6DA5C0] text-white placeholder:text-white w-[100%] rounded-lg p-2 ' type="number" onChange={e => handleChange(index, e)} placeholder="0" /></td>
                <td className=' p-3 font-semibold'><input name='unitPrice' value={item.unitPrice} className='bg-[#6DA5C0] text-white placeholder:text-white w-[100%] rounded-lg p-2 ' type="number" onChange={e => handleChange(index, e)} placeholder="0" /></td>
                <td className=' p-3 font-semibold'><input name='discount' value={item.discount} className='bg-[#6DA5C0] text-white placeholder:text-white w-[100%] rounded-lg p-2 ' type="number" onChange={e => handleChange(index, e) } placeholder="0" /></td>
                <td className='p-3 font-semibold'><input name='amount' value={((item.quantity * item.unitPrice) - (item.quantity * item.unitPrice) * item.discount / 100).toFixed(2)} onChange={e => handleChange(index, e)} className='bg-[#6DA5C0] text-white placeholder:text-white w-[100%] rounded-lg p-2 ' type="number" placeholder="0" disabled /></td>
                <td className='p-3 font-semibold'><button onClick={() => handleRemoveField(index)} className='bg-red-400 rounded-full p-1'><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M10 12V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                      <path d="M14 12V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                      <path d="M4 7H20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                      <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                      <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                      </svg></button></td>
              </tr>
              ))}
            </tbody>
        </table>
        <div className='p-3'>
          <button onClick={handleAddField} className=' bg-purple-500 shadow-lg p-2 rounded-full w-10 font-semibold text-white'>+</button>
        </div>
      </div>
      
      <div className='bg-zinc-200 flex flex-col shadow-lg rounded-lg md:ml-[50%] p-4'>
            <div className='bg-gray-100 text-gray-700 font-semibold shadow-lg rounded-lg text-xl p-4'>Invoice Summary</div>
            <div className='flex gap-4 items-center text-gray-500 justify-between font-semibold px-4 py-2'>
                <p>Sub total:</p>
                <h4 className='text-right'>{subTotal}</h4>
            </div>
            <div className='flex gap-4 items-center text-gray-500 justify-between font-semibold px-4 py-2'>
                <p>VAT(%):</p>
                <h4 className=''>{vat}</h4>
            </div>
            <div className='flex gap-4 items-center text-gray-500 justify-between font-semibold px-4 py-2'>
                <p>Total:</p>
                <h4 >{currency} {toCommas(total)}</h4>
            </div>
      </div>
      
      <div className=' flex flex-col mt-4 gap-4 p-4'>
        <div className='flex flex-col md:flex-row gap-4'>
          <div>
            <h2 className='text-gray-700 font-bold mb-3'>Tax Rates(%)</h2>
            <input className='bg-[#6DA5C0] text-white placeholder:text-white shadow-lg w-[50%] font-semibold p-2 rounded-lg' type="number" value={rates} 
              onChange={e => handleRates(e)} placeholder='0' />
          </div>
          <div>
            <h2 className='text-gray-700 font-bold mb-3'>Due Date</h2>
            <input className='bg-[#6DA5C0] text-white placeholder:text-white w-[50%] md:w-[100%] shadow-lg font-semibold p-2 rounded-lg' type="date"
              value={selectedDate.slice(0, 10)} onChange={(e)=>{ setSelectedDate(e.target.value) }}/>
          </div>
        </div>
        <div>
          <h2 className='text-gray-700 font-bold mb-3'>Currency</h2>
          <input className='bg-[#6DA5C0] text-white placeholder:text-white uppercase shadow-lg w-[50%] md:w-[12%] font-semibold p-2 rounded-lg' type="text"
            value={currency} onChange={(e)=>{ setCurrency(e.target.value) }} placeholder='Ex: INR' />
        </div>
      </div>
      <div className='bg-zinc-200 rounded-lg flex flex-col p-4 mt-4'>
        <h2 className='text-gray-700 font-bold mb-3'>Note/Payment Info</h2>
        <textarea className='bg-[#6DA5C0] text-white placeholder:text-white font-semibold rounded-lg p-2' placeholder="Provide additional details or terms of service"
          onChange={(e) => setNotes(e.target.value)}  value={notes} />
      </div>
      <div className='flex'>
        <button className='bg-indigo-500 hover:bg-indigo-600 font-bold mt-4 focus:outline-none text-sm
          text-white py-2.5 px-5 text-center rounded-lg w-fit mx-auto' onClick={handleSubmit}>SAVE AND CONTINUE</button>
      </div>
    </div>
    </Fragment>
  )
}

export default Create