/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */

// import logo from './images/logo.png';
import { useEffect, useRef, useState } from 'react';
import React from "react";
import Slider from "react-slick";
import $ from "jquery";
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

import { ReactComponent as Logo } from './images/logo.svg';
import { ReactComponent as MoreIcon } from './icons/more.svg';
import { ReactComponent as SearchIcon } from './icons/search.svg';
import { ReactComponent as PlayIcon } from './icons/play.svg';
import { ReactComponent as PauseIcon } from './icons/pause.svg';
import { ReactComponent as ShuffleIcon } from './icons/shuffle.svg';
import { ReactComponent as NextIcon } from './icons/next.svg';
import { ReactComponent as PrevIcon } from './icons/prev.svg';
import { ReactComponent as CloseIcon } from './icons/close.svg';
// regular icon
import { ReactComponent as HomeIcon } from './icons/regular/home.svg';
import { ReactComponent as MusicIcon } from './icons/regular/music.svg';
import { ReactComponent as HeartIcon } from './icons/regular/heart.svg';
import { ReactComponent as PlayListIcon } from './icons/regular/play-list.svg';
import { ReactComponent as RecentIcon } from './icons/regular/recent.svg';
import { ReactComponent as SettingIcon } from './icons/regular/setting.svg';
import { ReactComponent as NotificationIcon } from './icons/regular/notification.svg';
import { ReactComponent as DownloadIcon } from './icons/regular/download.svg';
// solid icon
import { ReactComponent as HomeSolidIcon } from './icons/solid/home-solid.svg';
import { ReactComponent as MusicSolidIcon } from './icons/solid/music-solid.svg';
import { ReactComponent as HeartSolidIcon } from './icons/solid/heart-solid.svg';
import { ReactComponent as PlayListSolidIcon } from './icons/solid/playlist-solid.svg';
import { ReactComponent as RecentSolidIcon } from './icons/solid/recent-solid.svg';
import { ReactComponent as SettingSolidIcon } from './icons/solid/setting-solid.svg';
import { ReactComponent as NotificationSolidIcon } from './icons/solid/notification-solid.svg';
import { ReactComponent as DownloadSolidIcon } from './icons/solid/download-solid.svg';


// carousel post image
// This array is taken from the database and desc by view number
const headerPostItem = [
    { id: 0, imageSrc: require('./images/33138010_8010266.png') },
    { id: 1, imageSrc: require('./images/33418152_8044927.png') },
    { id: 2, imageSrc: require('./images/33921407_8095756.png') },
    { id: 3, imageSrc: require('./images/34684748_8156480.png') },
]

// music infomation array
// This array is taken from the database and desc by view number
const trendingListItem = [
    { id: 0, imageSrc: require("./images/10604875_4512064.jpg"), isFavourite: false, musicLink: require('./musics/1.mp3'), musicName: "i'm good (blue)", artistName: "david guetta & rexha", viewNumber: "455 786 346" },
    { id: 1, imageSrc: require("./images/9802046_4219738.jpg"), isFavourite: false, musicLink: require('./musics/1.mp3'), musicName: "under the influence", artistName: "chris brown", viewNumber: "346 780 756" },
    { id: 2, imageSrc: require("./images/5237910_2688833.jpg"), isFavourite: false, musicLink: require('./musics/1.mp3'), musicName: "forget me", artistName: "lewis capaidi", viewNumber: "254 945 867" },
    { id: 3, imageSrc: require("./images/4464775_2372686.jpg"), isFavourite: false, musicLink: require('./musics/1.mp3'), musicName: "bad habit", artistName: "steve lacy", viewNumber: "103 560 567" },
    { id: 4, imageSrc: require("./images/10604875_4512064.jpg"), isFavourite: false, musicLink: require('./musics/1.mp3'), musicName: "don't you worry", artistName: "black eyed, shakira & david guetta", viewNumber: "100 000" },
    { id: 5, imageSrc: require("./images/9802046_4219738.jpg"), isFavourite: false, musicLink: require('./musics/1.mp3'), musicName: "test", artistName: "test", viewNumber: "100 000" },
    { id: 6, imageSrc: require("./images/5237910_2688833.jpg"), isFavourite: false, musicLink: require('./musics/1.mp3'), musicName: "test", artistName: "test", viewNumber: "100 000" },
    { id: 7, imageSrc: require("./images/4464775_2372686.jpg"), isFavourite: false, musicLink: require('./musics/1.mp3'), musicName: "test", artistName: "test", viewNumber: "100 000" },
    { id: 8, imageSrc: require("./images/10604875_4512064.jpg"), isFavourite: false, musicLink: require('./musics/1.mp3'), musicName: "i'm good (blue)", artistName: "david guetta & rexha", viewNumber: "455 786 346" },
    { id: 9, imageSrc: require("./images/9802046_4219738.jpg"), isFavourite: false, musicLink: require('./musics/1.mp3'), musicName: "under the influence", artistName: "chris brown", viewNumber: "346 780 756" },
    { id: 10, imageSrc: require("./images/5237910_2688833.jpg"), isFavourite: false, musicLink: require('./musics/1.mp3'), musicName: "forget me", artistName: "lewis capaidi", viewNumber: "254 945 867" },
    { id: 11, imageSrc: require("./images/4464775_2372686.jpg"), isFavourite: false, musicLink: require('./musics/1.mp3'), musicName: "bad habit", artistName: "steve lacy", viewNumber: "103 560 567" },
    { id: 12, imageSrc: require("./images/10604875_4512064.jpg"), isFavourite: false, musicLink: require('./musics/1.mp3'), musicName: "don't you worry", artistName: "black eyed, shakira & david guetta", viewNumber: "100 000" },
    { id: 13, imageSrc: require("./images/9802046_4219738.jpg"), isFavourite: false, musicLink: require('./musics/1.mp3'), musicName: "test", artistName: "test", viewNumber: "100 000" },
    { id: 14, imageSrc: require("./images/5237910_2688833.jpg"), isFavourite: false, musicLink: require('./musics/1.mp3'), musicName: "test", artistName: "test", viewNumber: "100 000" },
    { id: 15, imageSrc: require("./images/4464775_2372686.jpg"), isFavourite: false, musicLink: require('./musics/1.mp3'), musicName: "test", artistName: "test", viewNumber: "100 000" },
    { id: 16, imageSrc: require("./images/4464775_2372686.jpg"), isFavourite: true, musicLink: require('./musics/1.mp3'), musicName: "weekend", artistName: "remix", viewNumber: "100 000" },
]

// This array is taken from the database
const topArtistArray = [
    { id: 0, artistName: "Muse", imageSrc: require("./images/10604875_4512064.jpg"), followersNum: 124645 },
    { id: 1, artistName: "bring me the horizon", imageSrc: require("./images/9802046_4219738.jpg"), followersNum: 58349 },
    { id: 2, artistName: "ed sheeran", imageSrc: require("./images/4464775_2372686.jpg"), followersNum: 235545 },
    { id: 3, artistName: "under the influence", imageSrc: require("./images/9802046_4219738.jpg"), followersNum: 45663 },
    { id: 4, artistName: "i'm good(blue)", imageSrc: require("./images/10604875_4512064.jpg"), followersNum: 124645 },
    { id: 5, artistName: "test 1", imageSrc: require("./images/9802046_4219738.jpg"), followersNum: 58349 },
    { id: 6, artistName: "test 2", imageSrc: require("./images/4464775_2372686.jpg"), followersNum: 235545 },
    { id: 7, artistName: "bad habit", imageSrc: require("./images/9802046_4219738.jpg"), followersNum: 45663 },
]

// This array is taken from the database
const recentFavList = [
    { id: 0, imageSrc: require('./images/5237910_2688833.jpg'), title: 'Lorem ipsum', subTitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam itaque ipsam laudantium dolor voluptatum dicta quis' },
    { id: 1, imageSrc: require('./images/9802046_4219738.jpg'), title: 'Lorem ipsum', subTitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam itaque ipsam laudantium dolor voluptatum dicta quis' },
    { id: 2, imageSrc: require('./images/4464775_2372686.jpg'), title: 'Lorem ipsum', subTitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam itaque ipsam laudantium dolor voluptatum dicta quis' },
    { id: 3, imageSrc: require('./images/10604875_4512064.jpg'), title: 'Lorem ipsum', subTitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam itaque ipsam laudantium dolor voluptatum dicta quis' },
    { id: 4, imageSrc: require('./images/9802046_4219738.jpg'), title: 'Lorem ipsum', subTitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam itaque ipsam laudantium dolor voluptatum dicta quis' },
    { id: 5, imageSrc: require('./images/9802046_4219738.jpg'), title: 'Lorem ipsum', subTitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam itaque ipsam laudantium dolor voluptatum dicta quis' },
    { id: 6, imageSrc: require('./images/4464775_2372686.jpg'), title: 'Lorem ipsum', subTitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam itaque ipsam laudantium dolor voluptatum dicta quis' },
];

const notificationList = [
    { id: 0, imageSrc: require('./images/10604875_4512064.jpg'), title: 'test', subTitle: 'test teadfmk dfm dfbdbstrhj' },
    { id: 1, imageSrc: require('./images/10604875_4512064.jpg'), title: 'test', subTitle: 'test teadfmk dfm dfbdbstrhj' },
    { id: 2, imageSrc: require('./images/10604875_4512064.jpg'), title: 'test', subTitle: 'test teadfmk dfm dfbdbstrhj' },
    { id: 3, imageSrc: require('./images/10604875_4512064.jpg'), title: 'test', subTitle: 'test teadfmk dfm dfbdbstrhj' },
    { id: 4, imageSrc: require('./images/10604875_4512064.jpg'), title: 'test', subTitle: 'test teadfmk dfm dfbdbstrhj' },
    { id: 5, imageSrc: require('./images/10604875_4512064.jpg'), title: 'test', subTitle: 'test teadfmk dfm dfbdbstrhj' },
    { id: 6, imageSrc: require('./images/10604875_4512064.jpg'), title: 'test', subTitle: 'test teadfmk dfm dfbdbstrhj' },
]

const Navbar = () => {

    const navItems = [
        { id: 0, sectionId: 'home-page', isActive: true, icon: HomeIcon, iconSolid: HomeSolidIcon },
        { id: 1, sectionId: 'all-music-page', isActive: false, icon: MusicIcon, iconSolid: MusicSolidIcon },
        { id: 2, sectionId: 'favourite-page', isActive: false, icon: HeartIcon, iconSolid: HeartSolidIcon },
        { id: 3, sectionId: 'play-list-page', isActive: false, icon: PlayListIcon, iconSolid: PlayListSolidIcon },
        { id: 4, sectionId: 'recent-play-page', isActive: false, icon: RecentIcon, iconSolid: RecentSolidIcon },
        { id: 5, sectionId: 'download-page', isActive: false, icon: DownloadIcon, iconSolid: DownloadSolidIcon },
        { id: 6, sectionId: 'setting-page', isActive: false, icon: SettingIcon, iconSolid: SettingSolidIcon },
    ];

    const [iconFont, setIconFont] = useState(navItems);

    function handleClick(indexId) {
        for (let i = 0; i < navItems.length; i++) {
            iconFont[i].isActive = false;
            $("#" + iconFont[i].sectionId + "").removeClass('flex');
            $("#" + iconFont[i].sectionId + "").addClass('hidden');
        }
        $("#" + iconFont[indexId].sectionId + "").removeClass('hidden');
        $("#" + iconFont[indexId].sectionId + "").addClass('flex');
        const nextIconFont = iconFont.slice();
        nextIconFont[indexId].isActive = true;
        setIconFont(nextIconFont);
        <RenderNavIcon />
        return;
    }

    function RenderNavIcon() {
        return (
            iconFont.map(item => (
                <li key={item.id} className='nav-item w-[45px] py-3 cursor-pointer' onClick={() => handleClick(item.id)}>
                    {(() => {
                        if (item.isActive) {
                            return <item.iconSolid className='w-[19px] inline-block active' />;
                        } else if (item.isActive === false) {
                            return <item.icon className='w-[19px] inline-block' />;
                        }
                    })()}
                </li>
            ))
        );
    }

    return (
        <nav id='navbar' className='w-[70px] h-[100dvh] min-h-[500px] relative flex flex-col justify-center text-center'>
            <ul className='flex flex-col items-center'>
                <Logo className='inline-block absolute top-6' />
                <RenderNavIcon className='text-[16px]' />
            </ul>
        </nav>
    );
}

const MusicPlayer = () => {
    const [musicPlayerShow, setMusicPlayerShow] = useState(false);
    const [musicDetails, setMusicDetails] = useState([trendingListItem[0]]);
    useEffect(() => {
        $('#music-player .close-music-player div').on("click", function () {
            $('#home-page').removeClass("animate-slide-right");
            $('#home-page').addClass("animate-slide-left");
            $('#music-player').hide();
            return;
        });
        $('#home-page .music-list .music-item div:first-child').on("click", function (e) {
            const elemIdClicked = e.currentTarget.id;
            if (musicPlayerShow === false) {
                handleMarginClick();
                setMusicDetails(trendingListItem[elemIdClicked]);
                $(e.currentTarget).removeClass('border-transparent');
                $(e.currentTarget).addClass('border-custom-pink');
            } else {
                $('#home-page .music-list .music-item div').removeClass('border-custom-pink');
                $('#home-page .music-list .music-item div').addClass('border-transparent');
                $(e.currentTarget).removeClass('border-transparent');
                $(e.currentTarget).addClass('border-custom-pink');
                setMusicDetails(trendingListItem[elemIdClicked]);
            }

            function handleMarginClick() {
                setMusicPlayerShow(!musicPlayerShow);
                $('#music-player').show();
                $('#home-page').addClass("animate-slide-right");
                return;
            }
        });
    });

    const randomNextComposition = [];
    const checkDuplicateNumComposition = [];

    selectRandomNum();
    function selectRandomNum() {
        // select random number
        const itemNumber = Math.floor(Math.random() * trendingListItem.length);

        // add random number to checkDuplicateNum array for check in next step
        checkDuplicateNumComposition.push(itemNumber);
        // check checkDuplicateNumComposition array and remove duplicate number
        const newArrayNum = checkDuplicateNumComposition.filter((item, index) => checkDuplicateNumComposition.indexOf(item) === index);
        // check array length if index === 3 {set array for render item }
        // else {return and play again selectRandomNum function}
        if (newArrayNum.length < 7) {
            selectRandomNum();
        } else if (newArrayNum.length === 7) {
            for (let i = 0; i < newArrayNum.length; i++) {
                randomNextComposition.push(trendingListItem[newArrayNum[i]]);
            }
        }
    }

    function handleClick(action) {
        const musicIdIsPlay = musicDetails.id;
        const lastMusic = trendingListItem.length - 1;
        if (action === 'next') {
            if (musicIdIsPlay === lastMusic) {
                console.log(musicDetails);
                setMusicDetails(trendingListItem[0]);
            } else {
                console.log(musicDetails);
                setMusicDetails(trendingListItem[musicIdIsPlay + 1]);
            }
        }
        console.log(lastMusic);

        if (action === 'prev') {
            if (musicIdIsPlay === 0) {
                console.log(lastMusic);
                setMusicDetails(trendingListItem[lastMusic]);
            } else {
                console.log(musicDetails);
                setMusicDetails(trendingListItem[musicIdIsPlay - 1]);
            }
        }
    }

    return (
        <div id='music-player' className='absolute bg-bg-image h-[100dvh] min-h-[750px] w-[38%] ms-[70px] hidden'>
            <img className='absolute bg-image h-full min-h-[750px] -z-10 bg-black opacity-50' src={musicDetails.imageSrc} alt="" />
            <div className='z-0 relative'>
                <div className='h-[35dvh] min-h-[260px] relative overflow-hidden ms-1 shadow-inner'>
                    <div className='close-music-player flex justify-between px-5 items-center mt-6'>
                        <h1 className='font-semibold text-custom-white inline-block text-3xl'>Next Composition</h1>
                        <div className='relative -right-6 bg-custom-white w-[60px] p-[6px] rounded-l-full cursor-pointer'>
                            <CloseIcon className='w-[30px] h-[30px]' />
                        </div>
                    </div>
                    <div className='absolute overflow-visible flex items-center flex-nowrap flex-row z-0 ps-3 mt-3'>
                        {randomNextComposition.map(item => (
                            <div key={item.id} className='bg-custom-black relative mx-3 rounded-2xl w-[200px] basis-[180px]'>
                                <img className='rounded-2xl opacity-90 h-full w-full object-cover' src={item.imageSrc} alt="" />
                            </div>
                        ))}
                    </div>
                </div>
                <AudioPlayer
                    className='mt-[30px] m-auto rounded-2xl flex flex-col audio-player'
                    preload='metadata'
                    // autoPlayAfterSrcChange={true}
                    src={musicDetails.musicLink}
                    header={
                        <div className='flex flex-col items-center mb-3'>
                            <img className='w-[60%] rounded-xl' src={musicDetails.imageSrc} alt="" />
                            <div className='font-semibold text-custom-white text-2xl mt-2 capitalize'>{musicDetails.musicName}</div>
                            <div className='font-medium text-custom-white text-md capitalize'>{musicDetails.artistName}</div>
                        </div>
                    }
                    style={{
                        backgroundColor: '#2A252B',
                        width: '60%',
                        opacity: '0.98',
                        padding: '18px 14px',
                    }}
                    customControlsSection={
                        [
                            RHAP_UI.LOOP,
                            RHAP_UI.MAIN_CONTROLS,
                            <ShuffleIcon className='cursor-pointer' />,
                        ]
                    }
                    // onPause={true}
                    customVolumeControls={[]}
                    showSkipControls={true}
                    showJumpControls={false}
                    customIcons={{
                        play: <div className='bg-custom-white m-auto play-icon flex justify-center items-center w-[50px] h-[50px] rounded-full cursor-pointer' >
                            <PlayIcon className='w-[20px] inline-block ' />
                        </div>,
                        pause: <div className='bg-custom-white m-auto play-icon flex justify-center items-center w-[50px] h-[50px] rounded-full cursor-pointer' >
                            <PauseIcon className='w-[20px] inline-block ' />
                        </div>,
                        previous: <PrevIcon className='w-[30px] cursor-pointer' onClick={() => handleClick('prev')} />,
                        next: <NextIcon className='ms-1 w-[30px] cursor-pointer' onClick={() => handleClick('next')} />,
                        rewind: <ShuffleIcon className='-ms-2 w-[20px] cursor-pointer' />,
                    }}
                />
            </div>
        </div >
    );
}

const Home = () => {

    const HeaderPostCarousel = () => {
        // carousel setting
        const settings = {
            fade: true,
            dots: true,
            infinite: true,
            speed: 800,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            vertical: true,
            autoplay: true,
            autoplaySpeed: 2000,
        };

        return (
            <div id='header-carousel' className=''>
                <Slider {...settings} className='poster-show mt-4 justify-center'>
                    {headerPostItem.map(item => (
                        <img key={item.id} className='rounded-2xl w-[100dvw] xl:h-[260px] 2xl:h-[300px]' src={item.imageSrc} alt="" />
                    ))}
                </Slider>
            </div>
        );
    }

    const TrendingList = () => {

        const [addFav, setAddFav] = useState(trendingListItem);

        function addToFavourite(indexId) {
            const nextFavIcon = addFav.slice();
            const itemClick = nextFavIcon[indexId];
            itemClick.isFavourite = !itemClick.isFavourite;
            setAddFav(nextFavIcon);
            ///////////////////////////////
            // before rerender set database by addFav array
            ///////////////////////////////
            return;
        }

        return (
            <div id='trending-list' className='me-6'>
                <div className='flex justify-between items-center mt-5'>
                    <h1 className='font-semibold inline-block text-3xl'>Trending</h1>
                    <a href="#" className='underline text-custom-blue'>See all</a>
                </div>
                <div className='music-list ps-1 h-[50dvh] overflow-auto pe-3 first:mt-0 last:pb-20'>
                    {addFav.map(item => (
                        <div key={item.id} className='music-item w-full flex items-center justify-between py-[10px] text-custom-black cursor-pointer'>
                            <div id={item.id} className='w-full flex items-center gap-5 border-l-4 border-transparent'>
                                <span className='w-[10px] font-semibold opacity-50 ms-2'>{item.id + 1}</span>
                                <img className='xl:w-[55px] 2xl:w-[60px] shadow-lg rounded-lg' src={item.imageSrc} alt="" />
                                <div className='capitalize'>
                                    <h2 className='font-bold text-lg'>{item.musicName}</h2>
                                    <span className='opacity-40 text-[13px] block leading-4'>{item.artistName}</span>
                                </div>
                            </div>
                            {/* <div className='w-1/5 text-right font-semibold text-sm'>
                                {item.musicTime}
                            </div> */}
                            <div className='w-2/5 flex items-center justify-end details-icon'>
                                <span className='text-custom-gray text-[12px] font-semibold'>{item.viewNumber}</span>
                                {(() => {
                                    if (item.isFavourite) {
                                        return <HeartSolidIcon className={'w-[20px] mx-8 cursor-pointer icon-favourite drop-shadow-s'} onClick={() => addToFavourite(item.id)} />;
                                    } else if (item.isFavourite === false) {
                                        return <HeartIcon className={'w-[20px] mx-8 cursor-pointer'} onClick={() => addToFavourite(item.id)} />;
                                    }
                                })()}
                                <MoreIcon className='w-[18px] cursor-pointer' />
                            </div>
                        </div>
                    ))}
                </div>
            </div >
        )

    };

    const TopArtist = () => {
        const randomTopArtist = [];
        const checkDuplicateNum = [];

        selectRandomNum();
        function selectRandomNum() {
            // select random number
            const itemNumber = Math.floor(Math.random() * topArtistArray.length);
            // add random number to checkDuplicateNum array for check in next step
            checkDuplicateNum.push(itemNumber);
            // check checkDuplicateNum array and remove duplicate number
            const newArrayNum = checkDuplicateNum.filter((item, index) => checkDuplicateNum.indexOf(item) === index);
            // check array length if index === 3 {set array for render item }
            // else {return and play again selectRandomNum function}
            if (newArrayNum.length < 3) {
                selectRandomNum();
            } else if (newArrayNum.length === 3) {
                for (let i = 0; i < newArrayNum.length; i++) {
                    randomTopArtist.push(topArtistArray[newArrayNum[i]])
                }
            }
        }
        return (
            <div className='xl:h-[260px] 2xl:h-[300px] mt-14'>
                <div className='flex justify-between items-center mt-6'>
                    <h1 className='font-semibold inline-block text-3xl'>Top Artist</h1>
                    <a href="#" className='underline text-custom-blue'>See all</a>
                </div>
                <div className='w-full top-artist-list'>
                    {randomTopArtist.map(item => (
                        <div key={item.id} className='flex justify-between items-center 2xl:my-4 xl:my-3 cursor-pointer' >
                            <div className='flex'>
                                <img className='xl:w-[60px] 2xl:w-[65px] shadow-lg rounded-lg' src={item.imageSrc} alt="" />
                                <div className='flex flex-col justify-center ms-3'>
                                    <h2 className='xl:text-lg 2xl:text-xl font-semibold capitalize'>{item.artistName}</h2>
                                    <span className='inline-block xl:text-[12px] 2xl:text-[13px] text-custom-gray font-semibold'> {item.followersNum} followers</span>
                                </div>
                            </div>
                            <MoreIcon className='w-[18px] cursor-pointer' />
                        </div>
                    ))
                    }
                </div>
            </div >
        )
    }

    const RecentFavourite = () => {
        return (
            <div>
                <div className='flex justify-between items-center mt-6'>
                    <h1 className='font-semibold inline-block text-3xl'>Recent Favourite</h1>
                    <a href="#" className='underline text-custom-blue'>See all</a>
                </div>
                <div className='recent-favourite flex flex-wrap overflow-auto h-[50dvh] last:pb-20'>
                    {recentFavList.map(item => (
                        <div key={item.id} className='flex flex-col lg:basis-1/2 2xl:basis-1/3 p-3 pb-1 cursor-pointer' >
                            <img className='rounded-xl drop-shadow-md' src={item.imageSrc} alt="" />
                            <h2 className='font-bold text-lg mt-2'>{item.title}</h2>
                            <h5 className='text-[12px] font-semibold opacity-50 line-clamp-2'>{item.subTitle}</h5>
                        </div>
                    ))}
                </div>
            </div >
        );
    }

    const SearchBox = () => {
        const [isClickIcon, setIsClickIcon] = useState(false);
        function changeNotificationIcon() {
            setIsClickIcon(!isClickIcon);
        }
        return (
            <div className='flex items-center justify-end w-[500px] fixed top-4 right-10 z-30'>
                <div className='relative mx-5'>
                    <span className='w-[12px] h-[12px] border-2 border-white rounded-full bg-custom-blue inline-block absolute -right-[1px] -top-[2px]'></span>
                    {(() => {
                        if (isClickIcon) {
                            return <NotificationSolidIcon className='w-[21px] cursor-pointer' onClick={changeNotificationIcon} />;
                        } else {
                            return <NotificationIcon className='w-[21px] cursor-pointer' onClick={changeNotificationIcon} />;
                        }
                    })()}
                    <div className={isClickIcon ? 'inline' : 'hidden'}>
                        <span className='absolute border-l-2 border-t-2 top-[34px] left-0 w-5 h-5 rotate-45 bg-custom-white z-10'></span>
                        <div className='absolute top-11 -left-8 w-[400px] h-[350px] flex flex-col flex-nowrap overflow-auto border-2 bg-custom-white shadow-xl rounded-lg'>
                            {notificationList.map(item => (
                                <div key={item.id} className='relative flex z-20 p-2 border-b gap-3'>
                                    <img className='w-[65px] rounded-md' src={item.imageSrc} alt="" />
                                    <div className='flex flex-col justify-center'>
                                        <h2 className='text-lg font-semibold'>{item.title}</h2>
                                        <span className='text-sm text-gray-400'>{item.subTitle}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <form className='search-box relative w-[70%] bg-custom-white p-2 rounded-lg shadow-md' action='#'>
                    <label for="search-music" className='absolute'>
                        <SearchIcon className='w-[16px]' />
                    </label>
                    <input type="text" className='ms-[22px] w-11/12 bg-custom-white outline-none text-[15px]' id='search-music' placeholder='Search' />
                </form>
            </div>
        )
    }
    return (
        <section id='home-page' className='relative w-full bg-custom-white h-[100dvh] flex rounded-l-xl py-5 px-10'>
            <div className='left-section w-[60%] h-[100dvh]'>
                <h1 className='font-black block text-5xl'>Home</h1>
                <HeaderPostCarousel />
                <TrendingList />
            </div>
            <div className='right-section w-[40%] ps-8 z-[999]'>
                <SearchBox />
                <TopArtist />
                <RecentFavourite />
            </div >
        </section >
    );
}

const AllMusic = () => {
    return (
        <section id='all-music-page' className='relative w-full bg-custom-white h-[100dvh] hidden rounded-l-xl py-5 px-10'>
            <div className='left-section w-[60%] h-[100dvh]'>
                <h1 className='font-black block text-4xl'>All Song</h1>

            </div>
            <div className='right-section w-[40%] ps-8 z-[999]'>

            </div >
        </section >
    );
}

const Favourite = () => {
    return (
        <section id='favourite-page' className='relative w-full bg-custom-white h-[100dvh] hidden rounded-l-xl py-5 px-10'>
            <div className='left-section w-[60%] h-[100dvh]'>
                {/* <h1 className='font-black block text-5xl'>Home</h1> */}

            </div>
            <div className='right-section w-[40%] ps-8 z-[999]'>

            </div >
        </section >
    );
}

const PlayList = () => {
    return (
        <section id='play-list-page' className='relative w-full bg-custom-white h-[100dvh] hidden rounded-l-xl py-5 px-10'>
            <div className='left-section w-[60%] h-[100dvh]'>
                <h1 className='font-black block text-5xl'>Home</h1>

            </div>
            <div className='right-section w-[40%] ps-8 z-[999]'>

            </div >
        </section >
    );
}

const Download = () => {
    return (
        <section id='download-page' className='relative w-full bg-custom-white h-[100dvh] hidden rounded-l-xl py-5 px-10'>
            <div className='left-section w-[60%] h-[100dvh]'>
                {/* <h1 className='font-black block text-5xl'>Home</h1> */}

            </div>
            <div className='right-section w-[40%] ps-8 z-[999]'>

            </div >
        </section >
    );
}

const Recent = () => {
    return (
        <section id='recent-play-page' className='relative w-full bg-custom-white h-[100dvh] hidden rounded-l-xl py-5 px-10'>
            <div className='left-section w-[60%] h-[100dvh]'>
                <h1 className='font-black block text-5xl'>Home</h1>

            </div>
            <div className='right-section w-[40%] ps-8 z-[999]'>

            </div >
        </section >
    );
}

const Setting = () => {
    return (
        <section id='setting-page' className='relative w-full bg-custom-white h-[100dvh] hidden rounded-l-xl py-5 px-10'>
            <div className='left-section w-[60%] h-[100dvh]'>
                <h1 className='font-black block text-5xl'>Home</h1>

            </div>
            <div className='right-section w-[40%] ps-8 z-[999]'>

            </div >
        </section >
    );
}


export default function App() {
    return (
        <>
            <Navbar />
            <MusicPlayer />
            <Home />
            <AllMusic />
            <Favourite />
            <PlayList />
            <Recent />
            <Download />
            <Setting />
        </>
    );
}