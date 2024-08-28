import React from "react";
import FavoriteIcon from '../components/FavoriteIcon';
import MenuIcon from '../components/MenuIcon';
import useWindowDimensions from '../hooks/useWidthSize';

const MusicList = ({ myListArray, userId, isShowAlbumAndTime }) => {
    const { height } = useWindowDimensions();
    console.log(myListArray);

    return (
        isShowAlbumAndTime ? (
            // <div className='2xl:h-[54dvh] xl:h-[63dvh] flex'>
            <div className='music-list min-h-[200px] w-full overflow-auto scrollbar-custom pb-5'>
                <div className='w-full flex items-center justify-between text-lg pb-2 shadow-sm text-opacity-50 capitalize font-semibold text-custom-black bg-custom-white cursor-pointer sticky -top-1 z-30'>
                    <div className='w-2/6 flex items-center gap-5 border-l-4 border-transparent'>
                        <span className='w-[10px] ms-2'>#</span>
                        <h2 className='xl:ms-[70px] 2xl:ms-[75px]'>Title</h2>
                    </div>
                    <div className='w-1/6 text-left'>Album</div>
                    <div className='w-1/6 text-right'>Time</div>
                    <div className='w-2/6 flex items-center justify-end details-icon pe-28'>
                        Playing
                    </div>
                </div>
                {myListArray && Array.isArray(myListArray) ? myListArray.map((item, index) => (
                    <div id={index} key={index} className='music-item w-full flex items-center justify-between py-[10px] text-custom-black cursor-pointer'>
                        <div id={index} className='flex items-center border-l-4 border-transparent play-music'>
                            <span className='w-5 text-center xl:text-lg lg:text-base md:text-lg font-semibold opacity-50 ms-2'> {index < 9 ? `0${index + 1}` : index + 1}</span>
                            <img className='lg:w-[65px] md:w-[70px] xl:mx-5 lg:mx-3 md:mx-4 shadow-lg rounded-md' src={`./images/${item.imageSrc}`} alt="" />
                            <div className='capitalize w-[200px]'>
                                <h2 className='font-bold xl:text-xl lg:text-xl md:text-xl line-clamp-1'>{item.musicName}</h2>
                                <span className='text-custom-gray xl:text-[15px] lg:text-base md:text-lg line-clamp-1'>{item.artistName}</span>
                            </div>
                        </div>

                        <div id={index} className='w-1/6 text-center font-semibold text-md play-music'>{item.musicName}</div>
                        <div id={index} className='w-1/6 text-right font-semibold text-sm play-music'>
                            {item.musicTime}
                        </div>

                        <div className='xl:w-2/5 lg:w-1/5 relative flex items-center justify-end'>
                            <span className='text-custom-gray lg:text-sm md:text-base md:inline-block hidden font-semibold'>{item.viewNumber}</span>
                            <FavoriteIcon userId={userId} songId={item.id} />
                            <MenuIcon />
                        </div>
                    </div>
                )) : null}
            </div>
            // </div>
        ) : (
            <div className='music-list min-h-[200px] w-full overflow-auto scrollbar-custom' style={height >= 1000 ? { height: 'calc(100% - 10px)' } : height >= 800 ? { height: 'calc(100% - 55px)' } : { height: 'calc(100% - 120px)' }}>
                {myListArray && Array.isArray(myListArray) ? myListArray.map((item, index) => (
                    <div key={index} className='music-item flex justify-between items-center py-2'>
                        <div id={index} className='flex items-center border-l-4 border-transparent cursor-pointer play-music'>
                            <span className='w-5 text-center xl:text-lg lg:text-base md:text-lg font-semibold opacity-50 ms-2'> {index < 9 ? `0${index + 1}` : index + 1}</span>
                            <img className='lg:w-[65px] md:w-[70px] xl:mx-5 lg:mx-3 md:mx-4 shadow-lg rounded-md' src={`./images/${item.imageSrc}`} alt="" />
                            <div className='capitalize w-[200px]'>
                                <h2 className='font-bold xl:text-xl lg:text-xl md:text-xl line-clamp-1'>{item.musicName}</h2>
                                <span className='text-custom-gray xl:text-[15px] lg:text-base md:text-lg line-clamp-1'>{item.artistName}</span>
                            </div>
                        </div>
                        <div className='xl:w-2/5 lg:w-1/5 relative flex items-center justify-end'>
                            <span className='text-custom-gray lg:text-sm md:text-base md:inline-block hidden font-semibold'>{item.viewNumber}</span>
                            <FavoriteIcon userId={userId} songId={item.id} />
                            <MenuIcon />
                        </div>
                    </div>
                )) : null}
            </div >)
    )
}
export default MusicList;