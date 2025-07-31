/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useEffect, useState } from 'react';
import useFetchData from '../hooks/useFetchData';

const FavoriteIcon = ({ userId, songId }) => {
    const { data, loading, error, setUrl, setMethod, setBody, fetchData } = useFetchData('', 'POST', null, false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [showLoginPage, setShowLoginPage] = useState(false);

    // fetch وضعیت favorite وقتی userId یا songId تغییر کرد
    useEffect(() => {
        if (!userId || !songId) return;
        setShowLoginPage(userId === 0);
        setUrl(`/api/${userId}/favorites/update`);
        setMethod('GET');
        setBody(null);
        fetchData();
    }, [userId, songId, setUrl, setMethod, setBody, fetchData]);

    // آپدیت isFavorite بر اساس داده‌ی برگشتی
    useEffect(() => {
        if (Array.isArray(data) && songId) {
            setIsFavorite(data.includes(songId));
        }
    }, [data, songId]);

    const handleAddToFavorites = () => {
        if (!userId || userId === 0) {
            setShowLoginPage(true);
            return;
        }
        setUrl(`/api/${userId}/favorites/update`);
        setMethod(isFavorite ? 'DELETE' : 'POST');
        setBody({ songId });
        fetchData();
    };

    return showLoginPage ? (
        <div className="flex justify-center items-center relative xl:text-xl xl:mx-5 lg:text-xl lg:mx-4 md:text-2xl md:mx-5 text-xl mx-3">
            <i
                className={`fi ${isFavorite ? 'fi-ss-heart text-custom-pink' : 'fi-rs-heart hover:text-custom-pink text-custom-black'
                    } flex cursor-pointer icon-favourite drop-shadow-sm ${loading ? 'loading-class' : ''}`}
                title="Add to Favorites"
            />
            <a
                href="/Setting"
                after="Please Login Or Signup"
                className="w-[70px] h-full absolute -left-2 top-0 hover:after:flex after:absolute after:w-[150px] after:rounded-lg after:py-1 after:px-2 after:-top-8 after:right-0 after:content-[attr(after)] after:hidden after:justify-center after:items-center after:text-custom-white after:text-xs after:bg-custom-black"
            />
            {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
        </div>
    ) : (
        <div className="flex justify-center items-center relative xl:text-xl xl:mx-5 lg:text-xl lg:mx-4 md:text-2xl md:mx-5 text-xl mx-3">
            <i
                className={`fi ${isFavorite ? 'fi-ss-heart text-custom-pink' : 'fi-rs-heart hover:text-custom-pink text-custom-black'
                    } flex cursor-pointer icon-favourite drop-shadow-sm ${loading ? 'loading-class' : ''}`}
                onClick={handleAddToFavorites}
                title="Add to Favorites"
            />
            {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
        </div>
    );
};

export default FavoriteIcon;
