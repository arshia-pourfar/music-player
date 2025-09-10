import { useState } from 'react';
import { notificationList } from '../data/tracks';
import { useLocation } from 'react-router-dom';

const SearchBox = ({ widthSize, titleText }) => {
    const [isClickIcon, setIsClickIcon] = useState(false);
    const location = useLocation();
    const pathname = location.pathname;

    const getPageName = (path) => {
        if (path === "/") return "Home";
        const name = path.slice(1).replace(/-/g, " ");
        return name.charAt(0).toUpperCase() + name.slice(1);
    };

    const pageName = getPageName(pathname);

    const handleIconClick = () => setIsClickIcon(!isClickIcon);

    const renderBellIcon = () => {
        const baseClass = 'fi md:text-2xl text-2xl flex items-center cursor-pointer';
        if (notificationList.length === 0) {
            return isClickIcon
                ? <i className={`${baseClass} fi-ss-bell`} onClick={handleIconClick}></i>
                : <i className={`${baseClass} fi-rs-bell`} onClick={handleIconClick}></i>;
        } else {
            return isClickIcon
                ? <i className={`${baseClass} fi-ss-bell-notification-social-media`} onClick={handleIconClick}></i>
                : <i className={`${baseClass} fi-rs-bell-notification-social-media`} onClick={handleIconClick}></i>;
        }
    };

    const renderNotifications = () => {
        if (notificationList.length === 0) {
            return (
                <div className='h-full flex items-center justify-center'>
                    <h1 className='text-2xl font-extrabold'>Not Found!</h1>
                </div>
            );
        }
        return notificationList.map(item => (
            <div key={item.id} className='relative flex z-20 p-2 border-b gap-3'>
                <img className='w-[65px] rounded-md' src={item.imageSrc} alt={item.title} />
                <div className='flex flex-col justify-center'>
                    <h2 className='text-lg font-semibold'>{item.title}</h2>
                    <span className='text-sm text-gray-400'>{item.subTitle}</span>
                </div>
            </div>
        ));
    };

    return (
        <div className='flex justify-between items-center lg:px-0 px-2 w-full'>
            <h1 className='font-black block lg:text-5xl text-2xl'>{pageName}</h1>

            {/* Overlay برای بستن notification */}
            {isClickIcon && (
                <div
                    className='fixed inset-0 z-[990] bg-transparent'
                    onClick={() => setIsClickIcon(false)}
                ></div>
            )}

            <div className={`flex items-center justify-end z-50 w-full lg:basis-1/2`}>
                {/* Notification Bell */}
                <div className='relative me-5'>
                    {renderBellIcon()}
                    {isClickIcon && (
                        <>
                            <span className='absolute border-l-2 border-t-2 top-[34px] left-0 w-5 h-5 rotate-45 bg-custom-white z-10'></span>
                            <div className='absolute top-11 -left-8 w-[400px] h-[350px] flex flex-col overflow-auto border-2 bg-custom-white shadow-xl rounded-lg'>
                                {renderNotifications()}
                            </div>
                        </>
                    )}
                </div>

                {/* Search Input */}
                <form className='search-box relative flex lg:justify-normal justify-end lg:w-[95%] md:w-[65%] w-2/3' action='#'>
                    <div className='flex w-full bg-custom-white rounded-lg shadow-md border'>
                        <label htmlFor="search-music" className='flex items-center justify-center'>
                            <i className='fi fi-rs-search lg:px-3 lg:py-2 sm:p-2 px-2 p-1 mt-1 text-base'></i>
                        </label>
                        <input
                            type="text"
                            className='lg:w-11/12 w-full bg-custom-white outline-none text-base'
                            id='search-music'
                            placeholder='Search'
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SearchBox;
