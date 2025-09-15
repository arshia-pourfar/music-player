import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmarkCircle } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';
import { faExpand, faRedo, faRepeat } from '@fortawesome/free-solid-svg-icons';
import FavoriteIcon from './FavoriteIcon';
import { useAuth } from '../hooks/AuthContext';

const MusicPlayer = ({
    getStyle,
    musicDetails,
    musicPlayerShow,
    onClose,
    onChangeMusic,
    musicList
}) => {
    const { user } = useAuth();
    const [isClosing, setIsClosing] = useState(false);
    const [styleMode, setStyleMode] = useState(getStyle);
    const [isLoop, setIsLoop] = useState(false);
    const toggleLoop = () => setIsLoop(!isLoop);

    const handleCloseAnimation = () => {
        setIsClosing(!isClosing);
        setStyleMode(getStyle);
    };

    const handleClick = (action) => {
        if (!musicList || musicList.length === 0 || !onChangeMusic) return;

        const currentIndex = musicDetails.newId;
        const lastIndex = musicList.length - 1;

        const nextIndex = currentIndex + 1 > lastIndex ? 0 : currentIndex + 1;
        const prevIndex = currentIndex - 1 < 0 ? lastIndex : currentIndex - 1;

        if (action === 'next') {
            onChangeMusic(musicList[nextIndex]);
        }

        if (action === 'prev') {
            onChangeMusic(musicList[prevIndex]);
        }
    };

    const getAudioSrc = () => musicDetails ? `/musics/${musicDetails.musiclink}` : '';
    const getImageSrc = () => musicDetails ? `/images/${musicDetails.imagesrc}` : '';

    const FullscreenButton = () => (
        <button
            onClick={() => setStyleMode('fullscreen')}
            className="text-custom-white hover:text-green-400 transition-colors"
            title="Fullscreen"
        >
            <FontAwesomeIcon icon={faExpand} className="size-6" />
        </button>
    );

    const CustomLoopButton = ({ isLoop, toggleLoop }) => (
        <button
            onClick={toggleLoop}
            className={`flex items-center space-x-2 p-2 rounded`}
        >
            {isLoop ?
                <FontAwesomeIcon icon={faRepeat} className="fi fi-rs-refresh text-white text-2xl" /> :
                <FontAwesomeIcon icon={faRedo} className="fi fi-rs-refresh text-white text-2xl" />
            }
        </button>
    );

    // 🎵 Home Style Player
    if (styleMode === 'home' && musicPlayerShow && musicDetails) {
        return (
            <div id="home-music-player" className="absolute left-[75px] h-[100dvh] min-h-[750px] w-[38%] z-0 transition-all duration-500 ease-in-out">
                <img
                    className="absolute bg-image h-full min-h-[750px] -z-10 bg-black opacity-50"
                    src={getImageSrc()}
                    alt={`${musicDetails.musicname} background`}
                />
                <div className="z-0 relative">
                    <div className="h-[35dvh] min-h-[260px] relative overflow-hidden ms-1 shadow-inner">
                        <div className='flex justify-between items-center mt-7'>
                            <h1 className="font-semibold text-custom-white text-3xl mx-5">Next Composition</h1>
                            <div className='bg-custom-white rounded-l-full w-[70px] flex justify-start items-center cursor-pointer' onClick={() => onClose?.()} >
                                <FontAwesomeIcon className='size-10 p-1 text-custom-black' icon={faXmarkCircle} />
                            </div>
                        </div>
                        <div className="absolute flex flex-nowrap items-center ps-3 mt-3 z-0">
                            {Array.isArray(musicList) &&
                                musicList.map((item) => (
                                    <div
                                        key={item.id}
                                        className={`bg-custom-black mx-3 rounded-2xl w-40 overflow-hidden transition-all ${item.id === musicDetails.id ? 'scale-110' : 'opacity-80'}`}
                                    >
                                        <img
                                            className="rounded-2xl h-full w-full object-cover"
                                            src={`/images/${item.imagesrc}`}
                                            alt={`${item.musicname} album`}
                                        />
                                    </div>
                                ))}
                        </div>
                    </div>

                    <AudioPlayer
                        className="mt-[20px] m-auto rounded-2xl flex flex-col music-player"
                        preload="metadata"
                        autoPlay
                        onEnded={onClose}
                        src={getAudioSrc()}
                        header={
                            <div className="flex flex-col items-center mb-4 w-full">
                                <img className="w-[65%] rounded-xl" src={getImageSrc()} alt={`${musicDetails.musicname} cover`} />
                                <div className='flex justify-between items-center h-full w-full'>
                                    <div className='flex flex-col'>
                                        <div className="font-semibold text-custom-white text-2xl mt-2 capitalize">{musicDetails.musicname}</div>
                                        <div className="font-medium text-custom-white text-md capitalize">{musicDetails.artistname}</div>
                                    </div>
                                    <FullscreenButton />
                                </div>
                            </div>
                        }
                        style={{
                            backgroundColor: '#2A252B',
                            width: '65%',
                            opacity: '0.9',
                            padding: '18px 14px',
                        }}
                        customProgressBarSection={[RHAP_UI.CURRENT_TIME, RHAP_UI.PROGRESS_BAR, RHAP_UI.DURATION]}
                        customControlsSection={[
                            RHAP_UI.LOOP,
                            RHAP_UI.MAIN_CONTROLS,
                            <i className="fi fi-rs-shuffle text-2xl flex justify-center items-center text-custom-white" />,
                        ]}
                        customVolumeControls={[]}
                        showSkipControls
                        showJumpControls={false}
                        customIcons={{
                            play: (
                                <div className="bg-custom-white flex justify-center items-center w-[50px] h-[50px] rounded-full cursor-pointer">
                                    <i className="fi fi-sr-play text-2xl text-custom-black flex" />
                                </div>
                            ),
                            pause: (
                                <div className="bg-custom-white flex justify-center items-center w-[50px] h-[50px] rounded-full cursor-pointer">
                                    <i className="fi fi-sr-pause text-2xl text-custom-black flex" />
                                </div>
                            ),
                            previous: (
                                <button
                                    onClick={() => handleClick('prev')}
                                    className="w-full flex justify-center items-center text-custom-white"
                                >
                                    <i className="fi fi-sr-step-backward text-2xl flex" />
                                </button>
                            ),
                            next: (
                                <button
                                    onClick={() => handleClick('next')}
                                    className="w-full flex justify-center items-center text-custom-white"
                                >
                                    <i className="fi fi-sr-step-forward text-2xl flex" />
                                </button>
                            ),
                        }}
                    />
                </div>
            </div>
        );
    }
    const animationClass = isClosing ? 'animate-slide-down' : 'animate-slide-up';
    // 🎵 Bottom Style Player
    if (styleMode === 'bottom' && musicPlayerShow && musicDetails) {
        return (
            <section
                id={musicDetails.id}
                className={`absolute bottom-0 animate-slide-up w-full h-[100px] z-50`}
            >
                <AudioPlayer
                    className={`flex justify-between items-center ${animationClass}`}
                    preload="metadata"
                    autoPlay
                    src={getAudioSrc()}
                    header={
                        <div className="flex items-center">
                            <img className="h-[70px] rounded-xl mx-5" src={getImageSrc()} alt={`${musicDetails.musicname} cover`} />
                            <div className="flex flex-col">
                                <h2 className="font-semibold text-custom-white text-xl line-clamp-1 capitalize">{musicDetails.musicname}</h2>
                                <span className="font-medium text-custom-white text-sm line-clamp-1 capitalize">{musicDetails.artistname}</span>
                            </div>
                        </div>
                    }
                    style={{
                        backgroundColor: '#BF795E',
                        width: '100%',
                        height: '100px',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        position: 'absolute',
                        bottom: '0px',
                        left: '0px',
                    }}
                    customControlsSection={[
                        <div className="mx-5" />,
                        RHAP_UI.LOOP,
                        RHAP_UI.MAIN_CONTROLS,
                        <i className="fi fi-rs-shuffle text-2xl text-custom-white" />,
                        <div className="mx-5" />,
                        RHAP_UI.CURRENT_TIME,
                        RHAP_UI.PROGRESS_BAR,
                        RHAP_UI.DURATION,
                        <div className="mx-5" />,
                        RHAP_UI.VOLUME,
                        <div className="mx-4" />,
                        <FullscreenButton />,
                        <div className="close-bottom-music-player" onClick={handleCloseAnimation}>
                            <div
                                className="absolute -top-12 right-36 bg-custom-brown h-[65px] w-[50px] flex items-center justify-center rounded-t-3xl cursor-pointer"
                            >
                                {/* <i className={`fi fi-sr-angle-down ${isClosing ? "rotate-0" : "rotate-180"} text-custom-white text-2xl transition-all`} /> */}
                                <i
                                    className={`fi fi-sr-angle-down ${isClosing ? "rotate-0" : "rotate-180 mb-4"
                                        } text-custom-white text-2xl transform origin-center transition-transform duration-300`}
                                />
                            </div>
                        </div>,
                    ]}
                    customProgressBarSection={[]}
                    customVolumeControls={[]}
                    showSkipControls
                    showJumpControls={false}
                    customIcons={{
                        play: (
                            <div className="bg-custom-white flex justify-center items-center w-[50px] h-[50px] rounded-full cursor-pointer">
                                <i className="fi fi-sr-play text-2xl text-custom-black flex" />
                            </div>
                        ),
                        pause: (
                            <div className="bg-custom-white flex justify-center items-center w-[50px] h-[50px] rounded-full cursor-pointer">
                                <i className="fi fi-sr-pause text-2xl text-custom-black flex" />
                            </div>
                        ),
                        previous: (
                            <button
                                onClick={() => handleClick('prev')}
                                className="w-full flex justify-center items-center text-custom-white"
                            >
                                <i className="fi fi-sr-step-backward text-2xl flex" />
                            </button>
                        ),
                        next: (
                            <button
                                onClick={() => handleClick('next')}
                                className="w-full flex justify-center items-center text-custom-white"
                            >
                                <i className="fi fi-sr-step-forward text-2xl flex" />
                            </button>
                        ),
                    }}
                />
            </section>
        );
    }
    // 🎵 Fullscreen Style Player
    if (styleMode === 'fullscreen' && musicPlayerShow && musicDetails) {
        return (
            <section
                id="fullscreen-music-player"
                className={`absolute ${getStyle === 'home' ? 'left-[70px] w-[calc(100vw-70px)]' : 'left-0 w-full'}  z-[999] flex flex-col justify-between items-center bg-gradient-to-b from-black/95 to-gray-900/95 p-6 md:p-10 transition-all duration-500`}
            >
                {/* Header */}
                <div className="flex justify-between items-center w-full mb-6">
                    <h1 className="text-white text-2xl md:text-3xl font-bold tracking-wide">Now Playing</h1>
                    <button
                        onClick={handleCloseAnimation}
                        className="text-white hover:text-custom-pink transition-colors"
                    >
                        <FontAwesomeIcon icon={faXmarkCircle} className="text-3xl md:text-4xl" />
                    </button>
                </div>

                {/* Album Cover */}
                <div className="flex flex-col items-center justify-center flex-grow">
                    <div className="w-[250px] h-[250px] md:w-[400px] md:h-[400px] rounded-3xl overflow-hidden shadow-2xl border-4 border-gray-800">
                        <img
                            src={getImageSrc()}
                            alt={`${musicDetails.musicname} cover`}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="mt-5 text-center">
                        <h2 className="text-white text-2xl md:text-3xl font-extrabold capitalize truncate">
                            {musicDetails.musicname}
                        </h2>
                        <p className="text-gray-300 text-lg md:text-xl capitalize truncate mt-1">
                            {musicDetails.artistname}
                        </p>
                    </div>
                </div>

                {/* Audio Player */}
                <AudioPlayer
                    className="w-full md:w-[70%] rounded-3xl shadow-lg"
                    preload="metadata"
                    autoPlay
                    src={getAudioSrc()}
                    style={{
                        backgroundColor: '#1F1A1F',
                        padding: '18px',
                        opacity: 0.95,
                    }}
                    showSkipControls
                    showLoopControl={false}
                    showJumpControls={false}
                    customProgressBarSection={[
                        RHAP_UI.CURRENT_TIME,
                        RHAP_UI.PROGRESS_BAR,
                        RHAP_UI.DURATION,
                    ]}
                    customControlsSection={[
                        <div className="flex items-center space-x-2">
                            <CustomLoopButton isLoop={isLoop} toggleLoop={toggleLoop} />
                            <FavoriteIcon songId={musicDetails.id} userId={user.id} customStyle={'lg:text-2xl text-custom-white'} />
                        </div>,
                        RHAP_UI.MAIN_CONTROLS,
                        RHAP_UI.VOLUME,
                    ]}
                    customIcons={{
                        play: (
                            <div className="bg-custom-white flex justify-center items-center w-[50px] h-[50px] rounded-full cursor-pointer">
                                <i className="fi fi-sr-play text-2xl text-custom-black flex" />
                            </div>
                        ),
                        pause: (
                            <div className="bg-custom-white flex justify-center items-center w-[50px] h-[50px] rounded-full cursor-pointer">
                                <i className="fi fi-sr-pause text-2xl text-custom-black flex" />
                            </div>
                        ),
                        previous: (
                            <button
                                onClick={() => handleClick('prev')}
                                className="w-full flex justify-center items-center text-custom-white"
                            >
                                <i className="fi fi-sr-step-backward text-2xl flex" />
                            </button>
                        ),
                        next: (
                            <button
                                onClick={() => handleClick('next')}
                                className="w-full flex justify-center items-center text-custom-white"
                            >
                                <i className="fi fi-sr-step-forward text-2xl flex" />
                            </button>
                        ),
                    }}
                />
            </section>
        );
    }


    return null;
};

export default MusicPlayer;