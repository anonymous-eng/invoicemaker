import React, {Fragment, useState} from 'react'
import { NavLink, useLocation } from "react-router-dom";
import { Fab, Action } from 'react-tiny-fab';
import AddClient from './AddClient';

const Container = ({children}) => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  return (
    <Fragment>
    <div className="flex h-full">
        <div className='nav-link h-screen hidden md:flex md:flex-col pt-[30px] px-5 gap-3 w-[18%]'>  
                <NavLink to="/dashboard">
                    <div className='shadow-2xl flex p-4 bg-white rounded-lg hover:bg-blue-100 transform transition-all hover:scale-110'>
                        <div>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.6927 9.0978L17.9022 5.3073C17.7048 5.1113 17.4381 5.0007 17.1602 5H9.05C8.4704 5 8 5.4704 8 6.05V20.75C8 21.3296 8.4704 21.8 9.05 21.8H20.7924C21.6927 21.8 22 21.3645 22 20.75V9.8398C22.0007 9.5612 21.8901 9.2945 21.6927 9.0978Z" fill="#10F0A6"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M14.5949 4L12.9022 2.3073C12.7048 2.1113 12.4381 2.0007 12.1602 2H4.05C3.4704 2 3 2.4704 3 3.05V17.75C3 18.3296 3.4704 18.8 4.05 18.8H7V6.05C7 4.91812 7.91812 4 9.05 4H14.5949Z" fill="#0EC78A"></path><path id="invoice-dollar-sign" d="M15.3757 14.7281L13.0167 13.8461C12.3573 13.5318 11.9562 12.8472 12.0038 12.1185C11.9975 11.2015 12.6926 10.4308 13.6061 10.344C13.6915 10.3307 13.7538 10.2572 13.7538 10.1711V9.7C13.7538 9.3136 14.0674 9 14.4538 9C14.8402 9 15.1538 9.3136 15.1538 9.7V10.1375C15.1538 10.2341 15.2322 10.3125 15.3288 10.3125H16.2038C16.5902 10.3125 16.9038 10.6261 16.9038 11.0125C16.9038 11.3989 16.5902 11.7125 16.2038 11.7125H14.0163C13.4038 11.7125 13.4038 12.0177 13.4038 12.1185C13.3926 12.2725 13.4381 12.4244 13.5319 12.5469L15.8909 13.4289C16.5517 13.7439 16.9528 14.4299 16.9038 15.16C16.908 16.0763 16.2136 16.8442 15.3015 16.931C15.2161 16.9443 15.1538 17.0178 15.1538 17.1039V17.575C15.1538 17.9614 14.8402 18.275 14.4538 18.275C14.0674 18.275 13.7538 17.9614 13.7538 17.575V17.1375C13.7538 17.0409 13.6754 16.9625 13.5788 16.9625H12.7038C12.3174 16.9625 12.0038 16.6489 12.0038 16.2625C12.0038 15.8761 12.3174 15.5625 12.7038 15.5625H14.8913C15.5038 15.5625 15.5038 15.2573 15.5038 15.1565C15.515 15.0025 15.4695 14.8506 15.3757 14.7281Z" fill="white"></path></svg>
                        </div>
                        <div className='w-fit pl-3 pr-10 tracking-wider font-bold'>DashBoard</div>
                    </div>
                </NavLink>
                
                <NavLink to="/create">
                    <div className='shadow-2xl flex p-[16px] bg-white rounded-lg hover:bg-blue-100 transform transition-all hover:scale-110'>
                        <div>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 9H19V19.5C19 20.3284 18.3284 21 17.5 21H6.5C5.67157 21 5 20.3284 5 19.5V9Z" fill="#C34BFF"></path><path d="M5 8H19V4.5C19 3.67157 18.3284 3 17.5 3H6.5C5.67157 3 5 3.67157 5 4.5V8Z" fill="#7D01BA"></path><rect x="7" y="11" width="4" height="3" rx="1" fill="#EBC2FF"></rect><rect x="7" y="15" width="4" height="3" rx="1" fill="#EBC2FF"></rect><rect x="13" y="11" width="4" height="3" rx="1" fill="#EBC2FF"></rect><rect x="13" y="15" width="4" height="3" rx="1" fill="#EBC2FF"></rect></svg>
                        </div>
                        <div className='pl-3 tracking-wider pr-10 font-bold'>Create</div>
                    </div>
                </NavLink>

                <NavLink to="/invoices">
                    <div className='shadow-2xl flex p-[16px] bg-white rounded-lg hover:bg-blue-100 transform transition-all hover:scale-110'>
                        <div>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.498 3.44a.763.763 0 0 0-.832.167l-.465.473a.206.206 0 0 1-.275 0l-.847-.854a.763.763 0 0 0-1.083 0l-.847.854a.206.206 0 0 1-.275 0l-.847-.854a.764.764 0 0 0-1.083 0l-.847.854a.206.206 0 0 1-.275 0l-.847-.854a.763.763 0 0 0-1.083 0l-.847.854a.206.206 0 0 1-.275 0l-.465-.473A.763.763 0 0 0 6 4.15V19.85a.763.763 0 0 0 1.305.542l.465-.473a.206.206 0 0 1 .275 0l.847.854a.763.763 0 0 0 1.083 0l.847-.854a.206.206 0 0 1 .275 0l.847.854a.762.762 0 0 0 1.083 0l.847-.854a.206.206 0 0 1 .275 0l.847.854a.762.762 0 0 0 1.083 0l.847-.854a.206.206 0 0 1 .275 0l.465.473a.763.763 0 0 0 1.305-.542V4.15a.763.763 0 0 0-.473-.71ZM16.3 13.334h-.763a.572.572 0 1 1 0-1.144h.763a.572.572 0 1 1 0 1.144Zm.573 2.48a.58.58 0 0 1-.573.572h-.763a.572.572 0 1 1 0-1.144h.763a.58.58 0 0 1 .573.572Zm-.573-5.532h-.763a.572.572 0 1 1 0-1.144h.763a.572.572 0 1 1 0 1.144Zm-7.63 3.052a.572.572 0 0 1 0-1.144h3.815a.572.572 0 1 1 0 1.144H8.67Zm2.862 2.48a.58.58 0 0 1-.572.572H8.67a.572.572 0 0 1 0-1.144h2.29a.58.58 0 0 1 .572.572ZM8.098 9.711a.58.58 0 0 1 .572-.572h3.053a.572.572 0 0 1 0 1.144H8.67a.58.58 0 0 1-.572-.572Z" fill="#00834E"></path><rect x="7" y="11" width="4" height="3" rx="1" fill="#EBC2FF"></rect><rect x="7" y="15" width="4" height="3" rx="1" fill="#EBC2FF"></rect><rect x="13" y="11" width="4" height="3" rx="1" fill="#EBC2FF"></rect><rect x="13" y="15" width="4" height="3" rx="1" fill="#EBC2FF"></rect></svg>
                        </div>
                        <div className='pl-3 pr-10 tracking-wider font-bold'>Invoices</div>
                    </div>
                </NavLink>

                <NavLink to="/customers">
                    <div className='shadow-2xl flex p-[16px] bg-white rounded-lg hover:bg-blue-100 transform transition-all hover:scale-110'>
                        <div>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="#1A4D98" fill-rule="evenodd" d="M9 13.4a6.006 6.006 0 00-6 6c0 .22.18.4.4.4h11.2a.4.4 0 00.4-.4 6.006 6.006 0 00-6-6zm0-8A3.8 3.8 0 119 13a3.8 3.8 0 010-7.6z" clip-rule="evenodd"></path><path fill="#3299FE" fill-rule="evenodd" d="M13.665 11.002L13.8 11a6.006 6.006 0 016 6 .4.4 0 01-.4.4h-3.483a7.225 7.225 0 00-3.65-4.415 5.01 5.01 0 001.399-1.983zm.136-.402a5.002 5.002 0 00-3.04-6.081A3.8 3.8 0 1113.8 10.6zm-3.605-5.008a3.802 3.802 0 012.408 4.816 3.802 3.802 0 00-2.408-4.816zm2.03 5.618zM9.002 13.4c.719.001 1.409.128 2.048.361a6.009 6.009 0 00-2.048-.361z" clip-rule="evenodd"></path><rect x="7" y="11" width="4" height="3" rx="1" fill="#EBC2FF"></rect><rect x="7" y="15" width="4" height="3" rx="1" fill="#EBC2FF"></rect><rect x="13" y="11" width="4" height="3" rx="1" fill="#EBC2FF"></rect><rect x="13" y="15" width="4" height="3" rx="1" fill="#EBC2FF"></rect></svg>
                        </div>
                        <div className='pl-3 pr-10 tracking-wider font-bold'>Customers</div>
                    </div>
                </NavLink>
                
                <Fab
                 style={{bottom: 15, left: 25}}
                 mainButtonStyles={{backgroundColor: '#0F959C'}}
                 icon={<svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="Edit / Add_Plus">
                    <path id="Vector" d="M6 12H12M12 12H18M12 12V18M12 12V6" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </g>
                    </svg>}
                 alwaysShowTitle={true}
                >
                    {location.pathname !== '/create' && (
                        <Action
                            text="New Invoice"
                            onClick={() => window.location.href='/create'}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20.1498 7.93997L8.27978 19.81C7.21978 20.88 4.04977 21.3699 3.32977 20.6599C2.60977 19.9499 3.11978 16.78 4.17978 15.71L16.0498 3.84C16.5979 3.31801 17.3283 3.03097 18.0851 3.04019C18.842 3.04942 19.5652 3.35418 20.1004 3.88938C20.6356 4.42457 20.9403 5.14781 20.9496 5.90463C20.9588 6.66146 20.6718 7.39189 20.1498 7.93997V7.93997Z" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                        </Action>
                    )}
                    <Action
                        text="New Customer"
                        onClick={() => setOpen((prev) => !prev)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" width="24" height="24" viewBox="0 0 24 24"><path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                    </Action>
                </Fab>
        </div>
        <div className=' w-full md:w-[82%]'>
            {children}
        </div>
    </div>
    <AddClient isVisible={open} onClose={() => setOpen(false)}  currentId={currentId} setCurrentId={setCurrentId} />
    </Fragment>
  )
}

export default Container