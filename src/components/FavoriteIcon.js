import React, { useEffect, useState } from 'react';
import useFetchData from '../hooks/useFetchData';

const FavoriteIcon = ({ userId, songId }) => {
    const { data, loading, error, setUrl, setMethod, setBody, fetchData } = useFetchData(`/api/${userId}/favorites`, 'POST', null, true);
    const [isFavorite, setIsFavorite] = useState(false);
    const [triggerFetch, setTriggerFetch] = useState(false);
    const [showLoginPage, setShowLoginPage] = useState(false);

    useEffect(() => {
        if (!userId || !songId) return; // اطمینان از مقداردهی صحیح userId و songId
        const fetchFavoriteStatus = async () => {
            setUrl(`/api/${userId}/favorites/update`); // این URL باید به درستی با مسیر سرور شما همخوانی داشته باشد
            setMethod('GET');
            setTriggerFetch(true);
        };

        fetchFavoriteStatus();
    }, [userId, songId, setUrl, setMethod, fetchData]);

    useEffect(() => {
        if (data && Array.isArray(data)) {
            setIsFavorite(data.includes(songId));
        }
    }, [data, songId]);

    const handleAddToFavorites = async () => {
        setUrl(`/api/${userId}/favorites/update`);
        setMethod(isFavorite ? 'DELETE' : 'POST');
        setBody({ songId });
        setTriggerFetch(true);
        setShowLoginPage(false);
    };

    useEffect(() => {
        if (triggerFetch) {
            fetchData();
            setTriggerFetch(false);
        }
    }, [triggerFetch, fetchData]);

    useEffect(() => {
        setShowLoginPage(userId === 0);
    }, [userId]);

    return (
        showLoginPage ? (
            <div className='flex justify-center items-center relative xl:text-xl xl:mx-5 lg:text-xl lg:mx-4 md:text-2xl md:mx-5'>
                <i
                    className={`fi ${isFavorite ? 'fi-ss-heart text-custom-pink' : 'fi-rs-heart hover:text-custom-pink text-custom-black'} flex cursor-pointer icon-favourite drop-shadow-sm ${loading ? 'loading-class' : ''}`}
                    title="Add to Favorites"
                ></i>
                <a href="/Setting" after="Please Login Or Signup" className="w-[70px] h-full absolute -left-2 top-0 hover:after:flex after:absolute after:w-[150px] after:rounded-lg after:py-1 after:px-2 after:-top-8 after:right-0 after:content-[attr(after)] after:hidden after:justify-center after:items-center after:text-custom-white after:text-xs after:bg-custom-black"> </a>
                {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
            </div>
        ) : (
            <div className='flex justify-center items-center relative xl:text-xl xl:mx-5 lg:text-xl lg:mx-4 md:text-2xl md:mx-5'>
                <i
                    className={`fi ${isFavorite ? 'fi-ss-heart text-custom-pink' : 'fi-rs-heart hover:text-custom-pink text-custom-black'} flex cursor-pointer icon-favourite drop-shadow-sm ${loading ? 'loading-class' : ''}`}
                    onClick={handleAddToFavorites}
                    title="Add to Favorites"
                ></i>
                {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
            </div>
        )
    );
};

export default FavoriteIcon;


// import React, { useEffect, useState } from 'react';
// import useFetchData from '../hooks/useFetchData';
// // import LoginOrSingupForm from './LoginForm';

// const FavoriteIcon = ({ userId, songId }) => {
//     const { data, loading, error, setUrl, setMethod, setBody, fetchData } = useFetchData('', 'POST', null, false);
//     const [isFavorite, setIsFavorite] = useState(false);
//     const [triggerFetch, setTriggerFetch] = useState();
//     const [showLoginPage, setShowLoginPage] = useState(false);
//     // console.log(LoginOrSingupForm);

//     useEffect(() => {
//         const fetchFavoriteStatus = async () => {
//             setUrl(`/api/${userId}/favorites/update`);
//             setMethod('GET');
//             setTriggerFetch(true);
//         };

//         fetchFavoriteStatus();
//     }, [userId, songId, setUrl, setMethod, fetchData]);

//     useEffect(() => {
//         if (data && Array.isArray(data)) {
//             setIsFavorite(data.includes(songId));
//         }
//     }, [data, songId]);

//     const handleAddToFavorites = async () => {
//         setUrl(`/api/${userId}/favorites/update`);
//         setMethod(isFavorite ? 'DELETE' : 'POST');
//         setBody({ songId });
//         setTriggerFetch(true);
//         setShowLoginPage(false);
//     };

//     useEffect(() => {
//         if (triggerFetch) {
//             fetchData();
//             setTriggerFetch(false);
//         }
//     }, [triggerFetch, fetchData, data, songId]);
//     useEffect(() => {
//         if (userId === 0) {
//             setShowLoginPage(true)
//         } else {
//             setShowLoginPage(false)

//         }
//     }, [userId]);


//     return (
//         showLoginPage ? (
//             <div className='flex justify-center items-center relative xl:text-xl xl:mx-5 lg:text-xl lg:mx-4 md:text-2xl md:mx-5'>
//                 <i
//                     className={`fi ${isFavorite ? 'fi-ss-heart text-custom-pink' : 'fi-rs-heart hover:text-custom-pink text-custom-black'} flex cursor-pointer icon-favourite drop-shadow-sm ${loading ? 'loading-class' : ''}`}
//                     title="Add to Favorites"
//                 ></i>
//                 <a href="/Setting" after="Please Login Or Singup" className="w-[70px] h-full absolute -left-2 top-0 hover:after:flex after:absolute after:w-[150px] after:rounded-lg after:py-1 after:px-2 after:-top-8 after:right-0 after:content-[attr(after)] after:hidden after:justify-center after:items-center after:text-custom-white after:text-xs after:bg-custom-black"> </a>
//                 {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
//             </div>
//         ) : (
//             <div className='flex justify-center items-center relative xl:text-xl xl:mx-5 lg:text-xl lg:mx-4 md:text-2xl md:mx-5'>
//                 <i
//                     className={`fi ${isFavorite ? 'fi-ss-heart text-custom-pink' : 'fi-rs-heart hover:text-custom-pink text-custom-black'} flex cursor-pointer icon-favourite drop-shadow-sm ${loading ? 'loading-class' : ''}`}
//                     onClick={handleAddToFavorites}
//                     title="Add to Favorites"
//                 ></i>
//                 {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
//             </div>
//         )
//     );
//     // return (
//     //     showLoginPage ? (
//     //         <div className='flex justify-center items-center relative xl:text-xl xl:mx-5 lg:text-lg lg:mx-4 md:mx-3'>
//     //             <LoginOrSingupForm modalStyle />
//     //             <i
//     //                 className={`fi ${isFavorite ? 'fi-ss-heart text-custom-pink' : 'fi-rs-heart hover:text-custom-pink text-custom-black'} flex cursor-pointer icon-favourite drop-shadow-sm ${loading ? 'loading-class' : ''}`}
//     //                 title="Add to Favorites"
//     //             ></i>
//     //             <a href="/User" className='w-[70px] h-full absolute -left-2 top-0'> </a>
//     //             {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
//     //         </div>
//     //     ) : (
//     //         <div className='flex justify-center items-center relative xl:text-xl xl:mx-5 lg:text-lg lg:mx-4 md:mx-3'>
//     //             <i
//     //                 className={`fi ${isFavorite ? 'fi-ss-heart text-custom-pink' : 'fi-rs-heart hover:text-custom-pink text-custom-black'} flex cursor-pointer icon-favourite drop-shadow-sm ${loading ? 'loading-class' : ''}`}
//     //                 onClick={userId !== 0 ? handleAddToFavorites : () => setShowLoginPage(true)}
//     //                 title="Add to Favorites"
//     //             ></i>
//     //             {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
//     //         </div>
//     //     )
//     // );
// };

// export default FavoriteIcon;
