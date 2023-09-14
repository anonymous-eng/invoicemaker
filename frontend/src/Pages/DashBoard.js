import React,{useState, useEffect, Fragment} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listInvoices } from '../actions/invoicesActions';
import Skeleton from 'react-loading-skeleton'
import { Check, Pie, Bag, Card, Clock, Frown } from './Icons'
import moment from "moment";
import Chart from '../components/Chart';

const DashBoard = () => {

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const invoiceList = useSelector((state) => state.invoiceList);
  const { loading, error, invoices, success } = invoiceList; 

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const overDue = invoices?.filter((invoice) => invoice.dueDate <= new Date().toISOString())

  let paymentHistory = []
    for(let i = 0; i < invoices?.length; i++) {
        let history = []
        if(invoices[i].paymentRecords !== undefined) {
            history = [...paymentHistory, invoices[i].paymentRecords]
            paymentHistory = [].concat.apply([], history);
        }
        
    }


    //sort payment history by date
   const sortHistoryByDate =  paymentHistory.sort(function(a, b) {
        var c = new Date(a.datePaid);
        var d = new Date(b.datePaid);
        return d-c;
    });
    
    
    let totalPaid = 0
    for(let i = 0; i < invoices?.length; i++) {
        if(invoices[i].totalAmountReceived !== undefined) {
            totalPaid += invoices[i].totalAmountReceived
        }
        
    }

    let totalAmount = 0
    for(let i = 0; i < invoices?.length; i++) {
        totalAmount += invoices[i].total
    }

  useEffect(() => {
    if(!userInfo)
      navigate("/");
    else
      dispatch(listInvoices({search: userInfo?._id}));
  }, [dispatch, navigate, userInfo]);

  const unpaidInvoice = invoices?.filter((invoice) => invoice.status === 'Unpaid')
  const paid = invoices?.filter((invoice) => invoice.status === 'Paid')
  const partial = invoices?.filter((invoice) => invoice.status === 'Partial')

  function toCommas(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <Fragment>
      {loading && 
            <div className='bg-slate-100 m-4 p-2 shadow-2xl shadow-green-900 rounded-lg '>
              <Skeleton className='rounded-lg mb-2 focus:outline-none border-2 border-dashed h-10' count={10} />
            </div>}
      {invoices && <div className='h-full p-4'>
      <div className='bg-slate-100 shadow-2xl m-4 rounded-lg p-4 pl-6 gap-4 flex flex-wrap'>
        <div className='flex flex-col sm:flex-row sm:gap-8 md:gap-4 overflow-clip h-32 w-full sm:w-[47%] md:w-[23%] justify-center items-center gap-1 bg-blue-800 shadow-lg text-zinc-100 rounded-lg p-4'>
          <div>
            <p className='text-xl text-center font-semibold'>{toCommas(totalPaid.toFixed(2))}</p>
            <h2 className='text-xl text-center font-semibold'>Payment Received</h2>
          </div>
          <div>
            <Check />
          </div>
        </div>
        <div className='flex flex-col sm:flex-row sm:gap-8 md:gap-4 overflow-clip h-32 w-full sm:w-[47%] md:w-[23%] justify-center items-center gap-1 bg-zinc-200 shadow-lg text-gray-500 rounded-lg p-4'>
          <div>
            <p className='text-xl text-center font-semibold'>{toCommas((totalAmount-totalPaid).toFixed(2))}</p>
            <h2 className='text-xl text-center font-semibold'>Pending Amount</h2>
          </div>
          <div>
            <Pie />
          </div>
        </div>
        <div className='flex flex-col sm:flex-row sm:gap-8 md:gap-4 overflow-clip h-32 w-full sm:w-[47%] md:w-[23%] justify-center items-center gap-1 bg-zinc-200 shadow-lg text-gray-500 rounded-lg p-4'>
          <div>
            <p className='text-xl text-center font-semibold'>{toCommas(totalAmount.toFixed(2))}</p>
            <h2 className='text-xl text-center font-semibold'>Total Amount</h2>
          </div>
          <div>
            <Bag />
          </div>
        </div>
        <div className='flex flex-col sm:flex-row sm:gap-8 md:gap-4 overflow-clip h-32 w-full sm:w-[47%] md:w-[23%] justify-center items-center gap-1 bg-zinc-200 shadow-lg text-gray-500 rounded-lg p-4'>
          <div>
            <p className='text-xl text-center font-semibold'>{invoices.length}</p>
            <h2 className='text-xl text-center font-semibold'>Total Invoices</h2>
          </div>
          <div>
            <Card />
          </div>
        </div>
        <div className='flex flex-col sm:flex-row sm:gap-8 md:gap-4 overflow-clip h-32 w-full sm:w-[47%] md:w-[23%] justify-center items-center gap-1 bg-green-800 shadow-lg text-zinc-100 rounded-lg p-4'>
          <div>
            <p className='text-xl text-center font-semibold'>{paid.length}</p>
            <h2 className='text-xl text-center font-semibold'>Paid Invoices</h2>
          </div>
          <div>
            <Check />
          </div>
        </div>
        <div className='flex flex-col sm:flex-row sm:gap-8 md:gap-4 overflow-clip h-32 w-full sm:w-[47%] md:w-[23%] justify-center items-center gap-1 bg-zinc-200 shadow-lg text-gray-500 rounded-lg p-4'>
          <div>
            <p className='text-xl text-center font-semibold'>{partial.length}</p>
            <h2 className='text-xl text-center font-semibold'>Partial Invoices</h2>
          </div>
          <div>
            <Pie />
          </div>
        </div>
        <div className='flex flex-col sm:flex-row sm:gap-8 md:gap-4 overflow-clip h-32 w-full sm:w-[47%] md:w-[23%] justify-center items-center gap-1 bg-zinc-200 shadow-lg text-gray-500 rounded-lg p-4'>
          <div>
            <p className='text-xl text-center font-semibold'>{unpaidInvoice.length}</p>
            <h2 className='text-xl text-center font-semibold'>Unpaid Invoices</h2>
          </div>
          <div>
            <Frown />
          </div>
        </div>
        <div className='flex flex-col sm:flex-row sm:gap-8 md:gap-4 overflow-clip h-32 w-full sm:w-[47%] md:w-[23%] justify-center items-center gap-1 bg-zinc-200 shadow-lg text-gray-500 rounded-lg p-4'>
          <div>
            <p className='text-xl text-center font-semibold'>{overDue.length}</p>
            <h2 className='text-xl text-center font-semibold'>OverDue</h2>
          </div>
          <div>
            <Clock />
          </div>
        </div>
      </div>
      { paymentHistory.length !== 0 && 
      <div className='bg-slate-100   m-4 shadow-2xl rounded-lg p-4 flex gap-4 flex-col'>
        <Chart paymentHistory={paymentHistory} />
      </div>}
      <div className='bg-slate-100 m-4 shadow-2xl rounded-lg p-4 flex gap-4 flex-col'>
        <h2 className='p-2 text-xl font-semibold text-gray-800'>{paymentHistory.length ? 'Recent Payments' : 'No payment received yet'}</h2>
        {
          paymentHistory.length !== 0 &&
          <div className='bg-zinc-200 overflow-x-auto rounded-lg shadow-lg p-4'>
          <table className='w-full'>
            <thead className=' bg-gray-100 border-b-2'>
              <tr>
                <th className='w-[5%] p-3 text-sm font-semibold tracking-wide text-left'></th>
                <th className='w-[20%] p-3 text-sm font-semibold tracking-wide text-left'>Paid By</th>
                <th className='w-[20%] p-3 text-sm font-semibold tracking-wide text-left'>Date Paid</th>
                <th className='w-[15%] p-3 text-sm font-semibold tracking-wide text-left'>Amount Paid</th>
                <th className='w-[15%] p-3 text-sm font-semibold tracking-wide text-left'>Payment Method</th>
                <th className='w-[20%] p-3 text-sm font-semibold tracking-wide text-left'>Note</th>
              </tr>
            </thead>
              <tbody >
              { sortHistoryByDate.slice(-10).map((record) => (
                <tr className='bg-[#6DA5C0] text-white [&:nth-child(even)]:bg-[#0F959C] ' key={record._id}>
                  <td className='p-3 font-semibold '>{record?.paidBy?.charAt(0)} </td>
                  <td className='p-3 font-semibold '>{record.paidBy} </td>
                  <td className='p-3 font-semibold '>{moment(record.datePaid).format('MMMM Do YYYY')} </td>
                  <td className='p-3 font-semibold '>{toCommas(record.amountPaid)}</td>
                  <td className='p-3 font-semibold '>{record.paymentMethod}</td>
                  <td className='p-3 font-semibold '>{record.note}</td>
                </tr>
                ))}
              </tbody>
          </table>
        </div>
        }
      </div>
      </div>}
    </Fragment>
  )
}

export default DashBoard