import React, { useState, useEffect, useCallback } from 'react';
import { ReactComponent as Logo } from '../images/logo.svg';
import { NavLink as Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Divide as Hamburger } from 'hamburger-react'
const navItems = [
    { id: 0, itemName: 'Home', sectionName: '', icon: 'fi-rs-home', iconSolid: 'fi-ss-home' },
    { id: 1, itemName: 'AllMusic', sectionName: 'AllMusic', icon: 'fi-rs-music-alt', iconSolid: 'fi-ss-music-alt' },
    { id: 2, itemName: 'Favourite', sectionName: 'Favourite', icon: 'fi-rs-heart', iconSolid: 'fi-ss-heart' },
    { id: 3, itemName: 'PlayList', sectionName: 'PlayList', icon: 'fi-rs-list-music', iconSolid: 'fi-ss-list-music' },
    { id: 4, itemName: 'Download', sectionName: 'Download', icon: 'fi-rs-download', iconSolid: 'fi-ss-download' },
    { id: 5, itemName: 'Setting', sectionName: 'Setting', icon: 'fi-rs-settings', iconSolid: 'fi-ss-settings' },
    // { id: 6, sectionName: 'User', icon: 'fi-rs-circle-user', iconSolid: 'fi-ss-circle-user' },
];

const NavLink = styled(Link)`
    color: #808080;
    text-decoration: none;
    height: 100%;
    cursor: pointer;
    &.active {
        color: #4d4dff;
    }
`;


// const MobileNavMenu = styled.div`
//    background: rgba(255, 255, 255, 0.45);
//    border-radius: 16px;
//    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
//    backdrop-filter: blur(13.2px);
//    -webkit-backdrop-filter: blur(13.2px);
// `;

const Navbar = () => {
    const location = useLocation();
    const [activeIndex, setActiveIndex] = useState(-1);
    const [isClickMenuIcon, setIsClickMenuIcon] = useState(false);
    const updateActiveIndex = useCallback(() => {
        const index = navItems.findIndex(item => '/' + item.sectionName === location.pathname);
        setActiveIndex(index);
    }, [location.pathname]);

    useEffect(() => {
        updateActiveIndex();
    }, [updateActiveIndex]);

    const handleClick = (index) => {
        setActiveIndex(index);
    };

    const RenderNavIcon = () => (
        navItems.map((item, index) => (
            <NavLink
                key={index}
                className={`nav-item lg:flex hidden my-3 text-[22px] justify-center cursor-pointer nth-child-4 nth-child-7 nth-child-8`}
                to={'/' + item.sectionName}
                onClick={() => handleClick(index)}
            >
                <i className={`fi ${activeIndex === index ? item.iconSolid : item.icon} flex text-custom-white`} />

            </NavLink>
        ))
    );
    const RenderNavIconMobile = () => (
        navItems.map((item, index) => (
            <NavLink
                key={index}
                className={`nav-item flex text-3xl justify-start cursor-pointer nth-child-7 rounded-lg`}
                to={'/' + item.sectionName}
                onClick={() => handleClick(index)}
            >
                <span className='flex justify-start items-center p-4 ps-6 w-full text-custom-white'>
                    <i className={`fi ${activeIndex === index ? item.iconSolid : item.icon} flex `} />
                    <span className='flex px-4'>{item.itemName}</span>
                </span>
            </NavLink>
        ))
    );

    return (
        <>
            <nav id='navbar' className='lg:flex hidden flex-col justify-center items-center w-[70px] h-[100dvh] min-h-[650px] relative text-center px-3 z-[1000]'>
                {/* <div className='absolute backdrop-blur-[10px] rounded-xl bg-custom-gray w-[90%] h-[90px] lg:hidden block'></div> */}
                <div className='flex flex-col items-center w-auto me-[1px] z-10'>
                    <Logo className='inline-block absolute top-6' />
                    <RenderNavIcon />
                </div>
            </nav>
            <nav id='navbar-mobile' className='lg:hidden block h-[100dvh] min-h-[650px] w-[40%] absolute text-center z-[999]'>
                {/* <i className={`fi fi-rs-bars-staggered lg:hidden absolute left-10 top-6 text-4xl z-[999] transition-all ${isClickMenuIcon ? 'text-custom-white' : 'text-custom-black'}`} onClick={() => setIsClickMenuIcon(!isClickMenuIcon)}></i> */}
                <div className={`lg:hidden absolute left-7 top-5 text-4xl z-[999] transition-all ${isClickMenuIcon ? 'text-custom-white' : 'text-custom-black'}`} onClick={() => setIsClickMenuIcon(!isClickMenuIcon)}>
                    <Hamburger size={45} duration={0.7} rounded />
                </div>
                <div className={`w-full h-full absolute backdrop-blur-[11px] bg-custom-gray text-center z-10 pt-14 ${isClickMenuIcon ? 'animate-open-navmenu' : 'animate-close-navmenu'}`}>
                    <div className='flex flex-col py-5 px-3 w-full'>
                        {/* <Logo className='inline-block text-4xl absolute top-6' /> */}
                        <RenderNavIconMobile />
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;

// import { useState } from 'react';
// import React from "react";
// import { ReactComponent as Logo } from '../images/logo.svg';

// import { NavLink as Link } from "react-router-dom";
// import styled from "styled-components";

// const navItems = [
//     { id: 0, sectionName: '', isActive: false, icon: 'fi-rs-home', iconSolid: 'fi-ss-home' },
//     { id: 1, sectionName: 'AllMusic', isActive: false, icon: 'fi-rs-music-alt', iconSolid: 'fi-ss-music-alt' },
//     { id: 2, sectionName: 'Favourite', isActive: false, icon: 'fi-rs-heart', iconSolid: 'fi-ss-heart' },
//     { id: 3, sectionName: 'PlayList', isActive: false, icon: 'fi-rs-list-music', iconSolid: 'fi-ss-list-music' },
//     { id: 4, sectionName: 'Download', isActive: false, icon: 'fi-rs-download', iconSolid: 'fi-ss-download' },
//     { id: 5, sectionName: 'User', isActive: false, icon: 'fi-rs-circle-user', iconSolid: 'fi-ss-circle-user' },
//     { id: 6, sectionName: 'Setting', isActive: false, icon: 'fi-rs-settings', iconSolid: 'fi-ss-settings' },
// ];

// export const NavLink = styled(Link)`
//     color: #808080;
//     text-decoration: none;
//     height: 100%;
//     cursor: pointer;
//     &.active {
//         color: #4d4dff;
//     }
// `;

// export const NavMenu = styled.div`
//     display: flex;
//     align-items: center;
//     @media screen and (max-width: 768px) {
//         display: none;
//     }
// `;

// const Navbar = () => {
//     const [iconFont, setIconFont] = useState(navItems);
//     const nextIconFont = iconFont.slice();
//     const locationPage = window.location.pathname;
//     const indexSortPageName = navItems.findIndex(item => '/' + item.sectionName === locationPage);
//     nextIconFont[indexSortPageName].isActive = true;

//     function handleClick() {
//         for (let i = 0; i < navItems.length; i++) {
//             iconFont[i].isActive = false;
//         }
//         setIconFont(nextIconFont);
//         return;
//     }

//     function RenderNavIcon() {
//         return (
//             navItems.map(item => (
//                 <NavLink key={item.id} className='nav-item my-2 text-center cursor-pointer ' to={'/' + item.sectionName} activeStyle onClick={() => handleClick()}>
//                     {(() => {
//                         if (item.isActive) {
//                             return <i className={'fi ' + item.iconSolid + ' text-xl w-[20px] inline-block  text-custom-white'} />;
//                         }
//                         else if (item.isActive === false) {
//                             return <i className={'fi ' + item.icon + ' text-xl w-[20px] inline-block  text-custom-white'} />;
//                         }
//                     })()}
//                 </NavLink>
//             ))
//         );
//     }

//     return (
//          <nav id='navbar' className='lg:w-auto w-full lg:h-[100dvh] lg:min-h-[500px] lg:relative lg:left-0 fixed lg:bottom-0 bottom-10 flex lg:flex-col justify-center items-center text-center px-3 z-[1000]'>
//  <div className='absolute backdrop-blur-[10px] rounded-xl bg-custom-gray w-[90%] h-[90px] lg:hidden block'></div>
//  <div className='lg:flex-col lg:justify-normal lg:w-auto w-[70%] flex justify-between items-center me-[1px] z-10'>
//      <Logo className='lg:inline-block hidden absolute top-6' />
//      <RenderNavIcon />
//  </div>
//  </nav >
//     );
// }

// export default Navbar;