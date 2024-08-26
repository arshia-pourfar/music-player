/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { headerPostItem, recentFavList } from '../App';
import SearchBox from '../components/searchBox';
import { MusicPlayer } from '../components/MusicPLayer';
import useFetchData from '../hooks/useFetchData';
import { useAuth } from '../hooks/AuthContext';
import MenuIcon from '../components/MenuIcon';
import useWindowDimensions from '../hooks/useWidthSize';
import MusicList from '../components/MusicList';

const Home = () => {
    const { height, width } = useWindowDimensions();
    const { user } = useAuth();
    const [limitTopArtist, setLimitTopArtist] = useState(3);
    const { data: trendingList, loading: trendingLoading, error: trendingError } = useFetchData('/api/trendinglist', 'GET', null, true);
    const { data: topArtistList, loading: topArtistLoading, error: topArtistError } = useFetchData('/api/topartistslist', 'GET', null, true, limitTopArtist);

    useEffect(() => {
        // تغییر مقدار limitTopArtist بر اساس ابعاد صفحه
        // if (height >= 1300) {
        //     setLimitTopArtist(6);
        // } else
        if (width >= 1024) {
            if (height >= 1470) {
                setLimitTopArtist(5);
            } else if (width < 1280 && height >= 1170) {
                setLimitTopArtist(5);
            } else if (width < 1280 && height >= 990) {
                setLimitTopArtist(4);
            } else if (width < 1536 && height >= 1140) {
                setLimitTopArtist(4);
            } else if (width >= 1536 && height >= 1230) {
                setLimitTopArtist(4);
            } else {
                setLimitTopArtist(3);
            }
        }
    }, [height, width, user]); // وابستگی به تغییر ابعاد صفحه

    if (trendingLoading || topArtistLoading) {
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

    if (trendingError || topArtistError) {
        return <div>Error: {trendingError?.message || topArtistError?.message}</div>;
    }


    const HeaderPostCarousel = () => {
        const settings = {
            fade: true,
            dots: true,
            infinite: true,
            speed: 800,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            vertical: true,
            // autoplay: true,
            autoplaySpeed: 2000,
        };
        if (width >= 1024) {
            if (height <= 1300) {
                settings.fade = true;
                settings.slidesToShow = 1;
            } else {
                settings.fade = false;
                settings.slidesToShow = 1.65;
            }
        }
        return (
            // <div id='header-carousel' className='relative flex justify-center items-center xl:max-h-[30dvh] xl:min-h-[300px] lg:min-h-[250px] lg:h-[30dvh] lg:mt-0 mt-2'>
            <div id='header-carousel' className='relative flex justify-center items-center h-[30%] min-h-[300px] lg:mt-0 mt-2'>
                <Slider {...settings} className='flex flex-nowrap justify-center items-center overflow-hidden relative'>
                    {headerPostItem.map(item => (
                        // <img key={item.id} className='inline-block rounded-3xl 2xl:max-h-[300px] xl:max-h-[40dvh] xl:min-h-[270px] lg:min-h-[200px] my-1' src={item.imageSrc} alt="" />
                        <img key={item.id} className='rounded-3xl w-auto max-h-[300px] min-h-[250px] my-1' src={item.imageSrc} alt="" />
                    ))}
                </Slider>
            </div>
        );
    };

    const TrendingList = () => {
        console.log(trendingList);
        return (
            <>
                <div id='trending-list' className='relative z-20 h-[60%] 2xl:mt-2 xl:mt-5 2xl:pb-0 xl:pb-3' style={{ width: '100%' }}>
                    <div className='flex justify-between items-center mb-2'>
                        <h1 className='font-semibold inline-block xl:text-3xl md:text-2xl'>Trending</h1>
                        <a href="#" className='underline text-custom-blue xl:text-base lg:text-sm'>See all</a>
                    </div>
                    <MusicList myListArray={trendingList} userId={user ? user.id : 0} isShowAlbumAndTime={false} />
                </div>

                {/*
                 <div id='trending-list' className={`relative z-20 ${height <= 650 ? 'xl:h-[30vh] lg:h-[38vh] md:h-[30vh]' : height <= 700 ? 'xl:h-[34vh] lg:h-[43vh] md:h-[33vh]' : height <= 760 ? 'xl:h-[39vh] lg:h-[47vh] md:h-[38vh]' : height <= 850 ? 'xl:h-[43vh] lg:h-[52vh] md:h-[43vh]' : height <= 1000 ? 'xl:h-[49vh] lg:h-[56vh] md:h-[50vh]' : 'xl:h-[56vh] lg:h-[58vh] md:h-[57vh]'} 2xl:mt-2 xl:mt-5 2xl:pb-0 xl:pb-3`}>
                    <div className='flex justify-between items-center mb-2'>
                        <h1 className='font-semibold inline-block xl:text-3xl md:text-2xl'>Trending</h1>
                        <a href="#" className='underline text-custom-blue xl:text-base lg:text-sm'>See all</a>
                    </div>
                    <div className='music-list flex flex-col overflow-auto h-[50dvh] scrollbar-custom'>
                        {trendingList && trendingList.map((item, index) => (
                            <div key={index} className='music-item relative box-border w-full min-h-[75px] flex items-center justify-between py-2 text-custom-black cursor-pointer'>
                                <div id={index} className='w-full items-center flex border-l-4 border-transparent play-music'>
                                    <span className='w-5 text-center xl:text-lg lg:text-base md:text-lg font-semibold opacity-50 ms-2 '> {index < 9 ? `0${index + 1}` : index + 1}</span>
                                    <img className='lg:w-[65px] md:w-[70px] xl:mx-5 lg:mx-3 md:mx-4 shadow-lg rounded-md' src={require(`../images/${item.imageSrc}`)} alt="" />
                                    <div className='capitalize w-[200px]'>
                                        <h2 className='font-bold xl:text-xl lg:text-xl md:text-xl line-clamp-1'>{item.musicName}</h2>
                                        <span className='text-custom-gray xl:text-[15px] lg:text-base md:text-lg line-clamp-1'>{item.artistName}</span>
                                    </div>
                                </div>
                                <div className='xl:w-2/5 lg:w-1/5 relative flex items-center justify-end'>
                                    <span className='text-custom-gray lg:text-sm md:text-base md:inline-block hidden font-semibold'>{item.viewNumber}</span>
                                    <FavoriteIcon userId={user ? user.id : 0} songId={item.id} />
                                    <MenuIcon />
                                </div>
                            </div>
                        ))}
                    </div>
                </div> */}
            </>
        );
    };

    const TopArtist = () => {
        return (
            <div className='relative lg:block justify-center items-center h-[30%] min-h-[300px] lg:mt-0 mt-2 hidden'>
                <div className='flex justify-between items-center'>
                    <h1 className='font-semibold inline-block xl:text-3xl md:text-2xl'>Top Artist</h1>
                    <a href="#" className='underline text-custom-blue xl:text-base lg:text-sm'>See all</a>
                </div>
                <div className='w-full h-full top-artist-list lg:px-1 xl:mt-3 md:mt-1 flex flex-col'>
                    {topArtistList && Array.isArray(topArtistList) ? topArtistList.map((item, index) => (
                        // <div key={index} className='flex justify-between items-center xl:my-2 md:my-1 cursor-pointer relative'>
                        //     <div className='w-full flex items-center xl:gap-3 lg:gap-3 md:gap-2 border-l-4 border-transparent'>
                        //         <img className='2xl:w-[65px] xl:w-[60px] lg:w-[55px] md:w-[50px] shadow-lg rounded-lg' src={require(`../images/${item.imageSrc}`)} alt="" />
                        //         <div className='flex flex-col justify-center'>
                        //             <h2 className='xl:text-lg font-semibold capitalize'>{item.artistName}</h2>
                        //             <span className='inline-block lg:text-sm md:text-xs text-custom-gray font-semibold'>{item.followersNum} followers</span>
                        //         </div>
                        //     </div>
                        //     <MenuIcon />
                        // </div>
                        <div key={index} className='w-full min-h-fit flex items-center justify-between py-2 text-custom-black cursor-pointer'>
                            <div className='w-full items-center flex border-l-4 border-transparent'>
                                {/* <span className='w-5 text-center xl:text-lg lg:text-base md:text-lg font-semibold opacity-50 ms-2 '> {index < 9 ? `0${index + 1}` : index + 1}</span> */}
                                <img className='lg:w-[65px] md:w-[70px] shadow-lg rounded-md' src={require(`../images/${item.imageSrc}`)} alt="" />
                                <div className='capitalize w-[200px] xl:mx-4 lg:mx-2 md:mx-3'>
                                    <h2 className='font-bold xl:text-xl lg:text-xl md:text-xl line-clamp-1'>{item.artistName}</h2>
                                    {/* <span className='text-custom-gray xl:text-[15px] lg:text-base md:text-lg line-clamp-1'>{item.followers}</span> */}
                                    <span className='text-custom-gray xl:text-sm lg:text-base md:text-lg line-clamp-1 flex items-center'>
                                        <i className='fi fi-ss-waveform-path'></i>
                                        {/* <span className='inline-block mx-1'>{item.viewNumber}</span> */}
                                        <span className='inline-block mx-1'>5,1 M</span>
                                        Plays
                                    </span>
                                </div>
                            </div>
                            <div className='xl:w-2/5 lg:w-1/5 relative flex items-center justify-end'>
                                {/* <span className='text-custom-gray lg:text-sm md:text-base md:inline-block hidden font-semibold'>{item.viewNumber}</span> */}
                                {/* <FavoriteIcon userId={user ? user.id : 0} songId={item.id} /> */}
                                <MenuIcon />
                            </div>
                        </div>
                    )) : null}
                </div>
            </div>
        );
    };

    const RecentFavourite = () => {
        return (
            <div className='relative z-20 h-[60%] 2xl:mt-2 xl:mt-5 2xl:pb-0 xl:pb-3' style={{ width: '100%' }}>
                <div className='flex justify-between items-center mb-2'>
                    <h1 className='font-semibold inline-block xl:text-3xl md:text-2xl'>Recent Favourite</h1>
                    <a href="#" className='underline text-custom-blue xl:text-base lg:text-sm'>See all</a>
                </div>
                <div className='min-h-[200px] flex flex-wrap overflow-auto scrollbar-custom' style={height >= 1000 ? { height: 'calc(100% - 10px)' } : height >= 800 ? { height: 'calc(100% - 55px)' } : { height: 'calc(100% - 120px)' }}>
                    {recentFavList.map(item => (
                        <div key={item.id} className='flex flex-col xl:basis-1/3 lg:basis-1/2 py-3 cursor-pointer'>
                            <img className='w-[90%] m-auto rounded-xl drop-shadow-md' src={item.imageSrc} alt="" />
                            <div className='m-auto xl:w-[80%] w-[90%]'>
                                <h2 className='font-bold xl:text-lg lg:text-base mt-2'>{item.title}</h2>
                                <h5 className='xl:text-sm lg:text-xs font-semibold opacity-50 line-clamp-2 mt-1'>{item.subTitle}</h5>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <>
            <MusicPlayer getStyle='home' />
            {/* <section id='home-page' className='relative w-full bg-custom-white h-[100dvh] flex flex-col rounded-l-xl pt-5 px-10'> */}

            <section id='home-page' className='relative w-full bg-custom-white custom-h-full min-h-[650px] flex flex-col rounded-l-xl pt-5 px-10'>
                <div className='close-music-player hidden absolute -left-16 px-5 mt-2'>
                    <i className='flex justify-between items-center fi fi-rr-circle-xmark text-custom-black text-3xl bg-custom-white w-[60px] p-[6px] rounded-l-full cursor-pointer'></i>
                </div>
                <SearchBox widthSize={false} titleText={'Home'} />
                <div className='flex pt-14 pe-10 absolute custom-h-full'>
                    <div className='left-section lg:w-[60%] z-[100]'>
                        <HeaderPostCarousel />
                        <TrendingList />
                    </div>
                    <div className='xl:mx-7 lg:mx-4 lg:inline-block hidden'></div>
                    <div className='right-section lg:w-[40%] z-[100]'>
                        <TopArtist />
                        <RecentFavourite />
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;

// /* eslint-disable jsx-a11y/anchor-is-valid */
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
// import { MusicPlayer } from '../components/MusicPLayer';
// import trendingListItem from '../server/trendinglistDB';
// import topArtistList from '../server/topartistlistDB';
// import { headerPostItem, recentFavList, favouriteList } from '../App';
// import { ReactComponent as MoreIcon } from '../icons/more.svg';

// const Home = () => {
//     const HeaderPostCarousel = () => {
//         // carousel setting
//         const settings = {
//             fade: true,
//             dots: true,
//             infinite: true,
//             speed: 800,
//             slidesToShow: 1,
//             slidesToScroll: 1,
//             arrows: false,
//             vertical: true,
//             autoplay: true,
//             autoplaySpeed: 2000,
//         };

//         return (
//             <div id='header-carousel' className='xl:max-h-[42dvh]'>
//                 <Slider {...settings} className='flex flex-nowrap overflow-hidden relative mt-4 justify-center'>
//                     {headerPostItem.map(item => (
//                         <img key={item.id} className='rounded-2xl w-[100dvw] max-h-[40dvh]' src={item.imageSrc} alt="" />
//                     ))}
//                 </Slider>
//             </div>
//         );
//     }

//     const TrendingList = () => {
//         const countItemNum = useRef(1);
//         const countItemId = useRef(0);
//         /////////////////////////////////////////////////////////////////////////////////////////////
//         const [addFav, setAddFav] = useState(trendingListItem);
//         /////////////////////////////////////////////////////////////////////////////////////////////
//         for (let i = 0; i < addFav.length; i++) {
//             addFav[i].id = countItemId.current++;
//         }
//         console.log(addFav);
//         function addToFavourite(indexId) {
//             const favIndex = addFav.slice();
//             const itemClick = favIndex.find(item => item.id === indexId);
//             itemClick.isFavourite = !itemClick.isFavourite;
//             ///////////////////////////////
//             // before set favlist set in all array fav
//             favouriteList.push(itemClick);
//             countItemNum.current = 1;
//             ///////////////////////////////
//             setAddFav(favIndex);
//             ///////////////////////////////
//             // before rerender set database by addFav array
//             ///////////////////////////////
//             return;
//         }

//         return (
//             <div id='trending-list' className='me-6'>
//                 <div className='flex justify-between items-center mt-4 mb-1'>
//                     <h1 className='font-semibold inline-block text-3xl'>Trending</h1>
//                     <a href="#" className='underline text-custom-blue xl:text-base lg:text-sm'>See all</a>
//                 </div>
//                 <div className='music-list xl:h-[40dvh] overflow-auto pe-3 ps-1'>
//                     {addFav.map(item => (
//                         <div id={'item-' + item.id + ''} key={item.id} className='music-item w-full flex items-center justify-between py-[10px] text-custom-black cursor-pointer'>
//                             <div id={item.id} className='w-full flex items-center gap-5 border-l-4 border-transparent play-music'>
//                                 <span className='w-[12px] text-[15px] font-semibold opacity-50 ms-2'>{(() => {
//                                     if (countItemNum.current < 10) {
//                                         return '0' + countItemNum.current++;
//                                     } else {
//                                         return countItemNum.current++;
//                                     }
//                                 })()}</span>
//                                 <img className='2xl:w-[65px] xl:w-[60px] lg:w-[55px] shadow-lg rounded-md' src={require(`../images/${item.imageSrc}`)} alt="" />
//                                 <div className='capitalize'>
//                                     <h2 className='font-bold text-lg'>{item.musicName}</h2>
//                                     <span className='opacity-40 text-[13px] block leading-4'>{item.artistName}</span>
//                                 </div>
//                             </div>
//                             <div className='w-2/5 relative flex items-center justify-end details-icon'>
//                                 <span className='text-custom-gray text-[12px] font-semibold'>{item.viewNumber}</span>
//                                 {(() => {
//                                     if (item.isFavourite) {
//                                         return <i className={'fi fi-ss-heart text-xl text-custom-pink mx-8 flex items-center cursor-pointer icon-favourite drop-shadow-sm'} onClick={() => addToFavourite(item.id)} ></i>;
//                                     } else if (item.isFavourite === false) {
//                                         return <i className={'fi fi-rs-heart text-xl hover:text-custom-pink mx-8 flex items-center cursor-pointer'} onClick={() => addToFavourite(item.id)} ></i>;
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
//             </div >
//         )

//     };

//     const TopArtist = () => {
//         // const [topArtist, setTopArtist] = useState(topArtistList)
//         // const randomTopArtist = [];
//         // const checkDuplicateNum = [];

//         // selectRandomNum();
//         // function selectRandomNum() {
//         //     // select random number
//         //     const itemNumber = Math.floor(Math.random() * topArtistList.length);
//         //     // add random number to checkDuplicateNum array for check in next step
//         //     checkDuplicateNum.push(itemNumber);
//         //     // check checkDuplicateNum array and remove duplicate number
//         //     const newArrayNum = checkDuplicateNum.filter((item, index) => checkDuplicateNum.indexOf(item) === index);
//         //     // check array length if index === 3 {set array for render item }
//         //     // else {return and play again selectRandomNum function}
//         //     if (newArrayNum.length < 3) {
//         //         selectRandomNum();
//         //     } else if (newArrayNum.length === 3) {
//         //         for (let i = 0; i < newArrayNum.length; i++) {
//         //             randomTopArtist.push(topArtistList[newArrayNum[i]])
//         //         }
//         //     }
//         // }
//         return (
//             <div className='xl:max-h-[42dvh] mt-14'>
//                 <div className='flex justify-between items-center mt-6'>
//                     <h1 className='font-semibold inline-block text-3xl'>Top Artist</h1>
//                     <a href="#" className='underline text-custom-blue xl:text-base lg:text-sm'>See all</a>
//                 </div>
//                 <div className='w-full top-artist-list'>
//                     {/* {randomTopArtist.map(item => (
//                         <div key={item.id} className='flex justify-between items-center xl:my-[1dvw] my-2 cursor-pointer relative' >
//                             <div className='flex'>
//                                 <img className='2xl:w-[4.5dvw] xl:w-[60px] shadow-lg rounded-lg' src={item.imageSrc} alt="" />
//                                 <div className='flex flex-col justify-center ms-3'>
//                                     <h2 className='xl:text-lg 2xl:text-xl font-semibold capitalize'>{item.artistName}</h2>
//                                     <span className='inline-block xl:text-[12px] 2xl:text-[13px] text-custom-gray font-semibold'> {item.followersNum} followers</span>
//                                 </div>
//                             </div>
//                             <Menu>
//                                 <MenuButton className="py-1.5 px-3 font-semibold">
//                                     <MoreIcon className='w-[18px] cursor-pointer' />
//                                 </MenuButton>
//                                 <MenuItems
//                                     transition
//                                     className="absolute z-20 w-52 right-12 top-1 flex flex-col justify-around shadow-md bg-custom-black rounded-xl border p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)]  data-[closed]:scale-95 data-[closed]:opacity-0"
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
//                     ))
//                     } */}
//                     {topArtistList.map(item => (
//                         <div key={item.id} className='flex justify-between items-center xl:my-[1dvw] my-2 cursor-pointer relative' >
//                             <div className='flex'>
//                                 <img className='2xl:w-[4.5dvw] xl:w-[60px] shadow-lg rounded-lg' src={require(`../images/${item.imageSrc}`)} alt="" />
//                                 <div className='flex flex-col justify-center ms-3'>
//                                     <h2 className='xl:text-lg 2xl:text-xl font-semibold capitalize'>{item.artistName}</h2>
//                                     <span className='inline-block xl:text-[12px] 2xl:text-[13px] text-custom-gray font-semibold'> {item.followersNum} followers</span>
//                                 </div>
//                             </div>
//                             <Menu>
//                                 <MenuButton className="py-1.5 px-3 font-semibold">
//                                     <MoreIcon className='w-[18px] cursor-pointer' />
//                                 </MenuButton>
//                                 <MenuItems
//                                     transition
//                                     className="absolute z-20 w-52 right-12 top-1 flex flex-col justify-around shadow-md bg-custom-black rounded-xl border p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)]  data-[closed]:scale-95 data-[closed]:opacity-0"
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
//                     ))
//                     }
//                 </div>
//             </div >
//         )
//     }

//     const RecentFavourite = () => {
//         return (
//             <>
//                 <div className='flex justify-between items-center 2xl:mt-7 xl:mt-5 mb-1'>
//                     <h1 className='font-semibold inline-block text-3xl'>Recent Favourite</h1>
//                     <a href="#" className='underline text-custom-blue xl:text-base lg:text-sm'>See all</a>
//                 </div>
//                 <div className='recent-favourite flex flex-wrap overflow-auto xl:h-[40dvh]'>
//                     {recentFavList.map(item => (
//                         <div key={item.id} className='flex flex-col lg:basis-1/2 xl:basis-1/3 xl:p-3 p-4 pb-1 cursor-pointer' >
//                             <img className='rounded-xl drop-shadow-md' src={item.imageSrc} alt="" />
//                             <h2 className='font-bold text-lg mt-2'>{item.title}</h2>
//                             <h5 className='text-[12px] font-semibold opacity-50 line-clamp-2'>{item.subTitle}</h5>
//                         </div>
//                     ))}
//                 </div>
//             </>
//         );
//     }


//     return (
//         <>
//             <MusicPlayer getStyle='home' />
//             <section id='home-page' className='relative w-full bg-custom-white h-[100dvh] flex rounded-l-xl py-5 px-10'>
//                 <div className='left-section w-[60%] h-[100dvh]'>
//                     <h1 className='font-black block text-5xl'>Home</h1>
//                     <HeaderPostCarousel />
//                     <TrendingList />
//                 </div>
//                 <div className='right-section w-[40%] ps-8 z-[999]'>
//                     <SearchBox widthSize={false} />
//                     <TopArtist />
//                     <RecentFavourite />
//                 </div >
//             </section>
//         </>
//     );
// }

// export default Home;