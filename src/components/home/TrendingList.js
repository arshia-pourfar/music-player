import React, { useEffect, useState } from 'react';
import MusicList from '../MusicList';

const TrendingList = ({ trendingList, onPlay, currentPlaying, user }) => {
    const [height, setHeight] = useState(window.innerHeight || 0);

    useEffect(() => {
        function updateHeight() {
            setHeight(window.innerHeight);
        }
        window.addEventListener('resize', updateHeight);
        return () => window.removeEventListener('resize', updateHeight);
    }, []);

    // برای سایزهای زیر lg محدودیت ارتفاع
    const dynamicHeight =
        height >= 1000
            ? 'max-h-[55vh]'
            : height >= 800
                ? 'max-h-[45vh]'
                : 'sm:max-h-[41vh]';

    const safeTrendingList = Array.isArray(trendingList) ? trendingList : [];

    return (
        <section className="w-full bg-custom-white flex flex-col overflow-hidden
                            lg:h-screen lg:max-h-screen">
            {/* هدر بالا */}
            <div className="lg:px-2 shrink-0">
                <div className="flex justify-between items-center mb-2">
                    <h1 className="font-semibold xl:text-3xl md:text-2xl text-lg text-custom-black">
                        Trending
                    </h1>
                    <button
                        onClick={() => {
                            // عملکرد لینک "See all"
                        }}
                        className="underline text-custom-blue xl:text-base lg:text-sm text-xs hover:text-blue-600 transition-colors"
                        type="button"
                    >
                        See all
                    </button>
                </div>
            </div>

            {/* لیست با اسکرول داخلی واقعی */}
            <div className={`flex-1 overflow-y-auto lg:px-2 scrollbar-custom max-h-[46vh] ${dynamicHeight} `}>
                <MusicList
                    myListArray={safeTrendingList}
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
