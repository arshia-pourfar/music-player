/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import React from "react";
import $ from "jquery";
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import useFetchData from '../hooks/useFetchData';
import { useAuth } from "../hooks/AuthContext";
export const MusicPlayer = ({ getStyle }) => {
    const { user } = useAuth();
    const { data: allMusicList } = useFetchData('/api/allmusiclist', 'GET', null, true);
    const { data: trendingListItem } = useFetchData('/api/trendinglist', 'GET', null, true);
    const { data: favouriteList, setUrl, fetchData } = useFetchData(`/api/${user ? user.id : 0}/favoriteslist`, 'GET', null, true);

    useEffect(() => {
        if (user) {
            setUrl(`/api/${user ? user.id : 0}/favoriteslist`);
            fetchData();
        }
    }, [user, setUrl, fetchData]);


    const [musicPlayerShow, setMusicPlayerShow] = useState(false);
    const [musicDetails, setMusicDetails] = useState([]);
    const ifFirstPlay = useRef(true);

    const showMusicPlayer = (elemClicked, sectionId, loadArray = []) => {
        if (!Array.isArray(loadArray) || loadArray.length === 0) {
            if (!musicPlayerShow && elemClicked) {
                $('#home-page .close-music-player').removeClass("hidden").addClass("inline-block");
                $('.bottom-music-player').removeClass("animate-slide-down").addClass("animate-slide-up");
                $('.bottom-music-player .close-bottom-music-player i').removeClass("rotate-180 mb-5").addClass("rotate-0 mb-0");
                setMusicPlayerShow(true);
            } else if (musicPlayerShow && elemClicked) {
                $('#home-page').removeClass("animate-slide-right").addClass("animate-slide-left");
                $('#home-page .close-music-player').removeClass("inline-block").addClass("hidden");
                $('.bottom-music-player').removeClass("animate-slide-up").addClass("animate-slide-down");
                $('.bottom-music-player .close-bottom-music-player i').removeClass("rotate-0 mb-0").addClass("rotate-180 mb-5");
                setMusicPlayerShow(false);
            }
            console.error('Load array is null or empty');
            return;
        }

        $('.bottom-music-player').show();
        if (elemClicked) {
            const itemClickedIndex = loadArray[parseInt(elemClicked.currentTarget.id)];

            if (itemClickedIndex === -1) {
                console.error('Item not found in the array');
                return;
            }

            $('#' + sectionId + ' .music-player audio').attr('autoplay', 'true');
            $('.music-list .music-item div').removeClass('border-custom-pink').addClass('border-transparent');
            $(elemClicked.currentTarget).removeClass('border-transparent').addClass('border-custom-pink');
            setMusicDetails(itemClickedIndex);

            if (sectionId === 'home-music-player') {
                handleMarginClick();
            }
        }

        if (musicPlayerShow === false) {
            $('#home-page .close-music-player').removeClass("hidden").addClass("inline-block");
            $('.bottom-music-player').removeClass("animate-slide-down").addClass("animate-slide-up");
            $('.bottom-music-player .close-bottom-music-player div').removeClass("rotate-180").addClass("rotate-0");
            setMusicPlayerShow(true);
        } else {
            $('#home-page .close-music-player').removeClass("inline-block").addClass("hidden");
            $('#home-page').removeClass("animate-slide-right").addClass("animate-slide-left");
            $('.bottom-music-player').removeClass("animate-slide-up").addClass("animate-slide-down");
            $('.bottom-music-player .close-bottom-music-player div').removeClass("rotate-0").addClass("rotate-180");
            setMusicPlayerShow(false);
        }

    };
    const handleMarginClick = () => {
        setMusicPlayerShow(!musicPlayerShow);
        $('#home-music-player').show();
        $('#home-page').addClass("animate-slide-right");
    };

    const handleClick = (action, sectionId, loadArray) => {
        if (!loadArray || loadArray.length === 0) {
            console.error('Load array is null or empty');
            return;
        }
        // for (let i = 0; i < loadArray.length; i++) {
        //     loadArray[i].id = i;
        // }

        const musicIdIsPlay = musicDetails.newId;
        const borderLeftStyleNext = musicDetails.newId + 1;
        const borderLeftStylePrev = musicDetails.newId - 1;
        const lastMusic = loadArray.length - 1;
        $('.music-list .music-item div').removeClass('border-custom-pink').addClass('border-transparent');
        if (action === 'next') {
            let targetId = (borderLeftStyleNext > lastMusic) ? '0' : borderLeftStyleNext;
            $('#' + sectionId + ' #' + targetId).removeClass('border-transparent').addClass('border-custom-pink');
            setMusicDetails(musicIdIsPlay === lastMusic ? loadArray[0] : loadArray[musicIdIsPlay + 1]);
        }

        if (action === 'prev') {
            let targetId = (borderLeftStylePrev < 0) ? lastMusic : borderLeftStylePrev;
            $('#' + sectionId + ' #' + targetId).removeClass('border-transparent').addClass('border-custom-pink');
            setMusicDetails(musicIdIsPlay === 0 ? loadArray[lastMusic] : loadArray[musicIdIsPlay - 1]);
        }
    };
    useEffect(() => {
        const eventHandlers = [
            { selector: '.bottom-music-player .close-bottom-music-player,#home-page .close-music-player', action: () => showMusicPlayer(true, null, []) },
            { selector: '#home-page .music-list .music-item .play-music', action: (e) => !musicPlayerShow && trendingListItem && showMusicPlayer(e, 'home-music-player', trendingListItem) },
            { selector: '#all-music-page .music-list .music-item .play-music', action: (e) => !musicPlayerShow && allMusicList && showMusicPlayer(e, 'all-music-page', allMusicList) },
            { selector: '#favourite-page .music-list .music-item .play-music', action: (e) => !musicPlayerShow && favouriteList && showMusicPlayer(e, 'favourite-page', favouriteList) },
            { selector: '#home-music-player .music-player .prev-icon', action: () => handleClick('prev', 'home-page', trendingListItem || []) },
            { selector: '#home-music-player .music-player .next-icon', action: () => handleClick('next', 'home-page', trendingListItem || []) },
            { selector: '#all-music-page .music-player .prev-icon', action: () => handleClick('prev', 'all-music-page', allMusicList || []) },
            { selector: '#all-music-page .music-player .next-icon', action: () => handleClick('next', 'all-music-page', allMusicList || []) },
            { selector: '#favourite-page .music-player .prev-icon', action: () => handleClick('prev', 'favourite-page', favouriteList || []) },
            { selector: '#favourite-page .music-player .next-icon', action: () => handleClick('next', 'favourite-page', favouriteList || []) }
        ];

        eventHandlers.forEach(({ selector, action }) => {
            $(document).on("click", selector, action);
        });
    }, [musicPlayerShow, trendingListItem, allMusicList, musicDetails, favouriteList]);

    if (getStyle === 'home') {
        return (
            <div id='home-music-player' className='absolute left-[75px] h-[100dvh] min-h-[750px] w-[38%] hidden'>
                <img className='absolute bg-image h-full min-h-[750px] -z-10 bg-black opacity-50' src={(() => {
                    if (musicPlayerShow === true && ifFirstPlay.current === true) {
                        ifFirstPlay.current = false;
                        return (
                            `/images/${musicDetails.imagesrc}`
                        )
                    } else if (ifFirstPlay.current === false) {
                        return (
                            `/images/${musicDetails.imagesrc}`

                        )
                    }
                })()} alt="" />
                <div className='z-0 relative'>
                    <div className='h-[35dvh] min-h-[260px] relative overflow-hidden ms-1 shadow-inner'>
                        {/* <div className='close-music-player flex justify-between px-5 items-center mt-6'>
                            <h1 className='font-semibold text-custom-white inline-block text-3xl'>Next Composition</h1>
                            <div className='relative -right-[29px] bg-custom-white w-[60px] p-[6px] rounded-l-full cursor-pointer'>
                                <i className='fi fi-rr-circle-xmark flex text-custom-black text-3xl'></i>
                            </div>
                        </div> */}
                        <h1 className='font-semibold text-custom-white inline-block text-3xl mx-5 mt-8'>Next Composition</h1>
                        <div className='absolute overflow-visible flex items-center flex-nowrap flex-row z-0 ps-3 mt-3'>
                            {/* insted trending list after set best allbums */}
                            {trendingListItem && Array.isArray(trendingListItem) ? trendingListItem.map((item, index) => (
                                <div key={item.id} className='bg-custom-black relative mx-3 rounded-2xl w-[200px] basis-[180px]'>
                                    <img className='rounded-2xl opacity-90 h-full w-full object-cover' src={`/images/${item.imagesrc}`} alt="" />
                                </div>
                            )) : null}
                        </div>
                    </div>
                    <AudioPlayer
                        className='mt-[20px] m-auto rounded-2xl flex flex-col music-player'
                        preload='metadata'
                        autoPlayAfterSrcChange={false}
                        src={(() => {
                            if (musicPlayerShow === true && ifFirstPlay.current === true) {
                                ifFirstPlay.current = false;
                                return (
                                    require(`../musics/${musicDetails.musiclink}`)
                                )
                            } else if (ifFirstPlay.current === false) {
                                return (
                                    require(`../musics/${musicDetails.musiclink}`)
                                )
                            }
                        })()}

                        header={
                            <div className='flex flex-col items-center mb-2'>
                                <img className='w-[65%] rounded-xl' src={(() => {
                                    if (musicPlayerShow === true && ifFirstPlay.current === true) {
                                        ifFirstPlay.current = false;
                                        return (
                                            `/images/${musicDetails.imagesrc}`
                                        )
                                    } else if (ifFirstPlay.current === false) {
                                        return (
                                            `/images/${musicDetails.imagesrc}`
                                        )
                                    }
                                })()} alt="" />
                                <div className='font-semibold text-custom-white text-2xl mt-2 capitalize'>{musicDetails.musicname}</div>
                                <div className='font-medium text-custom-white text-md capitalize'>{musicDetails.artistname}</div>
                            </div>
                        }
                        style={{
                            backgroundColor: '#2A252B',
                            width: '65%',
                            opacity: '0.9',
                            padding: '18px 14px',
                        }}
                        customProgressBarSection={
                            [
                                RHAP_UI.CURRENT_TIME,
                                RHAP_UI.PROGRESS_BAR,
                                RHAP_UI.DURATION,
                                // display none /////////////////////////////////////////////////////////
                                // <FavoriteIcon userId={user ? user.id : 0} songId={musicDetails.id} />
                                // display none /////////////////////////////////////////////////////////
                            ]
                        }
                        customControlsSection={
                            [
                                RHAP_UI.LOOP,
                                RHAP_UI.MAIN_CONTROLS,
                                <i className='fi fi-rs-shuffle text-2xl flex justify-center items-center text-custom-white'></i>,
                            ]
                        }
                        // onPause={true}
                        customVolumeControls={[]}
                        showSkipControls={true}
                        showJumpControls={false}
                        customIcons={{
                            play: <div className='bg-custom-white m-auto play-icon flex justify-center items-center w-[50px] h-[50px] rounded-full cursor-pointer' >
                                <i className='fi fi-sr-play text-2xl flex justify-center items-center text-custom-black'></i>
                            </div>,
                            pause: <div className='bg-custom-white m-auto play-icon flex justify-center items-center w-[50px] h-[50px] rounded-full cursor-pointer' >
                                <i className='fi fi-sr-pause text-2xl flex justify-center items-center text-custom-black'></i>
                            </div>,
                            previous:
                                <i className="fi fi-sr-step-backward prev-icon text-3xl flex justify-center items-center text-custom-white"></i>,
                            next:
                                <i className="fi fi-sr-step-forward next-icon text-3xl flex justify-center items-center text-custom-white"></i>,

                        }}
                    />
                </div>
            </div >
        );
    }
    if (getStyle === 'bottom') {
        return (
            <section id={musicDetails.id} className={'bottom-music-player absolute left-0 bottom-0 w-[96dvw] hidden animate-slide-down music-player z-[9999]'}>
                <AudioPlayer
                    className='flex justify-between items-center'
                    preload='metadata'
                    autoPlayAfterSrcChange={false}
                    src={(() => {
                        if (musicPlayerShow === true && ifFirstPlay.current === true) {
                            ifFirstPlay.current = false;
                            return (
                                require(`../musics/${musicDetails.musiclink}`)
                            )
                        } else if (ifFirstPlay.current === false) {
                            return (
                                require(`../musics/${musicDetails.musiclink}`)
                            )
                        }
                    })()}

                    header={
                        <div className='flex items-center w-[300px]'>
                            <img className='h-[70px] rounded-xl mx-5' src={(() => {
                                if (musicPlayerShow === true && ifFirstPlay.current === true) {
                                    ifFirstPlay.current = false;
                                    return (
                                        `/images/${musicDetails.imagesrc}`
                                    )
                                } else if (ifFirstPlay.current === false) {
                                    return (
                                        `/images/${musicDetails.imagesrc}`
                                    )
                                }
                            })()} alt="" />
                            <div className='flex flex-col'>
                                <h2 className='font-semibold text-custom-white text-xl line-clamp-1 capitalize'>{musicDetails.musicname}</h2>
                                <span className='font-medium text-custom-white text-sm line-clamp-1 capitalize'>{musicDetails.artistname}</span>
                            </div>
                        </div>
                    }
                    style={{
                        backgroundColor: '#BF795E',
                        width: '100%',
                        height: '100px',
                        position: 'absolute',
                        bottom: '0px',
                        left: '0px',
                        borderRadius: '0px 0px 0px 12px'
                    }}
                    customControlsSection={
                        [
                            <div className='mx-5'></div>,
                            // <FavoriteIcon userId={user ? user.id : 0} songId={musicDetails.id} />,
                            RHAP_UI.LOOP,
                            RHAP_UI.MAIN_CONTROLS,
                            <i className='fi fi-rs-shuffle text-2xl flex justify-center items-center text-custom-white'></i>,
                            <div className='mx-5'></div>,
                            RHAP_UI.CURRENT_TIME,
                            RHAP_UI.PROGRESS_BAR,
                            RHAP_UI.DURATION,
                            <div className='mx-5'></div>,
                            RHAP_UI.VOLUME,
                            <div className='mx-4'></div>,
                            <div className='close-bottom-music-player w-0'>
                                <div className='relative right-[100px] -top-[70px] bg-custom-brown h-[65px] w-[50px] flex items-center justify-center rounded-t-3xl cursor-pointer'>
                                    <i className='fi fi-sr-angle-down mb-0 text-custom-white text-2xl inline-block transition-all' />
                                </div>
                            </div>,
                        ]
                    }
                    customProgressBarSection={[]}
                    customVolumeControls={[]}
                    showSkipControls={true}
                    showJumpControls={false}
                    customIcons={{
                        play:
                            <div className='bg-custom-white m-auto play-icon flex justify-center items-center w-[50px] h-[50px] rounded-full cursor-pointer' >
                                <i className='fi fi-sr-play text-2xl flex justify-center items-center text-custom-black'></i>
                            </div>,
                        pause:
                            <div className='bg-custom-white m-auto play-icon flex justify-center items-center w-[50px] h-[50px] rounded-full cursor-pointer' >
                                <i className='fi fi-sr-pause text-2xl flex justify-center items-center text-custom-black'></i>
                            </div>,
                        previous:
                            <i className="fi fi-sr-step-backward prev-icon text-3xl flex justify-center items-center text-custom-white"></i>,
                        next:
                            <i className="fi fi-sr-step-forward next-icon text-3xl flex justify-center items-center text-custom-white"></i>,

                    }}
                />
            </section>
        );
    }
};

export default MusicPlayer;


// import { useEffect, useRef, useState } from 'react';
// import React from "react";
// import $ from "jquery";
// import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
// import 'react-h5-audio-player/lib/styles.css';
// // import trendingListItem from '../server/trendinglistDB'
// // import { allMusicList } from '../App';
// // import allMusicList from '../server/allmusiclistDB';
// import { ReactComponent as PlayIcon } from '../icons/play.svg';
// import { ReactComponent as PauseIcon } from '../icons/pause.svg';
// import { ReactComponent as ShuffleIcon } from '../icons/shuffle.svg';
// import { ReactComponent as NextIcon } from '../icons/next.svg';
// import { ReactComponent as CloseIcon } from '../icons/close.svg';
// import useFetchData from '../server/useFetchData';
// export const MusicPlayer = ({ getStyle }) => {
//     const { data: allMusicList, loading: allMusicLoading, error: allMusicError } = useFetchData('/api/allmusiclist');
//     const { data: trendingListItem, loading: trendingLoading, error: trendingError } = useFetchData('/api/trendinglist');
//     const [musicPlayerShow, setMusicPlayerShow] = useState(false);
//     const [musicDetails, setMusicDetails] = useState([]);
//     const ifFirstPlay = useRef(true);
//     function showMusicPlayer(elemClicked, sectionId, loadArray) {
//         $('.bottom-music-player').show();
//         if (elemClicked) {
//             const itemClickedIndexNum = loadArray.findIndex(item => item.id === parseInt(elemClicked.currentTarget.id));
//             $('#' + sectionId + ' .music-player audio').attr('autoplay', 'true');
//             $('.music-list .music-item div').removeClass('border-custom-pink');
//             $('.music-list .music-item div').addClass('border-transparent');
//             $(elemClicked.currentTarget).removeClass('border-transparent');
//             $(elemClicked.currentTarget).addClass('border-custom-pink');
//             setMusicDetails(loadArray[itemClickedIndexNum]);
//             console.log(loadArray[itemClickedIndexNum]);
//             if (sectionId === 'home-page') {
//                 handleMarginClick();
//             }
//         }

//         if (musicPlayerShow === false) {
//             $('.bottom-music-player').removeClass("animate-slide-down");
//             $('.bottom-music-player').addClass("animate-slide-up");
//             $('.bottom-music-player .close-bottom-music-player svg').removeClass("rotate-180");
//             $('.bottom-music-player .close-bottom-music-player svg').addClass("rotate-0");
//             setMusicPlayerShow(true);
//         } else if (musicPlayerShow === true) {
//             $('#home-page').removeClass("animate-slide-right");
//             $('#home-page').addClass("animate-slide-left");
//             $('.bottom-music-player').removeClass("animate-slide-up");
//             $('.bottom-music-player').addClass("animate-slide-down");
//             $('.bottom-music-player .close-bottom-music-player svg').removeClass("rotate-0");
//             $('.bottom-music-player .close-bottom-music-player svg').addClass("rotate-180");
//             setMusicPlayerShow(false);
//         }

//         function handleMarginClick() {
//             setMusicPlayerShow(!musicPlayerShow);
//             $('#home-music-player').show();
//             $('#home-page').addClass("animate-slide-right");
//             return;
//         }
//     }
//     function handleClick(action, sectionId, loadArray) {
//         $('#' + sectionId + ' .music-list .music-item div').removeClass('border-custom-pink');
//         $('#' + sectionId + ' .music-list .music-item div').addClass('border-transparent');
//         if (sectionId === 'home-music-player') {
//             const musicIdIsPlay = musicDetails.id;
//             setAction(musicIdIsPlay);
//         } else {
//             const musicIdIsPlay = musicDetails.id - 1;
//             setAction(musicIdIsPlay);
//         }
//         function setAction(musicIdIsPlay) {
//             const lastMusic = loadArray.length - 1;

//             if (action === 'next') {
//                 if (musicIdIsPlay === lastMusic) {
//                     setMusicDetails(loadArray[0]);
//                 } else {
//                     setMusicDetails(loadArray[musicIdIsPlay + 1]);
//                 }
//             }

//             if (action === 'prev') {
//                 if (musicIdIsPlay === 0) {
//                     setMusicDetails(loadArray[lastMusic]);
//                 } else {
//                     setMusicDetails(loadArray[musicIdIsPlay - 1]);
//                 }
//             }
//         }
//     }
//     // console.log(trendingListItem);
//     useEffect(() => {
//         $('.bottom-music-player .close-bottom-music-player,#home-music-player .close-music-player div').on("click", function () {
//             showMusicPlayer();
//         });
//         $('#home-page .music-list .music-item .play-music').on("click", function (e) {
//             $('#home-music-player .music-player audio').attr('autoplay', 'true');
//             if (musicPlayerShow === false) {
//                 showMusicPlayer(e, 'home-page', trendingListItem);
//             }
//         });
//         $('#all-music-page .music-list .music-item .play-music').on("click", function (e) {
//             $('#all-music-page .music-player audio').attr('autoplay', 'true');
//             if (musicPlayerShow === false) {
//                 showMusicPlayer(e, 'all-music-page', allMusicList);
//             }
//         });
//         $('#favourite-page .music-list .music-item .play-music').on("click", function (e) {
//             $('#favourite-page .music-player audio').attr('autoplay', 'true');
//             if (musicPlayerShow === false) {
//                 showMusicPlayer(e, 'favourite-page', allMusicList);
//             }
//         });
//         $('#home-music-player .music-player .prev-icon').on("click", function () {
//             handleClick('prev', 'home-music-player', trendingListItem);
//         });
//         $('#home-music-player .music-player .next-icon').on("click", function () {
//             handleClick('next', 'home-music-player', trendingListItem);
//         });
//         $('#all-music-page .music-player .prev-icon').on("click", function () {
//             handleClick('prev', 'all-music-page', allMusicList);
//         });
//         $('#all-music-page .music-player .next-icon').on("click", function () {
//             handleClick('next', 'all-music-page', allMusicList);
//         });
//         $('#favourite-page .music-player .prev-icon').on("click", function () {
//             handleClick('prev', 'favourite-page', allMusicList);
//         });
//         $('#favourite-page .music-player .next-icon').on("click", function () {
//             handleClick('next', 'favourite-page', allMusicList);
//         });
//     });

//     // const randomNextComposition = [];
//     // const checkDuplicateNumComposition = [];

//     // selectRandomNum();
//     // function selectRandomNum() {
//     //     // select random number
//     //     const itemNumber = Math.floor(Math.random() * trendingListItem.length);

//     //     // add random number to checkDuplicateNum array for check in next step
//     //     checkDuplicateNumComposition.push(itemNumber);
//     //     // check checkDuplicateNumComposition array and remove duplicate number
//     //     const newArrayNum = checkDuplicateNumComposition.filter((item, index) => checkDuplicateNumComposition.indexOf(item) === index);
//     //     // check array length if index === 5 {set array for render item }
//     //     // else {return and play again selectRandomNum function}
//     //     if (newArrayNum.length < 5) {
//     //         selectRandomNum();
//     //     } else if (newArrayNum.length === 5) {
//     //         for (let i = 0; i < newArrayNum.length; i++) {
//     //             randomNextComposition.push(trendingListItem[newArrayNum[i]]);
//     //         }
//     //     }
//     // }

//     if (getStyle === 'home') {
//         return (
//             <div id='home-music-player' className='absolute bg-bg-image h-[100dvh] min-h-[750px] w-[38%] ms-[70px] hidden'>
//                 <img className='absolute bg-image h-full min-h-[750px] -z-10 bg-black opacity-50' src={(() => {
//                     if (musicPlayerShow === true && ifFirstPlay.current === true) {
//                         ifFirstPlay.current = false;
//                         return (
//                             require(`../images/${musicDetails.imageSrc}`)
//                         )
//                     } else if (ifFirstPlay.current === false) {
//                         return (
//                             require(`../images/${musicDetails.imageSrc}`)
//                         )
//                     }
//                 })()} alt="" />
//                 <div className='z-0 relative'>
//                     <div className='h-[35dvh] min-h-[260px] relative overflow-hidden ms-1 shadow-inner'>
//                         <div className='close-music-player flex justify-between px-5 items-center mt-6'>
//                             <h1 className='font-semibold text-custom-white inline-block text-3xl'>Next Composition</h1>
//                             <div className='relative -right-6 bg-custom-white w-[60px] p-[6px] rounded-l-full cursor-pointer'>
//                                 <CloseIcon className='w-[30px] h-[30px]' />
//                             </div>
//                         </div>
//                         <div className='absolute overflow-visible flex items-center flex-nowrap flex-row z-0 ps-3 mt-3'>
//                             {/* insted trending list after set best allbums */}
//                             {trendingListItem.map(item => (
//                                 <div key={item.id} className='bg-custom-black relative mx-3 rounded-2xl w-[200px] basis-[180px]'>
//                                     <img className='rounded-2xl opacity-90 h-full w-full object-cover' src={require(`../images/${item.imageSrc}`)} alt="" />
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                     <AudioPlayer
//                         className='mt-[20px] m-auto rounded-2xl flex flex-col music-player'
//                         preload='metadata'
//                         autoPlayAfterSrcChange={false}
//                         src={(() => {
//                             if (musicPlayerShow === true && ifFirstPlay.current === true) {
//                                 ifFirstPlay.current = false;
//                                 return (
//                                     require(`../musics/${musicDetails.musicLink}`)
//                                 )
//                             } else if (ifFirstPlay.current === false) {
//                                 return (
//                                     require(`../musics/${musicDetails.musicLink}`)
//                                 )
//                             }
//                         })()}

//                         header={
//                             <div className='flex flex-col items-center mb-2'>
//                                 <img className='w-[70%] rounded-xl' src={(() => {
//                                     if (musicPlayerShow === true && ifFirstPlay.current === true) {
//                                         ifFirstPlay.current = false;
//                                         return (
//                                             require(`../images/${musicDetails.imageSrc}`)
//                                         )
//                                     } else if (ifFirstPlay.current === false) {
//                                         return (
//                                             require(`../images/${musicDetails.imageSrc}`)
//                                         )
//                                     }
//                                 })()} alt="" />
//                                 <div className='font-semibold text-custom-white text-2xl mt-2 capitalize'>{musicDetails.musicName}</div>
//                                 <div className='font-medium text-custom-white text-md capitalize'>{musicDetails.artistName}</div>
//                             </div>
//                         }
//                         style={{
//                             backgroundColor: '#2A252B',
//                             width: '60%',
//                             opacity: '0.9',
//                             padding: '18px 14px',
//                         }}
//                         customControlsSection={
//                             [
//                                 RHAP_UI.LOOP,
//                                 RHAP_UI.MAIN_CONTROLS,
//                                 <ShuffleIcon className='w-[23px] cursor-pointer' />,
//                             ]
//                         }
//                         // onPause={true}
//                         customVolumeControls={[]}
//                         showSkipControls={true}
//                         showJumpControls={false}
//                         customIcons={{
//                             play: <div className='bg-custom-white m-auto play-icon flex justify-center items-center w-[50px] h-[50px] rounded-full cursor-pointer' >
//                                 <PlayIcon className='w-[20px] inline-block ' />
//                             </div>,
//                             pause: <div className='bg-custom-white m-auto play-icon flex justify-center items-center w-[50px] h-[50px] rounded-full cursor-pointer' >
//                                 <PauseIcon className='w-[20px] inline-block ' />
//                             </div>,
//                             // next: <NextIcon className='ms-1 w-[30px] cursor-pointer' onClick={() => handleClick('next')} />,
//                             // previous: <PrevIcon className='w-[30px] cursor-pointer' onClick={() => handleClick('prev')} />,
//                             previous:
//                                 <svg className='prev-icon' width="35" height="24" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
//                                     <path d="M11 0.999985L11 23C11 23.5523 11.4477 24 12 24C12.5523 24 13 23.5523 13 23L13 1.00003C13 0.447751 12.5523 4.72069e-05 12 4.72069e-05C11.4477 3.31876e-07 11 0.447704 11 0.999985Z" fill="#374957" />
//                                     <g clipPath="url(#clip0_7_14707)">
//                                         <path d="M17.508 16.0306L27.046 23.0246C27.791 23.5701 28.6725 23.8987 29.5928 23.9739C30.513 24.0491 31.4362 23.868 32.2598 23.4507C33.0835 23.0333 33.7755 22.3961 34.2592 21.6096C34.7428 20.823 34.9993 19.9179 35 18.9946V4.99956C35.0015 4.07531 34.7464 3.16879 34.2632 2.38091C33.78 1.59303 33.0876 0.954695 32.2631 0.536967C31.4387 0.119239 30.5144 -0.0614954 29.5934 0.0148802C28.6723 0.0912558 27.7904 0.421745 27.046 0.969562L17.508 7.96356C16.8751 8.42801 16.3605 9.03495 16.0058 9.73526C15.6511 10.4356 15.4662 11.2095 15.4662 11.9946C15.4662 12.7796 15.6511 13.5536 16.0058 14.2539C16.3605 14.9542 16.8751 15.5611 17.508 16.0256V16.0306Z" fill="#374957" />
//                                     </g>
//                                     <defs>
//                                         <clipPath id="clip0_7_14707">
//                                             <rect width="24" height="24" fill="white" transform="matrix(-1 0 0 -1 38 24)" />
//                                         </clipPath>
//                                     </defs>
//                                 </svg>
//                             ,
//                             next:
//                                 <svg className='next-icon' width="35" height="24" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
//                                     <path d="M25 0.999985V23C25 23.5523 25.4477 24 26 24C26.5523 24 27 23.5523 27 23V1.00003C27 0.447751 26.5523 4.72069e-05 26 4.72069e-05C25.4477 3.31876e-07 25 0.447704 25 0.999985Z" fill="#374957" />
//                                     <path d="M20.492 7.96944L10.954 0.975435C10.209 0.42992 9.32752 0.101347 8.40724 0.0261376C7.48696 -0.0490718 6.56382 0.13202 5.74016 0.549339C4.9165 0.966658 4.22448 1.6039 3.74082 2.39044C3.25715 3.17698 3.00073 4.08209 2.99998 5.00544V19.0004C2.99854 19.9247 3.25362 20.8312 3.73683 21.6191C4.22003 22.407 4.9124 23.0453 5.73687 23.463C6.56134 23.8808 7.48556 24.0615 8.40665 23.9851C9.32774 23.9087 10.2096 23.5783 10.954 23.0304L20.492 16.0364C21.1249 15.572 21.6395 14.965 21.9942 14.2647C22.3489 13.5644 22.5338 12.7905 22.5338 12.0054C22.5338 11.2204 22.3489 10.4464 21.9942 9.74613C21.6395 9.04583 21.1249 8.43888 20.492 7.97444V7.96944Z" fill="#374957" />
//                                 </svg>,

//                         }}
//                     />
//                 </div>
//             </div >
//         );
//     }
//     if (getStyle === 'bottom') {
//         return (
//             <section id={musicDetails.id} className={'bottom-music-player absolute left-0 bottom-0 w-[96dvw] hidden animate-slide-down music-player z-[9999]'}>
//                 <AudioPlayer
//                     className='flex justify-between items-center'
//                     preload='metadata'
//                     autoPlayAfterSrcChange={false}
//                     src={(() => {
//                         if (musicPlayerShow === true && ifFirstPlay.current === true) {
//                             ifFirstPlay.current = false;
//                             return (
//                                 require(`../musics/${musicDetails.musicLink}`)
//                             )
//                         } else if (ifFirstPlay.current === false) {
//                             return (
//                                 require(`../musics/${musicDetails.musicLink}`)
//                             )
//                         }
//                     })()}

//                     header={
//                         <div className='flex items-center w-[300px]'>
//                             <img className='h-[70px] rounded-xl mx-5' src={(() => {
//                                 if (musicPlayerShow === true && ifFirstPlay.current === true) {
//                                     ifFirstPlay.current = false;
//                                     return (
//                                         require(`../images/${musicDetails.imageSrc}`)
//                                     )
//                                 } else if (ifFirstPlay.current === false) {
//                                     return (
//                                         require(`../images/${musicDetails.imageSrc}`)
//                                     )
//                                 }
//                             })()} alt="" />
//                             <div className='flex flex-col'>
//                                 <h2 className='font-semibold text-custom-white text-xl line-clamp-1 capitalize'>{musicDetails.musicName}</h2>
//                                 <span className='font-medium text-custom-white text-sm line-clamp-1 capitalize'>{musicDetails.artistName}</span>
//                             </div>
//                         </div>
//                     }
//                     style={{
//                         backgroundColor: '#BF795E',
//                         width: '100%',
//                         height: '100px',
//                         position: 'absolute',
//                         bottom: '0px',
//                         left: '0px',
//                         borderRadius: '0px 0px 0px 12px'
//                     }}
//                     customControlsSection={
//                         [
//                             <div className='mx-5'></div>,
//                             RHAP_UI.LOOP,
//                             RHAP_UI.MAIN_CONTROLS,
//                             <ShuffleIcon className='w-[23px] cursor-pointer' />,
//                             <div className='mx-5'></div>,
//                             RHAP_UI.CURRENT_TIME,
//                             RHAP_UI.PROGRESS_BAR,
//                             RHAP_UI.DURATION,
//                             <div className='mx-5'></div>,
//                             RHAP_UI.VOLUME,
//                             <div className='mx-4'></div>,
//                             <div className='close-bottom-music-player w-0'>
//                                 <div className='relative right-[90px] -top-[66px] rotate-90 bg-custom-brown w-[60px] px-3 p-[10px] rounded-l-full cursor-pointer'>
//                                     <NextIcon className='w-[25px] h-[25px] transition-[1s]' />
//                                 </div>
//                             </div>,
//                         ]
//                     }
//                     customProgressBarSection={[]}
//                     customVolumeControls={[]}
//                     showSkipControls={true}
//                     showJumpControls={false}
//                     customIcons={{
//                         play: <div className='bg-custom-white m-auto play-icon flex justify-center items-center w-[45px] h-[45px] rounded-full cursor-pointer' >
//                             <PlayIcon className='w-[20px] inline-block ' />
//                         </div>,
//                         pause: <div className='bg-custom-white m-auto play-icon flex justify-center items-center w-[45px] h-[45px] rounded-full cursor-pointer' >
//                             <PauseIcon className='w-[20px] inline-block ' />
//                         </div>,
//                         // next: <NextIcon className='ms-1 w-[30px] cursor-pointer' onClick={() => handleClick('next')} />,
//                         // previous: <PrevIcon className='w-[30px] cursor-pointer' onClick={() => handleClick('prev')} />,
//                         previous:
//                             <svg className='prev-icon' width="32" height="24" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
//                                 <path d="M11 0.999985L11 23C11 23.5523 11.4477 24 12 24C12.5523 24 13 23.5523 13 23L13 1.00003C13 0.447751 12.5523 4.72069e-05 12 4.72069e-05C11.4477 3.31876e-07 11 0.447704 11 0.999985Z" fill="#374957" />
//                                 <g clipPath="url(#clip0_7_14707)">
//                                     <path d="M17.508 16.0306L27.046 23.0246C27.791 23.5701 28.6725 23.8987 29.5928 23.9739C30.513 24.0491 31.4362 23.868 32.2598 23.4507C33.0835 23.0333 33.7755 22.3961 34.2592 21.6096C34.7428 20.823 34.9993 19.9179 35 18.9946V4.99956C35.0015 4.07531 34.7464 3.16879 34.2632 2.38091C33.78 1.59303 33.0876 0.954695 32.2631 0.536967C31.4387 0.119239 30.5144 -0.0614954 29.5934 0.0148802C28.6723 0.0912558 27.7904 0.421745 27.046 0.969562L17.508 7.96356C16.8751 8.42801 16.3605 9.03495 16.0058 9.73526C15.6511 10.4356 15.4662 11.2095 15.4662 11.9946C15.4662 12.7796 15.6511 13.5536 16.0058 14.2539C16.3605 14.9542 16.8751 15.5611 17.508 16.0256V16.0306Z" fill="#374957" />
//                                 </g>
//                                 <defs>
//                                     <clipPath id="clip0_7_14707">
//                                         <rect width="24" height="24" fill="white" transform="matrix(-1 0 0 -1 38 24)" />
//                                     </clipPath>
//                                 </defs>
//                             </svg>
//                         ,
//                         next:
//                             <svg className='next-icon' width="32" height="24" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
//                                 <path d="M25 0.999985V23C25 23.5523 25.4477 24 26 24C26.5523 24 27 23.5523 27 23V1.00003C27 0.447751 26.5523 4.72069e-05 26 4.72069e-05C25.4477 3.31876e-07 25 0.447704 25 0.999985Z" fill="#374957" />
//                                 <path d="M20.492 7.96944L10.954 0.975435C10.209 0.42992 9.32752 0.101347 8.40724 0.0261376C7.48696 -0.0490718 6.56382 0.13202 5.74016 0.549339C4.9165 0.966658 4.22448 1.6039 3.74082 2.39044C3.25715 3.17698 3.00073 4.08209 2.99998 5.00544V19.0004C2.99854 19.9247 3.25362 20.8312 3.73683 21.6191C4.22003 22.407 4.9124 23.0453 5.73687 23.463C6.56134 23.8808 7.48556 24.0615 8.40665 23.9851C9.32774 23.9087 10.2096 23.5783 10.954 23.0304L20.492 16.0364C21.1249 15.572 21.6395 14.965 21.9942 14.2647C22.3489 13.5644 22.5338 12.7905 22.5338 12.0054C22.5338 11.2204 22.3489 10.4464 21.9942 9.74613C21.6395 9.04583 21.1249 8.43888 20.492 7.97444V7.96944Z" fill="#374957" />
//                             </svg>,

//                     }}
//                 />
//             </section>
//         );
//     }
// }