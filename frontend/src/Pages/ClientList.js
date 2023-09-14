import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import moment from "moment";
import { getClientsByUser } from '../actions/clientActions';
import AddClient from '../components/AddClient';
import { deleteClient } from "../actions/clientActions";
import Skeleton from 'react-loading-skeleton';
import EmptyClient from './EmptyClient';

const ClientList = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clientList = useSelector((state) => state.clientList);
  const { loading, error, clients, success } = clientList; 

  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    if(!userInfo)
      navigate("/");
    else
      dispatch(getClientsByUser({search: userInfo?._id}));
  }, [dispatch, navigate, userInfo, success, error]);

  const handleEdit = (selectedClient) => {
    
    setOpen((prevState) => !prevState)
    setCurrentId(selectedClient)

  }

  const deleteHandler = (selectedClient) => {
    dispatch(deleteClient(selectedClient));
  }

  const [currentPage, setCurrentPage] = useState(1);
  const total = clients?.length;
  const npage = Math.ceil(total/5);
  
  const prePage = () => {
    if(currentPage !== 1){
      setCurrentPage(currentPage-1)
    }
  }

  const nextPage = () => {
    if(currentPage !== npage){
      setCurrentPage(currentPage+1);
    }
  }

  if(clients?.length === 0){
    return <EmptyClient />
  }
 
  return (
    <Fragment>
      {loading && 
            <div className='bg-slate-100  m-4 p-2 shadow-2xl shadow-green-900 rounded-lg '>
              <Skeleton className='rounded-lg mb-2 focus:outline-none border-2 border-dashed h-10' count={10} />
            </div>}
        {clients && <div className='h-screen'><div className='bg-slate-100 m-4 shadow-2xl shadow-green-900 rounded-lg p-4 flex gap-4 flex-col'>  
         <div className='overflow-x-auto '>
          <table>
            <thead className=' bg-[#6DA5C0] text-white border-b-2'>
              <tr>
                <th className='w-[10%] p-3 text-lg font-bold tracking-wide text-center'>Number</th>
                <th className='w-[30%] p-3 text-lg font-bold tracking-wide text-center'>Name</th>
                <th className='w-[30%] p-3 text-lg font-bold tracking-wide text-center'>Email</th>
                <th className='w-[30%] p-3 text-lg font-bold tracking-wide text-center'>Phone</th>
                <th className='w-[5%] p-3 text-lg font-bold tracking-wide text-center'>Edit</th>
                <th className='w-[5%] p-3 text-lg font-bold tracking-wide text-center'>Delete</th>
              </tr>
            </thead>
            <tbody>
                {(clients.slice((currentPage-1)*5, currentPage*5)).map((client, index) => (
                      <tr className='text-blue-500 hover:bg-yellow-200 cursor-pointer [&:nth-child(even)]:bg-gray-100 [&:nth-child(even)]:hover:bg-yellow-200 [&:nth-child(odd)]:text-gray-500 transform transition-all hover:scale-[0.99]' key={client._id}>
                          <td className=' p-3 font-semibold text-center'>{ (currentPage-1)*5+(index+1) }</td>
                          <td className=' p-3 font-semibold text-center'>{ client.name }</td>
                          <td className=' p-3 font-semibold text-center'>{ client.email }</td>
                          <td className=' p-3 font-semibold text-center'>{ client.phone }</td>
                          <td className=' p-3 font-semibold text-center'><button onClick={() => handleEdit(client._id)} className='bg-gray-100 rounded-full p-2'><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M18.3785 8.44975L11.4637 15.3647C11.1845 15.6439 10.8289 15.8342 10.4417 15.9117L7.49994 16.5L8.08829 13.5582C8.16572 13.1711 8.35603 12.8155 8.63522 12.5363L15.5501 5.62132M18.3785 8.44975L19.7927 7.03553C20.1832 6.64501 20.1832 6.01184 19.7927 5.62132L18.3785 4.20711C17.988 3.81658 17.3548 3.81658 16.9643 4.20711L15.5501 5.62132M18.3785 8.44975L15.5501 5.62132" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                  <path d="M5 20H19" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                  </svg></button></td>
                          <td className=' p-3 font-semibold'><button onClick={() => deleteHandler(client._id)} className='bg-red-400 rounded-full p-1'><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        </div>
        <div className='bg-gray-200 mt-2 p-2 flex-wrap '>
            <ul className='flex flex-col sm:flex-row justify-center items-center gap-4'>
              <li className='pagination'>
                  <button className='bg-white hover:bg-green-200 font-bold  focus:outline-none text-sm
                  text-green-500 py-2.5 px-5 text-center rounded-lg w-fit mx-auto' onClick={prePage}>Prev</button>
              </li>
              <li>
                    <div className='bg-white font-bold  focus:outline-none text-sm
                  text-green-500 py-2.5 px-5 text-center rounded-lg w-fit mx-auto'>{currentPage}</div>
              </li>
              <li>
                <button className='bg-white hover:bg-green-200 font-bold  focus:outline-none text-sm
                  text-green-500 py-2.5 px-5 text-center rounded-lg w-fit mx-auto' onClick={nextPage}>Next</button>
              </li>
            </ul>
          </div>
          </div>
          </div>}
      <AddClient isVisible={open} onClose={() => setOpen(false)} currentId={currentId} setCurrentId={setCurrentId}/>
    </Fragment>
  )
}

export default ClientList