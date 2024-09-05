import React, { useRef } from 'react';
import Slider from "react-slick";
import SearchBox from '../components/searchBox';
import { bestAlbum } from '../App';
import { MusicPlayer } from '../components/MusicPLayer';
import useFetchData from '../hooks/useFetchData';
import { useAuth } from '../hooks/AuthContext';
import MusicList from '../components/MusicList';
import useWindowDimensions from '../hooks/useWidthSize';

const AllMusic = () => {
    const { data: allMusicList, loading: allMusicLoading, error: allMusicError } = useFetchData('/api/allmusiclist', 'GET', null, true);
    const { width } = useWindowDimensions();
    const sliderRef = useRef(null);
    const { user } = useAuth();

    // const addToFavourite = (indexId) => {
    //     const updatedList = allMusicList.map(item => {
    //         if (item.id === indexId) {
    //             const updatedItem = { ...item, isFavourite: !item.isFavourite };
    //             if (updatedItem.isFavourite) {
    //                 setFavList([...favList, updatedItem]);
    //             } else {
    //                 setFavList(favList.filter(favItem => favItem.id !== indexId));
    //             }
    //             return updatedItem;
    //         }
    //         return item;
    //     });
    //     setFavList(updatedList);
    // };

    const settings = {
        rtl: false,
        infinite: false,
        speed: 1000,
        slidesToShow: 5,
        slidesToScroll: 2,
        arrows: false,
        vertical: false,
    };

    if (width >= 1536) {
        settings.slidesToShow = 8
    } else if (width >= 1024) {
        settings.slidesToShow = 7
    } else if (width >= 640) {
        settings.slidesToShow = 4
    } else {
        settings.slidesToShow = 3
    }

    if (allMusicLoading) {
        return (
            <div className='custom-h-full w-[100vw] flex flex-col justify-center items-center rounded-l-xl bg-custom-white'>
                <div className='loader'></div>
                <div className='text-2xl font-bold mt-2'>
                    Loading ...
                </div>
                {/* <div className='inline-block text-center'>
            <span className='inline-block text-2xl font-bold me-14'>loading</span> 
            <span className='inline-block dot-loader mb-[2px]'> </span>
        </div>*/}
            </div>
        );
    }

    if (allMusicError) {
        return <div>Error: {allMusicError?.message}</div>;
    }
    // if (allMusicLoading || favouriteLoading) {
    //     return <div>Loading...</div>;
    // }

    // if (allMusicError || favouriteError) {
    //     return <div>Error: {allMusicError?.message || favouriteError?.message}</div>;
    // }

    return (
        <section id='all-music-page' className='relative w-full lg:max-w-[95vw] bg-custom-white custom-h-full min-h-[650px] flex flex-col lg:items-normal items-center lg:rounded-l-xl md:pt-5 lg:px-10'>
            <div className='lg:container w-full lg:px-0 px-2'>
                <SearchBox widthSize={true} titleText={'All Song'} />
                <div className='mt-4 relative'>
                    <div className='flex justify-between items-center'>
                        <h3 className='text-lg font-semibold block'>{width >= 768 ? 'Best Albums Of All Times' : 'Best Albums'}</h3>
                        <div className='control flex'>
                            <div className='rounded-full p-[10px] bg-custom-black text-custom-white cursor-pointer mx-2' onClick={() => sliderRef.current.slickPrev()}>
                                <i className='fi fi-br-angle-left text-2xl flex justify-center items-center p-[2px]'></i>
                            </div>
                            <div className='rounded-full p-[10px] bg-custom-black text-custom-white cursor-pointer' onClick={() => sliderRef.current.slickNext()}>
                                <i className='fi fi-br-angle-right text-2xl flex justify-center items-center p-[2px]'></i>
                            </div>
                        </div>
                    </div>
                    <div className='mt-2 w-full max-w-[95vw] overflow-hidden pb-5 m-auto'>
                        <Slider {...settings} className='cursor-grab' ref={sliderRef}>
                            {bestAlbum.map(item => (
                                <img key={item.id} className='cursor-pointer rounded-lg shadow-lg' src={item.imageSrc} alt={item.title} />
                            ))}
                        </Slider>
                    </div>
                </div>
                <h3 className="text-lg font-semibold block md:hidden">All Music</h3>
                <MusicList myListArray={allMusicList} userId={user ? user.id : 0} isShowAlbumAndTime={width >= 768 ? true : false} />
                {/* <div className='music-list overflow-auto w-full h-full scrollbar-custom'>
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
                    {allMusicList && allMusicList.map((item, index) => (
                        <div id={`item-${item.id}`} key={index} className='music-item w-full flex items-center justify-between py-[10px] text-custom-black cursor-pointer'>
                            <div id={index} className='w-2/6 flex items-center gap-5 border-l-4 border-transparent play-music'>
                                <span className='w-[12px] text-[15px] font-semibold opacity-50 ms-2'>
                                    {index + 1 < 10 ? `0${index + 1}` : index + 1}
                                </span>
                                <img className='xl:w-[60px] shadow-lg rounded-lg' src={require(`../images/${item.imageSrc}`)} alt={item.musicName} />
                                <div className='capitalize'>
                                    <h2 className='font-bold text-lg'>{item.musicName}</h2>
                                    <span className='opacity-40 text-[13px] block leading-4'>{item.artistName}</span>
                                </div>
                            </div>
                            <div id={index} className='w-1/6 text-left font-semibold text-md play-music'>{item.musicName}</div>
                            <div id={index} className='w-1/6 text-right font-semibold text-sm play-music'>
                                {item.musicTime}
                            </div>
                            <div id={index} className='w-2/6 relative flex items-center justify-end details-icon'>
                                <span className='text-custom-gray text-[12px] font-semibold'>{item.viewNumber}</span>
                                <FavoriteIcon userId={user ? user.id : 0} songId={item.id} />
                                <MenuIcon />

                            </div>
                        </div>
                    ))}
                </div> */}
                <MusicPlayer getStyle={width >= 768 ? 'bottom' : 'full'} />
            </div>
        </section>
    );
}

export default AllMusic;


// import React, { useRef, useState } from 'react';
// import Slider from "react-slick";
// import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
// import {
//     ArchiveBoxXMarkIcon,
//     PencilIcon,
//     Square2StackIcon,
//     TrashIcon,
// } from '@heroicons/react/16/solid'
// import SearchBox from '../components/searchBox';
// // import allMusicList from "../server/allmusiclistDB";
// import { bestAlbum, favouriteList } from '../App';
// import { ReactComponent as MoreIcon } from '../icons/more.svg';
// import { ReactComponent as NextIcon } from '../icons/next.svg';
// import { ReactComponent as PrevIcon } from '../icons/prev.svg';
// import { MusicPlayer } from '../components/MusicPLayer';
// // regular icon
// // import { ReactComponent as HeartIcon } from '../icons/regular/heart.svg';
// // solid icon
// // import { ReactComponent as HeartSolidIcon } from '../icons/solid/heart-solid.svg';
// import useFetchData from '../server/useFetchData';

// const AllMusic = () => {

//     const { data: allMusicList, loading: allMusicLoading, error: allMusicError } = useFetchData('/api/allmusiclist');
//     const { data: favouriteList, loading: favouriteLoading, error: favouriteError } = useFetchData('/api/allmusiclist');

//     const sliderRef = useRef(null);
//     const countItemNum = useRef(1);
//     countItemNum.current = 1;
//     const [addFav, setAddFav] = useState(allMusicList);
//     function addToFavourite(indexId) {
//         const favIndex = addFav.slice();
//         const itemClick = favIndex.find(item => item.id === indexId);
//         itemClick.isFavourite = !itemClick.isFavourite;
//         ///////////////////////////////
//         // before set favlist set in all array fav
//         // /************************************************************************ */
//         favouriteList.push(itemClick);
//         ///////////////////////////////
//         setAddFav(favIndex);
//         ///////////////////////////////
//         // before rerender set database by addFav array
//         ///////////////////////////////
//         return;
//     }
//     const settings = {
//         rtl: false,
//         infinite: false,
//         speed: 1000,
//         slidesToShow: 8,
//         slidesToScroll: 2,
//         arrows: false,
//         vertical: false,
//     };
//     if (allMusicLoading || favouriteLoading) {
//         return <div>Loading...</div>;
//     }

//     if (allMusicError || favouriteError) {
//         return <div>Error: {allMusicError?.message || favouriteError?.message}</div>;
//     }
//     return (
//         <section id='all-music-page' className='relative w-full bg-custom-white h-[100dvh] flex-col rounded-l-xl py-5 px-10'>
//             <div className='flex items-center justify-between'>
//                 <h1 className='font-black text-5xl'>All Song</h1>
//                 <SearchBox widthSize={true} />
//             </div>
//             <div className='mt-4 relative 2xl:h-[33dvh] xl:h-[26dvh] lg:h-[20dvh]'>
//                 <div className='flex justify-between items-center'>
//                     <h3 className='text-lg font-semibold block'>Best Albums Of All Times</h3>
//                     <div className='control flex gap-3'>
//                         <div className='rounded-full p-[10px] bg-custom-black cursor-pointer' onClick={() => sliderRef.slickPrev()}>
//                             <PrevIcon />
//                         </div>
//                         <div className='rounded-full p-[10px] bg-custom-black cursor-pointer' onClick={() => sliderRef.slickNext()}>
//                             <NextIcon />
//                         </div>
//                     </div>
//                 </div>
//                 <div className='mt-2 w-full max-w-[2000px] overflow-hidden absolute pb-5'>
//                     <Slider {...settings} className='cursor-grab' ref={slider => {
//                         sliderRef = slider;
//                     }}>
//                         {bestAlbum.map(item => (
//                             <img key={item.id} className='w-48 cursor-pointer rounded-lg shadow-lg' src={item.imageSrc} alt="" />
//                         ))}
//                     </Slider>
//                 </div>
//             </div>
//             <div className='2xl:h-[54dvh] xl:h-[63dvh] flex'>
//                 <div className='music-list overflow-auto w-full h-full'>
//                     <div className='w-full flex items-center justify-between text-lg pb-2 shadow-sm text-opacity-50 capitalize font-semibold text-custom-black bg-custom-white cursor-pointer sticky -top-1 z-30'>
//                         <div className='w-2/6 flex items-center gap-5 border-l-4 border-transparent'>
//                             <span className='w-[10px] ms-2'>#</span>
//                             <h2 className='xl:ms-[70px] 2xl:ms-[75px]'>Title</h2>
//                         </div>
//                         <div className='w-1/6 text-left'>Album</div>
//                         <div className='w-1/6 text-right'>Time</div>
//                         <div className='w-2/6 flex items-center justify-end details-icon pe-28'>
//                             Playing
//                         </div>
//                     </div>
//                     {allMusicList && allMusicList.map((item, index) => (
//                         <div id={'item-' + item.id + ''} key={item.id} className='music-item w-full flex items-center justify-between py-[10px] text-custom-black cursor-pointer'>
//                             <div id={item.id} className='w-2/6 flex items-center gap-5 border-l-4 border-transparent play-music'>
//                                 <span className='w-[12px] text-[15px] font-semibold opacity-50 ms-2'>
//                                     {(() => {
//                                         if (countItemNum.current < 10) {
//                                             return '0' + countItemNum.current++;
//                                         } else {
//                                             return countItemNum.current++;
//                                         }
//                                     })()}
//                                 </span>
//                                 <img className='xl:w-[60px] shadow-lg rounded-lg' src={require(`../images/${item.imageSrc}`)} alt="" />
//                                 <div className='capitalize'>
//                                     <h2 className='font-bold text-lg'>{item.musicName}</h2>
//                                     <span className='opacity-40 text-[13px] block leading-4'>{item.artistName}</span>
//                                 </div>
//                             </div>
//                             <div id={item.id} className='w-1/6 text-left font-semibold text-md play-music'>{item.musicName}</div>
//                             <div id={item.id} className='w-1/6 text-right font-semibold text-sm play-music'>
//                                 {item.musicTime}
//                             </div>
//                             <div className='w-2/6 relative flex items-center justify-end details-icon'>
//                                 <span className='text-custom-gray text-[12px] font-semibold'>{item.viewNumber}</span>
//                                 {(() => {
//                                     if (item.isFavourite === 1) {
//                                         return <i className={'fi fi-ss-heart flex items-center text-xl text-custom-pink mx-8 cursor-pointer icon-favourite drop-shadow-sm'}></i>;
//                                     } else if (item.isFavourite === 0) {
//                                         return <i className={'fi fi-rs-heart flex items-center text-xl hover:text-custom-pink mx-8 cursor-pointer'}></i>;
//                                         //  onClick={() => addToFavourite(item.id)}  onClick={() => addToFavourite(item.id)}
//                                     }
//                                 })()}

//                                 <Menu>
//                                     <MenuButton className="py-1.5 px-3 font-semibold">
//                                         <MoreIcon className='w-[18px] cursor-pointer' />
//                                     </MenuButton>
//                                     <MenuItems
//                                         transition
//                                         className="absolute z-20 w-52 right-[52px] -top-3 flex flex-col justify-around shadow-md bg-custom-black rounded-xl border p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)]  data-[closed]:scale-95 data-[closed]:opacity-0"
//                                     >
//                                         <div className='absolute -z-10 w-[20px] h-[20px] rounded-sm bg-custom-black -right-2 top-5 rotate-45 shadow-md'></div>
//                                         <MenuItem>
//                                             <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
//                                                 <PencilIcon className="size-4 fill-white/30" />
//                                                 add to playlist
//                                             </button>
//                                         </MenuItem>
//                                         <MenuItem>
//                                             <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
//                                                 <Square2StackIcon className="size-4 fill-white/30" />
//                                                 report
//                                             </button>
//                                         </MenuItem>
//                                         <div className="my-1 h-px bg-white/5" />
//                                         <MenuItem>
//                                             <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
//                                                 <ArchiveBoxXMarkIcon className="size-4 fill-white/30" />
//                                                 share
//                                             </button>
//                                         </MenuItem>
//                                         <MenuItem>
//                                             <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
//                                                 <TrashIcon className="size-4 fill-white/30" />
//                                                 song info
//                                             </button>
//                                         </MenuItem>
//                                     </MenuItems>
//                                 </Menu>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             <MusicPlayer getStyle='bottom' />
//         </section >
//     );
// }

// export default AllMusic;