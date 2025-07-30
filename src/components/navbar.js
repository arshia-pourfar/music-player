import React, { useState, useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
    { id: 0, sectionName: '', icon: 'fi-rs-home', iconSolid: 'fi-ss-home' },
    { id: 1, sectionName: 'AllMusic', icon: 'fi-rs-music-alt', iconSolid: 'fi-ss-music-alt' },
    { id: 2, sectionName: 'Favourite', icon: 'fi-rs-heart', iconSolid: 'fi-ss-heart' },
    { id: 3, sectionName: 'PlayList', icon: 'fi-rs-list-music', iconSolid: 'fi-ss-list-music' },
    { id: 4, sectionName: 'Download', icon: 'fi-rs-download', iconSolid: 'fi-ss-download' },
    { id: 5, sectionName: 'Setting', icon: 'fi-rs-settings', iconSolid: 'fi-ss-settings' },
];

const Navbar = () => {
    const [activeIndex, setActiveIndex] = useState(-1);

    const updateActiveIndex = useCallback(() => {
        const index = navItems.findIndex(item => '/' + item.sectionName === window.location.pathname);
        setActiveIndex(index);
    }, []);

    useEffect(() => {
        updateActiveIndex();
    }, [updateActiveIndex]);

    const handleClick = (index) => {
        setActiveIndex(index);
    };

    return (
        <nav className="w-[70px] h-screen flex flex-col justify-between items-center px-3 py-6 bg-transparent z-[1000]">
            {/* لوگو */}
            <img src='/images/logo.svg' alt='logo' className="size-7 mb-6" />

            {/* آیکون‌های وسط */}
            <div className="flex flex-col items-center gap-3 flex-grow justify-center">
                {navItems.slice(0, 3).map((item, index) => (
                    <NavLink
                        key={item.id}
                        to={`/${item.sectionName}`}
                        onClick={() => handleClick(index)}
                        className={({ isActive }) =>
                            'text-[22px] cursor-pointer text-custom-white'
                        }
                    >
                        <i className={`fi ${activeIndex === index ? item.iconSolid : item.icon}`} />
                    </NavLink>
                ))}

                {/* خط جداکننده */}
                <div className="w-10 h-[1px] bg-custom-white mb-3" />

                {navItems.slice(3, 5).map((item, index) => (
                    <NavLink
                        key={item.id}
                        to={`/${item.sectionName}`}
                        onClick={() => handleClick(index + 3)}
                        className={({ isActive }) =>
                            'text-[22px] cursor-pointer text-custom-white'
                        }
                    >
                        <i className={`fi ${activeIndex === index + 3 ? item.iconSolid : item.icon}`} />
                    </NavLink>
                ))}
            </div>

            {/* تنظیمات پایین */}
            <NavLink
                to={`/${navItems[5].sectionName}`}
                onClick={() => handleClick(5)}
                className={({ isActive }) =>
                    'text-[22px] cursor-pointer text-custom-white'
                }
            >
                <i className={`fi ${activeIndex === 5 ? navItems[5].iconSolid : navItems[5].icon}`} />
            </NavLink>
        </nav>
    );
};

export default Navbar;
