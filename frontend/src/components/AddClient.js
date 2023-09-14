import React, {Fragment, useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createClient, updateClient } from '../actions/clientActions';
import { useLocation } from 'react-router-dom';
import {toast} from "react-toastify";

const AddClient = ({isVisible, onClose, currentId, setCurrentId}) => {

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const dispatch = useDispatch();
    const location = useLocation();
    const client = useSelector((state) => currentId ? state.clientList.clients.find((c) => c._id === currentId) : null)
    const [ clientData, setClientData ] = useState({ name: '', email: '', phone: '', address: '', userId: [userInfo?._id] });

    useEffect(() => {
        if (client) {
            setClientData(client)
        }
    }, [client])

    // useEffect(() => {
    //     var checkId = userInfo?._id
    //     if (checkId !== undefined) {
    //         setClientData({ ...clientData, userId: [checkId] })
    //     }
    // },[location])

    if(!isVisible)
        return null;
    
    const handleSubmit = () => {
        // setClientData({ ...clientData, userId: [userInfo?._id] })
        if(!clientData.name || !clientData.email || !clientData.phone || !clientData.address){
            toast.error("Fill all Necessary Fields", {
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
        if (currentId) {
            dispatch(updateClient(currentId, clientData))
        } else {
            dispatch(createClient(clientData))
        }
        clear();
        onClose();
    }

    const clear = () => {
        setCurrentId(null)
        setClientData({ name: '', email: '', phone: '', address: '', userId: [userInfo?._id]})
    }

    const handleClose = (e) => {
        if(e.target.id === "wrapper"){
            onClose();
            clear();
        }
    }

  return (
    <Fragment>
        <div className='fixed inset-0 z-50 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'
            id="wrapper" onMouseDown={handleClose}>
            <div className='bg-white rounded-lg flex flex-col gap-4 p-4 px-6'>
                <h2 className='font-bold text-2xl text-center'> New Customer </h2>
                <hr className='my-2' />

                <input className='bg-gray-100 rounded-lg p-2 px-4 border-2 border-gray-300 w-80' value={clientData.name} onChange={(e) => setClientData({...clientData, name: e.target.value})} type="text" placeholder='Name *' />
                <input className='bg-gray-100 rounded-lg p-2 px-4 border-2 border-gray-300 w-80' value={clientData.email} onChange={(e) => setClientData({...clientData, email: e.target.value})} type="email" placeholder='Email *' />
                <input className='bg-gray-100 rounded-lg p-2 px-4 border-2 border-gray-300 w-80' value={clientData.phone} onChange={(e) => setClientData({...clientData, phone: e.target.value})} type="number" placeholder='Mobile Number *' />
                <input className='bg-gray-100 rounded-lg p-2 px-4 border-2 border-gray-300 w-80' value={clientData.address} onChange={(e) => setClientData({...clientData, address: e.target.value})} type="text" placeholder='Address *' />
                <button className='bg-indigo-500 hover:bg-indigo-600 font-bold  focus:outline-none text-sm
                  text-white py-2.5 px-5 text-center rounded-lg w-fit mx-auto' 
                    onClick={
                        handleSubmit}>
                    Save Customer
                </button>
            </div>
          </div>
    </Fragment>
  )
}

export default AddClient