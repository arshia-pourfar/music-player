import React, { useEffect, useState } from 'react';
import MusicList from '../MusicList';
import useFetchData from '../../hooks/useFetchData';
import { useAuth } from '../../hooks/AuthContext';

const TrendingList = ({ onPlay, currentPlaying }) => {
    const [height, setHeight] = useState(0);
    const { user } = useAuth();

    const {
        data: trendingList,
        loading: trendingLoading,
        error: trendingError,
    } = useFetchData('/api/trendinglist', 'GET', null, true);

    useEffect(() => {
        setHeight(window.innerHeight);
    }, []);

    const dynamicHeight =
        height >= 1000
            ? 'max-h-[55vh]'
            : height >= 800
                ? 'max-h-[45vh]'
                : 'max-h-[41vh]';

    if (trendingLoading) {
        return (
            <div className="h-screen w-full flex flex-col justify-center items-center bg-custom-white">
                <div className="loader"></div>
                <div className="text-2xl font-bold mt-2">Loading ...</div>
            </div>
        );
    }

    if (trendingError) {
        return <div>Error: {trendingError?.message}</div>;
    }

    return (
        <section className="h-screen w-full bg-custom-white flex flex-col overflow-hidden">
            {/* هدر بالا */}
            <div className="px-2 shrink-0">
                <div className="flex justify-between items-center mb-2">
                    <h1 className="font-semibold xl:text-3xl md:text-2xl text-lg text-custom-black">
                        Trending
                    </h1>
                    <button
                        href="#"
                        className="underline text-custom-blue xl:text-base lg:text-sm text-xs hover:text-blue-600 transition-colors"
                    >
                        See all
                    </button>
                </div>
            </div>

            {/* لیست با اسکرول داخلی واقعی */}
            <div className={`flex-1 overflow-y-auto px-2 scrollbar-custom ${dynamicHeight}`}>
                <MusicList
                    myListArray={Array.isArray(trendingList) ? trendingList : []}
                    isShowAlbumAndTime={false}
                    userId={user?.id}
                    onPlay={onPlay}
                    currentPlaying={currentPlaying}
                />
            </div>
        </section>
    );
};

export default TrendingList;
