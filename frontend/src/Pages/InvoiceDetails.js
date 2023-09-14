import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import {getInvoice} from "../actions/invoicesActions";
import { initialState } from '../initialState';
import moment from "moment";
import Skeleton from 'react-loading-skeleton';
import AddPayment from '../components/AddPayment';
import PaymentHistory from '../components/PaymentHistory';
import { saveAs } from 'file-saver';
import axios from "axios";

const InvoiceDetails = () => {

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { id } = useParams();

  const invoiceList = useSelector((state) => state.invoiceList);
  const {invoice, loading, success} = invoiceList;

  const [invoiceData, setInvoiceData] = useState(initialState)
  const [ rates, setRates] = useState(0)
  const [vat, setVat] = useState(0)
  const [currency, setCurrency] = useState('')
  const [subTotal, setSubTotal] = useState(0)
  const [total, setTotal] = useState(0)
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [ client, setClient] = useState([])
  const [status, setStatus ] = useState('')
  const [open, setOpen] = useState(false);
  const [download, setDownload] = useState(false);
  const [email ,setEmail] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if(!userInfo)
      navigate("/");
    else
      dispatch(getInvoice(id));
  }, [dispatch, navigate, userInfo]);

  useEffect(() => {
    dispatch(getInvoice(id));
  },[id, success]);

  useEffect(() => {
    if(invoice) {
            //Automatically set the default invoice values as the ones in the invoice to be updated
      setInvoiceData(invoice)
      setRates(invoice.rates)
      setClient(invoice.client)
      setStatus(invoice.status)
      setSelectedDate(invoice.dueDate)
      setVat(invoice.vat)
      setCurrency(invoice.currency)
      setSubTotal(invoice.subTotal)
      setTotal(invoice.total)
    }
  }, [invoice])

  let bgColorClass = '';
  if(status === 'Unpaid') {
    bgColorClass = 'bg-red-500';
  } else if(status === 'Paid') {
    bgColorClass = 'bg-green-500';
  } else if(status === 'Partial') {
    bgColorClass = 'bg-orange-500';
  }

  let totalAmountReceived = 0
  for(var i = 0; i < invoice?.paymentRecords?.length; i++) {
    totalAmountReceived += Number(invoice?.paymentRecords[i]?.amountPaid)
  }

  const handleEdit = (id) => {
    navigate(`/edit/invoice/${id}`);
  }

  function toCommas(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const createAndDownloadPdf = () => {
    setDownload(true);
    axios.post('/create-pdf', 
    { name: invoice.client.name,
      address: invoice.client.address,
      phone: invoice.client.phone,
      email: invoice.client.email,
      dueDate: invoice.dueDate,
      date: invoice.createdAt,
      id: invoice.invoiceNumber,
      notes: invoice.notes,
      subTotal: toCommas(invoice.subTotal),
      total: toCommas(invoice.total),
      vat: invoice.vat,
      items: invoice.items,
      status: invoice.status,
      totalAmountReceived: toCommas(totalAmountReceived),
      balanceDue: toCommas((total - totalAmountReceived).toFixed(2)),
      senderName: userInfo?.name,
      senderEmail: userInfo?.email,
  })
      .then(() => axios.get('/fetch-pdf', { responseType: 'blob' }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

        saveAs(pdfBlob, 'invoice.pdf')
      }).then(() =>  setDownload(false))
  }

  const sendPdf = (e) => {
    e.preventDefault()
    setEmail(true);
    axios.post('/send-pdf', 
    { name: invoice.client.name,
      address: invoice.client.address,
      phone: invoice.client.phone,
      email: invoice.client.email,
      dueDate: invoice.dueDate,
      date: invoice.createdAt,
      id: invoice.invoiceNumber,
      notes: invoice.notes,
      subTotal: toCommas(invoice.subTotal),
      total: toCommas(invoice.total),
      vat: invoice.vat,
      items: invoice.items,
      status: invoice.status,
      totalAmountReceived: toCommas(totalAmountReceived),
      balanceDue: toCommas((total - totalAmountReceived).toFixed(2)),
      link: `http://127.0.0.1:3000/invoice/${invoice._id}`,
  })
  // .then(() => console.log("invoice sent successfully"))
  .then()
      .catch((error) => {
        console.log(error)
      }).then(() =>  setEmail(false))
  }

  return (
    <Fragment>
      <AddPayment isVisible={open} onClose={() => setOpen(false)} invoice={invoice} />
    {loading && 
      <div className='bg-slate-100 m-4 p-2 shadow-2xl shadow-green-900 rounded-lg '>
        <Skeleton className='rounded-lg mb-2 focus:outline-none border-2 border-dashed h-10' count={10} />
      </div>}
    {invoice && 
    <div>
      <div className='bg-slate-100 m-4 flex flex-col justify-evenly rounded-lg gap-4  p-4'>
        <div className='flex justify-around'>
          <button onClick={sendPdf} className='w-[40%] md:w-[25%] flex justify-center overflow-clip md:tracking-wider bg-[#0F959C] shadow-lg p-2 border-4 border-transparent active:border-black duration-100 active:text-black rounded-lg font-semibold text-white'>
              { email ?
                <svg  class="mr-3 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                : "Send To Customer"
                }
          </button>
          <button className='w-[40%] md:w-[25%] overflow-clip flex justify-center md:tracking-wider bg-[#0F959C] shadow-lg p-2 border-4 border-transparent active:border-black duration-100 active:text-black rounded-lg font-semibold text-white'
              onClick={createAndDownloadPdf} >
              { download ?
                <svg  class="mr-3 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                : "Download PDF"
                }
          </button>
        </div>
        <div className='flex justify-around'>
          <button onClick={() => handleEdit(invoice._id)} className='w-[40%] md:w-[25%] overflow-clip md:tracking-wider bg-[#0F959C] shadow-lg p-2 border-4 border-transparent active:border-black duration-100 active:text-black rounded-lg font-semibold text-white'>
              Edit Invoice
          </button>
          <button onClick={() => setOpen((prev) => !prev)} className='w-[40%] md:w-[25%] overflow-clip md:tracking-wider bg-[#0F959C] shadow-lg p-2 border-4 border-transparent active:border-black duration-100 active:text-black rounded-lg font-semibold text-white'>
              Record Payment
          </button>
        </div>
        {invoice?.paymentRecords.length !== 0 && (
                <PaymentHistory paymentRecords={invoice?.paymentRecords} />
          )}
      </div>

      <div className='bg-slate-100 m-4 shadow-2xl rounded-lg p-4 flex gap-4 flex-col'>
        <div className='mb-4 p-2 flex flex-col md:flex-row md:items-center gap-4'>
          <h2 className='text-gray-700 font-bold  text-xl'>Invoice Number: </h2>
          <p className='bg-[#6DA5C0] shadow-lg w-[25%] text-white font-semibold p-2 rounded-lg'>
             {invoice.invoiceNumber}
          </p>
        </div>

        <div className='p-2 flex flex-col gap-4 md:flex-row md:justify-between'>
          <div className='flex flex-col md:flex-row gap-8 md:space-x-8'>
            <div>
              <h2 className='text-gray-700 font-bold mb-3 text-xl'>Bill To:</h2>
              <div className='space-y-1'> 
                <h2 className='font-medium text-gray-700 tracking-wide  text-lg'>{client.name}</h2>
                <h2 className='font-medium text-gray-700 tracking-wide  text-lg'>{client.email}</h2>
                <h2 className='font-medium text-gray-700 tracking-wide  text-lg'>{client.phone}</h2>
                <h2 className='font-medium text-gray-700 tracking-wide  text-lg'>{client.address}</h2>
              </div>
            </div>
            <div>
              <h2 className='text-gray-700 font-bold mb-3 text-xl'>Bill From:</h2>
              <div className='space-y-1'> 
                <h2 className='font-medium text-gray-700 tracking-wide  text-lg'>{userInfo?.name}</h2>
                <h2 className='font-medium text-gray-700 tracking-wide  text-lg'>{userInfo?.email}</h2>
              </div>
            </div>
          </div>

          <div className='flex flex-col p-2 items-end'>
            <h2 className='text-gray-700 font-bold text-xl'>STATUS</h2>
            <h2 className={`font-bold text-white p-1 rounded-lg w-fit tracking-wide  text-lg mb-2 ${bgColorClass}`}>{status}</h2>
            <h2 className='text-gray-700 font-bold text-xl'>DATE</h2>
            <h2 className='font-medium text-gray-700 tracking-wide  text-lg mb-2'>{moment().format("MMM Do YYYY")}</h2>
            <h2 className='text-gray-700 font-bold text-xl'>DUE DATE</h2>
            <h2 className='font-medium text-gray-700 tracking-wide  text-lg mb-2'>{selectedDate ? moment(selectedDate).format("Do MMM YYYY") : '1st Jan 2023' }</h2>
            <h2 className='text-gray-700 font-bold text-xl'>AMOUNT</h2>
            <h2>{currency} {toCommas(total)}</h2>
          </div>
        </div>
      
        <div className='bg-zinc-200 overflow-x-auto rounded-lg shadow-lg p-4'>
          <table className='w-full'>
            <thead className=' bg-gray-100 border-b-2'>
              <tr>
                <th className='w-[40%] p-3 text-sm font-semibold tracking-wide text-left'>Item Name</th>
                <th className='w-[15%] p-3 text-sm font-semibold tracking-wide text-left'>Quantity</th>
                <th className='w-[15%] p-3 text-sm font-semibold tracking-wide text-left'>Price</th>
                <th className='w-[15%] p-3 text-sm font-semibold tracking-wide text-left'>Discount(%)</th>
                <th className='w-[15%] p-3 text-sm font-semibold tracking-wide text-left'>Amount</th>
              </tr>
            </thead>
              <tbody >
              { invoiceData.items.map((item, index) => (
                <tr className='bg-[#6DA5C0] text-white [&:nth-child(even)]:bg-[#0F959C] '>
                  <td className='p-3 font-semibold '>{item.itemName} </td>
                  <td className='p-3 font-semibold '>{item.quantity} </td>
                  <td className='p-3 font-semibold '>{item.unitPrice} </td>
                  <td className='p-3 font-semibold '>{item.discount}</td>
                  <td className='p-3 font-semibold '>{((item.quantity * item.unitPrice) - (item.quantity * item.unitPrice) * item.discount / 100).toFixed(2)}</td>
                </tr>
                ))}
              </tbody>
          </table>
        </div>
      
        <div className='bg-zinc-200 flex flex-col shadow-lg rounded-lg md:ml-[50%] p-4'>
              <div className='bg-gray-100 text-gray-700 font-semibold shadow-lg rounded-lg text-xl p-4'>Invoice Summary</div>
              <div className='flex items-center text-gray-500 justify-between font-semibold px-4 py-2'>
                  <p>Sub total:</p>
                  <h4 className='text-right'>{subTotal}</h4>
              </div>
              <div className='flex items-center text-gray-500 justify-between font-semibold px-4 py-2'>
                  <p>VAT(%):</p>
                  <h4 className=''>{vat}</h4>
              </div>
              <div className='flex items-center text-gray-500 justify-between font-semibold px-4 py-2'>
                  <p>Total:</p>
                  <h4 >{currency} {toCommas(total)}</h4>
              </div>
              <div className='flex items-center text-gray-500 justify-between font-semibold px-4 py-2'>
                  <p>Paid:</p>
                  <h4 >{currency} {toCommas(totalAmountReceived.toFixed(2))}</h4>
              </div>
              <div className='flex items-center text-gray-500 justify-between font-semibold px-4 py-2'>
                  <p>Balance:</p>
                  <h4 >{currency} {toCommas((total - totalAmountReceived).toFixed(2))}</h4>
              </div>
        </div>
      
        <div className='bg-zinc-200 rounded-lg flex flex-col p-4 mt-4'>
          <h2 className='text-gray-700 font-bold mb-3'>Note/Payment Info</h2>
          <p className='bg-[#6DA5C0] text-white font-semibold rounded-lg p-2'>
                {invoice.notes}
          </p>
        </div>
      </div>
    </div>
    }
    </Fragment>
  )
}

export default InvoiceDetails