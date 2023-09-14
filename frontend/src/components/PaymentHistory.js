import React, {useState} from 'react'
import moment from 'moment'


const PaymentHistory = ({ paymentRecords}) => {
  const [show, setShow] = useState(false);

    function toCommas(value) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  
  return (
    <>
    <button onClick={() => setShow(!show)} className='bg-zinc-200 mt-4 p-4 rounded-t-lg flex flex-row justify-between cursor-pointer'>
      <div className='flex flex-col sm:flex-row gap-2 md:gap-4'>
        <h2 className='text-gray-700 text-left font-bold text-xl'>Payment History </h2>
        <h2 className='text-white bg-green-600 font-bold rounded-full w-8 h-8 text-center text-xl'>{paymentRecords.length} </h2>
      </div>
      <p>{show? "➖" : "➕"}</p>
    </button>
    {
      show && 
          <div className='bg-zinc-200 -mt-4 overflow-x-auto h-44 rounded-b-lg shadow-lg p-4'>
          <table className='w-full'>
            <thead className=' bg-gray-100 border-b-2'>
              <tr>
                <th className='w-[40%] p-3 text-sm font-semibold tracking-wide text-left'>Date Paid</th>
                <th className='w-[15%] p-3 text-sm font-semibold tracking-wide text-left'>Amount Paid</th>
                <th className='w-[15%] p-3 text-sm font-semibold tracking-wide text-left'>Payment Method</th>
              </tr>
            </thead>
              <tbody >
              { paymentRecords.map((record) => (
                <tr className='bg-[#6DA5C0] text-white [&:nth-child(even)]:bg-[#0F959C] ' key={record._id}>
                  <td className='p-3 font-semibold '>{moment(record.datePaid).format('MMMM Do YYYY')} </td>
                  <td className='p-3 font-semibold '>{toCommas(record.amountPaid)} </td>
                  <td className='p-3 font-semibold '>{record.paymentMethod} </td>
                </tr>
                ))}
              </tbody>
          </table>
        </div>
    }
    </>
  )
}

export default PaymentHistory