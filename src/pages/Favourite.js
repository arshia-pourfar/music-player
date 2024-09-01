
import React, { useEffect } from "react";
import { MusicPlayer } from '../components/MusicPLayer';
import SearchBox from '../components/searchBox';
import useFetchData from "../hooks/useFetchData";
import { useAuth } from "../hooks/AuthContext";
import MusicList from "../components/MusicList";

const Favourite = () => {
    const { user } = useAuth();
    const { data, loading, setUrl, setMethod, fetchData } = useFetchData('', 'GET', null, false);

    useEffect(() => {
        console.log(data);

        if (user) {
            setUrl(`/api/${user.id}/favoriteslist`); // این URL باید به درستی با مسیر سرور شما همخوانی داشته باشد
            fetchData();
        }
    }, [user, setUrl, fetchData, setMethod, data]);

    ////////////////////////////////////////////////////////////////////
    // code for local server
    // in main server auto remove duplicate fav
    // const favArrayWithoutRepetition = favouriteList.filter((value, index) => {
    //     const _value = JSON.stringify(value);
    //     return index === favouriteList.findIndex(obj => {
    //         return JSON.stringify(obj) === _value;
    //     });
    // });

    if (loading) {
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



    // code for local server
    // in main server auto remove duplicate fav
    ////////////////////////////////////////////////////////////////////
    // const [addFav, setAddFav] = useState(favArrayWithoutRepetition);
    // const countItemNum = useRef(1);
    // function addToFavourite(indexId) {
    //     const favIndex = addFav.slice();
    //     const itemClick = favIndex.find(item => item.id === indexId);
    //     itemClick.isFavourite = !itemClick.isFavourite;
    //     countItemNum.current = 1;
    //     setAddFav(favIndex);
    //     ///////////////////////////////
    //     // before rerender set database by addFav array
    //     ///////////////////////////////
    //     return;
    // }

    return (
        <section id='favourite-page' className='relative w-full bg-custom-white custom-h-full flex-col rounded-l-xl py-5 px-10'>
            <div className='flex items-center justify-between'>
                <h1 className='font-black text-5xl'>Favourite</h1>
                <SearchBox widthSize={true} />
            </div>
            <div className='overflow-auto w-full h-full py-6 scrollbar-custom'>
                {(() => {
                    // const checkFavListLength = data.find(item => item.isFavourite === true);
                    if (!Array.isArray(data) || data.length === 0 || data === null) {
                        return (
                            <div className="text-center mt-20">
                                <img className="w-[170px] m-auto animate-bounce" src={require('../images/playlist.png')} alt="" />
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
                            <MusicList myListArray={data} userId={user ? user.id : 0} isShowAlbumAndTime={true} />
                        );
                    }
                })()}
            </div>
            <MusicPlayer getStyle='bottom' />
        </section >
    );
}
//         <section id='favourite-page' className='relative w-full bg-custom-white h-[100dvh] flex-col rounded-l-xl py-5 px-10'>
//             {(() => {
//                 if (!data) {
//                     return (
//                         <div className='w-full flex items-center justify-between text-lg pb-2 shadow-sm text-opacity-50 capitalize font-semibold text-custom-black bg-custom-white cursor-pointer sticky top-0 z-30'>
//                             <div className='w-2/6 flex items-center gap-5 border-l-4 border-transparent'>
//                                 <span className='w-[10px] ms-2'>#</span>
//                                 <h2 className='xl:ms-[70px] 2xl:ms-[75px]'>Title</h2>
//                             </div>
//                             <div className='w-1/6 text-left'>Album</div>
//                             <div className='w-1/6 text-right'>Time</div>
//                             <div className='w-2/6 flex items-center justify-end details-icon pe-28'>
//                                 Playing
//                             </div>
//                         </div>
//                     );
//                 } else {
//                     return (
//                         <div className="text-center mt-16">
//                             <img className="w-[170px] m-auto animate-bounce" src={require('../images/playlist.png')} alt="" />
//                             <h2 className="font-black text-4xl ms-3 text-custom-black">No Songs Available</h2>
//                             <h5 className="text-lg animate-pulse text-custom-black mt-2">Your Favorites List Is Empty</h5>
//                         </div>
//                     )
//                 }
//             })()} <div className='flex items-center justify-between'>
//                 <h1 className='font-black text-5xl'>Favourite</h1>
//                 <SearchBox widthSize={true} />
//             </div>
//             <div className='music-list overflow-auto w-full h-full py-6'>

//                 {data && data.map((item, index) => (
//                     <div id={'item-' + item.id + ''} key={item.id} className='music-item w-full flex items-center justify-between py-[10px] text-custom-black cursor-pointer'>
//                         <div id={item.id} className='w-2/6 flex items-center gap-5 border-l-4 border-transparent play-music'>
//                             <span className='w-[12px] text-[15px] font-semibold opacity-50 ms-2'>{index}</span>
//                             <img className='xl:w-[55px] 2xl:w-[60px] shadow-lg rounded-lg' src={require(`../images/${item.imageSrc}`)} alt="" />
//                             <div className='capitalize'>
//                                 <h2 className='font-bold text-lg'>{item.musicName}</h2>
//                                 <span className='opacity-40 text-[13px] block leading-4'>{item.artistName}</span>
//                             </div>
//                         </div>
//                         <div id={item.id} className='w-1/6 text-left font-semibold text-md play-music'>{item.musicName}</div>
//                         <div id={item.id} className='w-1/6 text-right font-semibold text-sm play-music'>
//                             {item.musicTime}
//                         </div>
//                         <div className='w-2/6 relative flex items-center justify-end details-icon'>
//                             <span className='text-custom-gray text-[12px] font-semibold'>{item.viewNumber}</span>
//                             <FavoriteIcon />
//                             {/* <i className='fi fi-ss-heart text-xl flex items-center mx-8 cursor-pointer icon-favourite drop-shadow-sm' ></i> */}
//                             {/* <i className='fi fi-ss-heart text-xl flex items-center mx-8 cursor-pointer icon-favourite drop-shadow-sm' onClick={() => addToFavourite(item.id)} ></i> */}

//                             <Menu>
//                                 <MenuButton className="py-1.5 px-3 font-semibold">
//                                     <MoreIcon className='w-[18px] cursor-pointer' />
//                                 </MenuButton>
//                                 <MenuItems
//                                     transition
//                                     className="absolute z-20 w-52 right-[52px] -top-3 flex flex-col justify-around shadow-md bg-custom-black rounded-xl border p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)]  data-[closed]:scale-95 data-[closed]:opacity-0"
//                                 >
//                                     <div className='absolute -z-10 w-[20px] h-[20px] rounded-sm bg-custom-black -right-2 top-5 rotate-45 shadow-md'></div>
//                                     <MenuItem>
//                                         <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
//                                             <PencilIcon className="size-4 fill-white/30" />
//                                             add to playlist
//                                         </button>
//                                     </MenuItem>
//                                     <MenuItem>
//                                         <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
//                                             <Square2StackIcon className="size-4 fill-white/30" />
//                                             report
//                                         </button>
//                                     </MenuItem>
//                                     <div className="my-1 h-px bg-white/5" />
//                                     <MenuItem>
//                                         <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
//                                             <ArchiveBoxXMarkIcon className="size-4 fill-white/30" />
//                                             share
//                                         </button>
//                                     </MenuItem>
//                                     <MenuItem>
//                                         <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
//                                             <TrashIcon className="size-4 fill-white/30" />
//                                             song info
//                                         </button>
//                                     </MenuItem>
//                                 </MenuItems>
//                             </Menu>
//                         </div>
//                     </div>
//                     //             );
//                     //         }
//                     //     })()}
//                     // </>
//                 ))}
//             </div>
//             <MusicPlayer getStyle='bottom' />
//         </section >
//     );
// }

export default Favourite;

// import React, { useEffect, useRef, useState } from "react";
// import { MusicPlayer } from '../components/MusicPLayer';
// import SearchBox from '../components/searchBox';
// import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
// import {
//     ArchiveBoxXMarkIcon,
//     PencilIcon,
//     Square2StackIcon,
//     TrashIcon,
// } from '@heroicons/react/16/solid'
// // import { favouriteList } from "../App";
// import { ReactComponent as MoreIcon } from '../icons/more.svg';
// import useFetchData from "../server/useFetchData";
// import { useAuth } from "../components/AuthContext";
// const Favourite = () => {
//     const { user } = useAuth();
//     const { data: favouriteList, loading, error, setUrl, setMethod, setBody, fetchData } = useFetchData('/api/favorites', 'GET', null, true);
//     console.log(favouriteList);
//     const [triggerFetch, setTriggerFetch] = useState(false);
//     // const handleAddToFavorites = () => {
//     useEffect(() => {
//         if (user) {
//             setUrl(`/api/${user.id}/favorites`);
//             // if (data) {
//             //     setMethod('DELETE');
//             // } else {
//             setMethod('POST');
//             // }
//             // setBody({ songId });
//             setTriggerFetch(true);
//             // };
//             if (triggerFetch) {
//                 fetchData();
//                 setTriggerFetch(false);
//             }
//         }
//     }, [triggerFetch, fetchData, setUrl, user.id, setMethod, user]);
//     ////////////////////////////////////////////////////////////////////
//     // code for local server
//     // in main server auto remove duplicate fav
//     // const favArrayWithoutRepetition = favouriteList.filter((value, index) => {
//     //     const _value = JSON.stringify(value);
//     //     return index === favouriteList.findIndex(obj => {
//     //         return JSON.stringify(obj) === _value;
//     //     });
//     // });

//     // code for local server
//     // in main server auto remove duplicate fav
//     ////////////////////////////////////////////////////////////////////
//     // const [addFav, setAddFav] = useState(favArrayWithoutRepetition);
//     // const countItemNum = useRef(1);
//     // function addToFavourite(indexId) {
//     //     const favIndex = addFav.slice();
//     //     const itemClick = favIndex.find(item => item.id === indexId);
//     //     itemClick.isFavourite = !itemClick.isFavourite;
//     //     countItemNum.current = 1;
//     //     setAddFav(favIndex);
//     //     ///////////////////////////////
//     //     // before rerender set database by addFav array
//     //     ///////////////////////////////
//     //     return;
//     // }

//     return (
//         <section id='favourite-page' className='relative w-full bg-custom-white h-[100dvh] flex-col rounded-l-xl py-5 px-10'>
//             <div className='flex items-center justify-between'>
//                 <h1 className='font-black text-5xl'>Favourite</h1>
//                 <SearchBox widthSize={true} />
//             </div>
//             <div className='music-list overflow-auto w-full h-full py-6'>
//                 {(() => {
//                     const checkFavListLength = favouriteList.find(item => item.isFavourite === true);
//                     if (checkFavListLength !== undefined) {
//                         return (
//                             <div className='w-full flex items-center justify-between text-lg pb-2 shadow-sm text-opacity-50 capitalize font-semibold text-custom-black bg-custom-white cursor-pointer sticky top-0 z-30'>
//                                 <div className='w-2/6 flex items-center gap-5 border-l-4 border-transparent'>
//                                     <span className='w-[10px] ms-2'>#</span>
//                                     <h2 className='xl:ms-[70px] 2xl:ms-[75px]'>Title</h2>
//                                 </div>
//                                 <div className='w-1/6 text-left'>Album</div>
//                                 <div className='w-1/6 text-right'>Time</div>
//                                 <div className='w-2/6 flex items-center justify-end details-icon pe-28'>
//                                     Playing
//                                 </div>
//                             </div>
//                         );
//                     } else {
//                         return (
//                             <div className="text-center mt-16">
//                                 <img className="w-[170px] m-auto animate-bounce" src={require('../images/playlist.png')} alt="" />
//                                 <h2 className="font-black text-4xl ms-3 text-custom-black">No Songs Available</h2>
//                                 <h5 className="text-lg animate-pulse text-custom-black mt-2">Your Favorites List Is Empty</h5>
//                             </div>
//                         )
//                     }
//                 })()}
//                 {favouriteList && favouriteList.map((item, index) => (
//                     <>
//                         {(() => {
//                             if (item.isFavourite) {
//                                 return (
//                                     <div id={'item-' + item.id + ''} key={item.id} className='music-item w-full flex items-center justify-between py-[10px] text-custom-black cursor-pointer'>
//                                         <div id={item.id} className='w-2/6 flex items-center gap-5 border-l-4 border-transparent play-music'>
//                                             {/* <span className='w-[12px] text-[15px] font-semibold opacity-50 ms-2'>{(() => {
//                                                 if (countItemNum.current < 10) {
//                                                     return '0' + countItemNum.current++;
//                                                 } else {
//                                                     return countItemNum.current++;
//                                                 }
//                                             })()}</span> */}
//                                             <span className='w-[12px] text-[15px] font-semibold opacity-50 ms-2'>{index}</span>
//                                             <img className='xl:w-[55px] 2xl:w-[60px] shadow-lg rounded-lg' src={item.imageSrc} alt="" />
//                                             <div className='capitalize'>
//                                                 <h2 className='font-bold text-lg'>{item.musicName}</h2>
//                                                 <span className='opacity-40 text-[13px] block leading-4'>{item.artistName}</span>
//                                             </div>
//                                         </div>
//                                         <div id={item.id} className='w-1/6 text-left font-semibold text-md play-music'>{item.musicName}</div>
//                                         <div id={item.id} className='w-1/6 text-right font-semibold text-sm play-music'>
//                                             {item.musicTime}
//                                         </div>
//                                         <div className='w-2/6 relative flex items-center justify-end details-icon'>
//                                             <span className='text-custom-gray text-[12px] font-semibold'>{item.viewNumber}</span>
//                                             <i className='fi fi-ss-heart text-xl flex items-center mx-8 cursor-pointer icon-favourite drop-shadow-sm' ></i>
//                                             {/* <i className='fi fi-ss-heart text-xl flex items-center mx-8 cursor-pointer icon-favourite drop-shadow-sm' onClick={() => addToFavourite(item.id)} ></i> */}
//                                             <Menu>
//                                                 <MenuButton className="py-1.5 px-3 font-semibold">
//                                                     <MoreIcon className='w-[18px] cursor-pointer' />
//                                                 </MenuButton>
//                                                 <MenuItems
//                                                     transition
//                                                     className="absolute z-20 w-52 right-[52px] -top-3 flex flex-col justify-around shadow-md bg-custom-black rounded-xl border p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)]  data-[closed]:scale-95 data-[closed]:opacity-0"
//                                                 >
//                                                     <div className='absolute -z-10 w-[20px] h-[20px] rounded-sm bg-custom-black -right-2 top-5 rotate-45 shadow-md'></div>
//                                                     <MenuItem>
//                                                         <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
//                                                             <PencilIcon className="size-4 fill-white/30" />
//                                                             add to playlist
//                                                         </button>
//                                                     </MenuItem>
//                                                     <MenuItem>
//                                                         <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
//                                                             <Square2StackIcon className="size-4 fill-white/30" />
//                                                             report
//                                                         </button>
//                                                     </MenuItem>
//                                                     <div className="my-1 h-px bg-white/5" />
//                                                     <MenuItem>
//                                                         <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
//                                                             <ArchiveBoxXMarkIcon className="size-4 fill-white/30" />
//                                                             share
//                                                         </button>
//                                                     </MenuItem>
//                                                     <MenuItem>
//                                                         <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
//                                                             <TrashIcon className="size-4 fill-white/30" />
//                                                             song info
//                                                         </button>
//                                                     </MenuItem>
//                                                 </MenuItems>
//                                             </Menu>
//                                         </div>
//                                     </div>
//                                 );
//                             }
//                         })()}
//                     </>
//                 ))}
//             </div>
//             <MusicPlayer getStyle='bottom' />
//         </section >
//     );
// }

// export default Favourite;