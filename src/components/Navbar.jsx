import React, { useState, useEffect } from 'react'
import { menuIcon, closeIcon } from '../icons/icons';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const [openNav, setOpenNav] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    const navigate = useNavigate();
    

    const buttonsFree = [
        {name:'Register', to: '/register'},
        {name:'Login', to: '/login'},
        {name:'About', to: '/about'},
    ];

    const buttonsAccount = [
        {name:'My Polls', to: '/user'},
        {name:'Logout', to: '/login'},
        {name:'About', to: '/about'},
    ];

    const verifyLogin = () => {
        const checkToken = localStorage.getItem('token');
        if(checkToken) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    };

    const openNavFunction = () => {
        document.body.style.overflow = "hidden"
        setOpenNav(true);
    }

    const closeNavFunction = () => {
        setOpenNav(false);
        document.body.style.overflow = "scroll"
    }

    useEffect(() => {
        verifyLogin();
    }, []);

  return (
    <div className='w-full h-auto fixed top-0 left-0'>
        {/* GREEN NAVBAR */}
        <div className='w-full h-[70px] sm:h-[60px] bg-teal-500 flex flex-col justify-center absolute items-center sm:justify-center shadow-md z-10'>
            <div className='w-full h-full flex items-center relative sm:justify-between'>
                {/* SITE NAME */}
                <div className='w-full h-full sm:w-auto sm:pl-10 flex items-center justify-center'>
                    <h1 className='font-bold text-white text-4xl sm:text-4xl'>SiteName</h1>
                </div>
                {/* HAMBUGER MENU BUTTONS */}
                <div className='text-2xl flex items-center sm:hidden absolute right-5'>
                    {!openNav ? (
                        <button onClick={openNavFunction}>{menuIcon}</button>
                    ) : (
                        <button onClick={closeNavFunction}>{closeIcon}</button>
                    )}
                </div>
                {/* NAV BUTTONS BIG SCREEN */}
                <div className='hidden sm:w-auto sm:h-auto sm:flex pr-10 text-2xl text-white font-bold'>
                    {loggedIn ? (
                        buttonsAccount.map((singleButton) => (
                            <div className='w-auto h-auto pl-7'>
                                <button type='button' onClick={() => navigate(`${singleButton.to}`)}>{singleButton.name}</button>
                            </div>
                        ))
                    ):(
                        buttonsFree.map((singleButton) => (
                            <div>
                                <button type='button' onCLick={() => navigate(`${singleButton.to}`)}>{singleButton.name}</button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
        {/* BLACKOUT DIV */}
        <div onClick={closeNavFunction} className={`bg-black opacity-70 fixed w-screen h-screen z-[-2] ${!openNav && 'opacity-0'} duration-300`}></div>
        {/* NAV BUTTONS SMALL SCREEN */}
            <div className={`w-full h-auto bg-slate-200 sm:hidden absolute ${!openNav ? '-top-[200px]' : 'top-[70px]'} duration-300 ease-out z-0`}> 
                {loggedIn ? (
                buttonsAccount.map((singleButton) => (
                    <div className='w-auto h-auto p-3 pl-5 text-xl font-bold text-gray-600'>
                        <button type='button' onClick={() => navigate(`${singleButton.to}`)}>{singleButton.name}</button>
                    </div>
                ))
            ):(
                buttonsFree.map((singleButton) => (
                    <div className='w-auto h-auto p-3 pl-5 text-xl font-bold text-gray-600'>
                        <button type='button' onCLick={() => navigate(`${singleButton.to}`)}>{singleButton.name}</button>
                    </div>
                ))
            )}
            </div>
            
    </div>
  )
};