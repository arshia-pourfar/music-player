import { useState } from 'react';
import { notificationList } from '../App';
const SearchBox = ({ widthSize, titleText }) => {
    const [isClickIcon, setIsClickIcon] = useState(false);

    const handleIconClick = () => {
        setIsClickIcon(!isClickIcon);
    };

    const renderBellIcon = () => {
        const baseClass = 'fi lg:text-2xl md:text-4xl flex items-center cursor-pointer';
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
        notificationList.length === 0 ? (
            <div className='h-full flex items-center justify-center'>
                <h1 className='text-2xl font-extrabold'>Not Found!</h1>
            </div>
        ) : (
            notificationList.map(item => (
                <div key={item.id} className='relative flex z-20 p-2 border-b gap-3'>
                    <img className='w-[65px] rounded-md' src={item.imageSrc} alt="" />
                    <div className='flex flex-col justify-center'>
                        <h2 className='text-lg font-semibold'>{item.title}</h2>
                        <span className='text-sm text-gray-400'>{item.subTitle}</span>
                    </div>
                </div>
            ))
        )
    };

    return (
        <div className='flex lg:justify-between justify-end items-center w-full'>
            <h1 className='font-black lg:block hidden lg:text-5xl text-3xl'>{titleText}</h1>
            <div className={isClickIcon ? 'inline w-[100dvw] h-[100dvh] absolute left-0 top-0 z-[990] bg-transparent' : 'hidden'} onClick={() => setIsClickIcon(false)} ></div>
            <div
                id='search-box'
                className={`flex items-center lg:justify-end justify-end z-[980] md:w-full ${widthSize ? 'xl:w-[700px] lg:w-[600px]' : 'xl:w-[600px] lg:w-[500px]'}`}
            >
                <div className='relative me-5'>
                    {renderBellIcon()}
                    <div className={isClickIcon ? 'inline' : 'hidden'}>
                        <span className='absolute border-l-2 border-t-2 top-[34px] left-0 w-5 h-5 rotate-45 bg-custom-white z-10'></span>
                        <div className='absolute top-11 -left-8 w-[400px] h-[350px] flex flex-col flex-nowrap overflow-auto border-2 bg-custom-white shadow-xl rounded-lg'>
                            {renderNotifications()}
                        </div>
                    </div>
                </div>
                <form className='search-box relative flex lg:justify-normal justify-end lg:w-[95%] w-[65%]' action='#'>
                    <div className='flex w-full bg-custom-white rounded-lg shadow-md border'>
                        <label htmlFor="search-music" className='flex items-center justify-center'>
                            <i className='fi fi-rs-search px-3 py-2 mt-1 text-base'></i>
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


// import { useState } from 'react';
// import { notificationList } from '../App';

// const SearchBox = ({ widthSize }) => {
//     const [isClickIcon, setIsClickIcon] = useState(false);
//     return (
//         <>
//             <div className={isClickIcon ? 'inline w-[100dvw] h-[100dvh] bg-transparent absolute left-0 bottom-0 z-40' : 'hidden'} onClick={() => setIsClickIcon(false)}></div>
//             <div id='search-box' className={widthSize ? 'flex items-center justify-end w-[700px] fixed top-4 right-10 z-50' : 'flex items-center justify-end w-[600px] fixed top-4 right-10 z-40'} >
//                 <div className='relative mx-5'>
//                     {/* <span className='w-[12px] h-[12px] border-2 border-white rounded-full bg-custom-blue inline-block absolute -right-[1px] -top-[2px]'></span> */}
//                     {(() => {
//                         if (isClickIcon && notificationList.length === 0) {
//                             return <i className='fi fi-ss-bell text-[25px] flex items-center cursor-pointer' onClick={() => setIsClickIcon(!isClickIcon)} ></i>;
//                         }
//                         else if (isClickIcon === false && notificationList.length === 0) {
//                             return <i className='fi fi-rs-bell text-[25px] flex items-center cursor-pointer' onClick={() => setIsClickIcon(!isClickIcon)} ></i>;
//                         }
//                         else if (isClickIcon && notificationList.length !== 0) {
//                             return <i className='fi fi-ss-bell-notification-social-media text-[25px] flex items-center cursor-pointer' onClick={() => setIsClickIcon(!isClickIcon)} ></i>;
//                         }
//                         else if (isClickIcon === false && notificationList.length !== 0) {
//                             return <i className='fi fi-rs-bell-notification-social-media text-[25px] flex items-center cursor-pointer' onClick={() => setIsClickIcon(!isClickIcon)} ></i>;
//                         }
//                     })()}
//                     <div className={isClickIcon ? 'inline' : 'hidden'}>
//                         <span className='absolute border-l-2 border-t-2 top-[34px] left-0 w-5 h-5 rotate-45 bg-custom-white z-10'></span>
//                         <div className='absolute top-11 -left-8 w-[400px] h-[350px] flex flex-col flex-nowrap overflow-auto border-2 bg-custom-white shadow-xl rounded-lg'>
//                             {(() => {
//                                 if (notificationList.length === 0) {
//                                     return (
//                                         <div className='h-full flex items-center justify-center'>
//                                             <h1 className='text-2xl font-extrabold'>Not Found !</h1>
//                                         </div>
//                                     );
//                                 } else if (notificationList.length !== 0) {
//                                     return (
//                                         notificationList.map(item => (
//                                             <div key={item.id} className='relative flex z-20 p-2 border-b gap-3'>
//                                                 <img className='w-[65px] rounded-md' src={item.imageSrc} alt="" />
//                                                 <div className='flex flex-col justify-center'>
//                                                     <h2 className='text-lg font-semibold'>{item.title}</h2>
//                                                     <span className='text-sm text-gray-400'>{item.subTitle}</span>
//                                                 </div>
//                                             </div>
//                                         ))
//                                     );
//                                 }
//                             })()}
//                         </div>
//                     </div>
//                 </div>
//                 <form className='search-box relative flex w-[95%] bg-custom-white rounded-lg shadow-md border' action='#'>
//                     <label htmlFor="search-music" className='flex items-center justify-center'>
//                         <i className='fi fi-rs-search px-3 py-1.5 mt-1'></i>
//                     </label>
//                     <input type="text" className=' w-11/12 bg-custom-white outline-none text-[15px] ' id='search-music' placeholder='Search' />
//                 </form>
//             </div >
//         </>
//     )
// }
// export default SearchBox;