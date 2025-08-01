import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmarkCircle } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';

const MusicPlayer = ({
    getStyle,
    musicDetails,
    musicPlayerShow,
    onClose,
    onChangeMusic,
    musicList
}) => {
    const [isClosing, setIsClosing] = useState(false);
    const handleCloseAnimation = () => {
        setIsClosing(!isClosing);
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

    // 🎵 Home Style Player
    if (getStyle === 'home' && musicPlayerShow && musicDetails) {
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
                            <div className="flex flex-col items-center mb-2">
                                <img className="w-[65%] rounded-xl" src={getImageSrc()} alt={`${musicDetails.musicname} cover`} />
                                <div className="font-semibold text-custom-white text-2xl mt-2 capitalize">{musicDetails.musicname}</div>
                                <div className="font-medium text-custom-white text-md capitalize">{musicDetails.artistname}</div>
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
    if (getStyle === 'bottom' && musicPlayerShow && musicDetails) {
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

    return null;
};

export default MusicPlayer;