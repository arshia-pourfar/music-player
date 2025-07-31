import React, { useEffect } from "react";
import MusicPlayer from '../components/MusicPLayer';
import Header from '../components/Header';
import useFetchData from "../hooks/useFetchData";
import { useAuth } from "../hooks/AuthContext";
import MusicList from "../components/MusicList";
import useWindowDimensions from '../hooks/useWidthSize';

const Favourite = () => {
    const { user } = useAuth();
    const { width } = useWindowDimensions();

    const { data, loading, setUrl, setMethod, method, fetchData } = useFetchData(`/api/${user ? user.id : 0}/favoriteslist`, 'GET', null, true);

    useEffect(() => {
        if (user) {
            setMethod('GET');
            console.log(method);
            setUrl(`/api/${user ? user.id : 0}/favoriteslist`);
            fetchData();
        }
    }, [user, setUrl, fetchData, setMethod]);

    if (loading) {
        return (
            <div className='custom-h-full w-[100vw] flex flex-col justify-center items-center rounded-l-xl bg-custom-white'>
                <div className='loader'></div>
                <div className='text-2xl font-bold mt-2'>
                    Loading ...
                </div>
            </div>
        );
    }

    return (
        <section id='favourite-page' className='relative w-full 2xl:max-w-[100vw] lg:max-w-[95vw] bg-custom-white custom-h-full min-h-[650px] flex flex-col lg:items-normal items-center lg:rounded-l-xl md:pt-5 lg:px-10'>
            <div className='lg:container w-full lg:px-0 px-2'>
                <Header />
                <div className='overflow-auto w-full h-full py-6 scrollbar-custom'>
                    {(() => {
                        if (!Array.isArray(data) || data.length === 0 || data === null) {
                            return (
                                <div className="text-center mt-20">
                                    <img className="w-[170px] m-auto animate-bounce" src='/images/playlist.png' alt="" />
                                    <h2 className="font-black text-4xl ms-3 text-custom-black">No Songs Available</h2>
                                    <h5 className="text-lg text-gray-500 mt-2">Your Favorites List Is Empty</h5>
                                    <a href="./AllMusic" className="text-2xl flex items-center justify-center font-extrabold text-custom-black mt-12 animate-pulse">
                                        <i className="fi fi-ss-heart flex text-custom-pink"></i>
                                        <span className="mx-2">Add Favourite</span>
                                        <i className="fi fi-br-arrow-right flex mt-1"></i>
                                    </a>
                                </div>
                            )
                        } else {
                            return (
                                <MusicList myListArray={data ? data : []} userId={user ? user.id : 0} isShowAlbumAndTime={width >= 768 ? true : false} />
                            );
                        }
                    })()}
                </div>
                <MusicPlayer getStyle='bottom' />
            </div>
        </section >
    );
}

export default Favourite;
