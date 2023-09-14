import React, {useEffect} from 'react'
import invoices from "./Images/features-invoices.svg";
import estimates from "./Images/features-estimates.svg";
import receipts from "./Images/features-receipts.svg";
import clients from "./Images/features-clients.svg";
import taxes from "./Images/features-taxes.svg";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const HomePage = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();

  useEffect(() => {
    if(userInfo)
      navigate("/dashboard");
  }, [userInfo, navigate])
  
  return (
    <div className='bg-gray-200 tracking-wider flex flex-col'>
      <h2 className='font-bold text-4xl text-center px-16 pt-6 mb-8' >Do More With Invoice Maker</h2>
      <div className='flex flex-col md:flex-row md:px-16 md:mt-8'>
        <div className='flex flex-col justify-center px-16' >
          <h2 className='font-bold text-4xl my-4' >Invoice</h2>
          <p className='text-[#656b7d] text-xl font-semibold my-4'>Send professional invoices to your clients and instantly track payments.</p>
          <p className='text-[#656b7d] text-xl font-semibold my-4'>Simple yet sophisticated invoicing software made for small businesses and freelancers.</p>
        </div>
        <div className=' px-16' >
          <img className='w-[600px] h-[400px]' src={invoices} alt="" />
        </div>
      </div>
      
      <div className='flex flex-col md:flex-row-reverse md:px-16 md:mt-8'>
        <div className='flex flex-col justify-center px-16' >
          <h2 className='font-bold text-4xl my-4' >Estimate</h2>
          <p className='text-[#656b7d] text-xl font-semibold my-4'>Making billing estimates is easy in our built-in estimate generator.</p>
          <p className='text-[#656b7d] text-xl font-semibold my-4'>Set clear expectations with clients and start your project on solid ground.</p>
        </div>
        <div className=' px-16' >
          <img className='w-[600px] h-[400px]' src={estimates} alt="" />
        </div>
      </div>

      <div className='flex flex-col md:flex-row md:px-16 md:mt-8'>
        <div className='flex flex-col justify-center px-16' >
          <h2 className='font-bold text-4xl my-4' >Receipt</h2>
          <p className='text-[#656b7d] text-xl font-semibold my-4'>Create and send receipts online with the same streamlined interface you know and love.</p>
          <p className='text-[#656b7d] text-xl font-semibold my-4'>Perfect for record-keeping, accounting, and payment confirmation.</p>
        </div>
        <div className=' px-16' >
          <img className='w-[600px] h-[400px]' src={receipts} alt="" />
        </div>
      </div>

      <div className='flex flex-col md:flex-row-reverse md:px-16 md:mt-8'>
        <div className='flex flex-col justify-center px-16' >
          <h2 className='font-bold text-4xl my-4' >Client Database</h2>
          <p className='text-[#656b7d] text-xl font-semibold my-4'>Your client profiles are at your fingertips with Invoice Maker.</p>
          <p className='text-[#656b7d] text-xl font-semibold my-4'>Track payment statuses and lifetime earnings broken down by customer and autofill their details each time you send a new document.</p>
        </div>
        <div className=' px-16' >
          <img className='w-[600px] h-[400px]' src={clients} alt="" />
        </div>
      </div>

      <div className='flex flex-col md:flex-row md:px-16 md:mt-8'>
        <div className='flex flex-col justify-center px-16' >
          <h2 className='font-bold text-4xl my-4' >Taxes & Discounts</h2>
          <p className='text-[#656b7d] text-xl font-semibold my-4'>Apply special fees with ease. Add taxes, discounts, and fees as a percentage or flat rate. Don’t worry — we’ll do the math for you.</p>
        </div>
        <div className=' px-16' >
          <img className='w-[600px] h-[400px]' src={taxes} alt="" />
        </div>
      </div>

    </div>
  )
}

export default HomePage