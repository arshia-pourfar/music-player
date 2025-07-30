import React from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
const MenuIcon = () => {
    return (
        <Menu>
            <MenuButton className="font-semibold me-3">
                <i className='fi fi-rs-menu-dots hover:text-custom-pink lg:text-xl md:text-2xl text-xl flex'></i>
            </MenuButton>
            <MenuItems
                transition
                className="absolute z-20 w-56 right-[50px] -top-5 flex flex-col justify-around shadow-md text-custom-white/95 bg-custom-black rounded-xl p-1 text-sm/6 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)]  data-[closed]:scale-95 data-[closed]:opacity-0"
            >
                <div className='absolute -z-10 w-[20px] h-[20px] rounded-sm bg-custom-black -right-2 top-5 rotate-45 shadow-md'></div>
                <MenuItem>
                    <button className="group flex w-full items-center rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                        <i className='fi fi-ss-plus flex me-2'></i>
                        add to playlist
                    </button>
                </MenuItem>
                <MenuItem>
                    <button className="group flex w-full items-center rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                        <i className='fi fi-ss-member-list flex me-2'></i>
                        go to artist
                    </button>
                </MenuItem>
                <div className="my-1 h-px bg-custom-white/20" />
                <MenuItem>
                    <button className="group flex w-full items-center rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                        <i className='fi fi-ss-info flex me-2'></i>
                        song info
                    </button>
                </MenuItem>
                <MenuItem>
                    <button className="group flex w-full items-center rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                        <i className='fi fi-ss-share flex me-2'></i>
                        share
                    </button>
                </MenuItem>

                <MenuItem>
                    <button className="group flex w-full items-center rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                        <i className='fi fi-ss-octagon-exclamation flex me-2'></i>
                        report
                    </button>
                </MenuItem>
            </MenuItems>
        </Menu>
    );
};

export default MenuIcon;
