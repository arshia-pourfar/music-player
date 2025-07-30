import React, { useRef } from 'react';
import Slider from "react-slick";
import Header from '../components/Header';
import { bestAlbum } from '../data/tracks';
import MusicPlayer from '../components/MusicPLayer';
import useFetchData from '../hooks/useFetchData';
import { useAuth } from '../hooks/AuthContext';
import MusicList from '../components/MusicList';
import useWindowDimensions from '../hooks/useWidthSize';

const AllMusic = () => {
    const { data: allMusicList, loading: allMusicLoading, error: allMusicError } = useFetchData('/api/allmusiclist', 'GET', null, true);
    const { width } = useWindowDimensions();
    const sliderRef = useRef(null);
    const { user } = useAuth();

    const settings = {
        rtl: false,
        infinite: false,
        speed: 1000,
        slidesToShow: width >= 1536 ? 8 : width >= 1024 ? 7 : width >= 640 ? 4 : 3,
        slidesToScroll: 2,
        arrows: false,
        vertical: false,
    };

    if (allMusicLoading) {
        return (
            <div className='h-screen w-full flex flex-col justify-center items-center bg-custom-white'>
                <div className='loader'></div>
                <div className='text-2xl font-bold mt-2'>Loading ...</div>
            </div>
        );
    }

    if (allMusicError) {
        return <div>Error: {allMusicError?.message}</div>;
    }

    return (
        <section id='all-music-page' className='relative w-full h-screen bg-custom-white flex flex-col overflow-hidden'>
            {/* هدر و اسلایدر بالا */}
            <div className='lg:px-10 px-2 pt-5'>
                <Header />
                <div className='mt-4'>
                    <div className='flex justify-between items-center'>
                        <h3 className='text-lg font-semibold'>
                            {width >= 768 ? 'Best Albums Of All Times' : 'Best Albums'}
                        </h3>
                        <div className='control flex'>
                            <div className='rounded-full p-[10px] bg-custom-black text-custom-white cursor-pointer mx-2' onClick={() => sliderRef.current.slickPrev()}>
                                <i className='fi fi-br-angle-left text-2xl'></i>
                            </div>
                            <div className='rounded-full p-[10px] bg-custom-black text-custom-white cursor-pointer' onClick={() => sliderRef.current.slickNext()}>
                                <i className='fi fi-br-angle-right text-2xl'></i>
                            </div>
                        </div>
                    </div>
                    <div className='mt-2 w-full overflow-hidden pb-5'>
                        <Slider {...settings} className='cursor-grab' ref={sliderRef}>
                            {bestAlbum.map(item => (
                                <img key={item.id} className='cursor-pointer rounded-lg shadow-lg' src={item.imageSrc} alt={item.title} />
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>

            {/* لیست موزیک با اسکرول داخلی */}
            <div className='flex-1 overflow-y-auto px-2 lg:px-10 scrollbar-custom'>
                <h3 className="text-lg font-semibold block md:hidden mt-2">All Music</h3>
                <MusicList
                    myListArray={allMusicList}
                    userId={user ? user.id : 0}
                    isShowAlbumAndTime={width >= 768}
                />
            </div>

            {/* موزیک پلیر ثابت پایین صفحه */}
            <div className='absolute bottom-0 left-0 w-full z-40'>
                <MusicPlayer getStyle={width >= 768 ? 'bottom' : 'full'} />
            </div>
        </section>
    );
};

export default AllMusic;