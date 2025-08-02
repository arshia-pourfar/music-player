import React, { useState, useEffect } from 'react';
import MusicPlayer from '../components/MusicPLayer';
import Header from '../components/Header';
import HeaderPostCarousel from '../components/home/HeaderPostCarousel';
import TrendingList from '../components/home/TrendingList';
import TopArtist from '../components/home/TopArtist';
import RecentFavourite from '../components/home/RecentFavourite';
import AllMusic from '../components/MusicList';
import useFetchData from '../hooks/useFetchData';
import { useAuth } from '../hooks/AuthContext';
import useWindowDimensions from '../hooks/useWidthSize';

const Home = () => {
    const [selectedMusic, setSelectedMusic] = useState(null);
    const [isPlayerVisible, setIsPlayerVisible] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const [activeList, setActiveList] = useState([]);
    const { height, width } = useWindowDimensions();
    const [limitTopArtist, setLimitTopArtist] = useState(3);
    const { user } = useAuth();

    const {
        data: trendingList,
        loading: trendingLoading,
        error: trendingError,
    } = useFetchData('/api/trendinglist', 'GET', null, true);

    const {
        data: topArtistList,
        loading: topArtistLoading,
        error: topArtistError,
    } = useFetchData('/api/topartistslist', 'GET', null, true, limitTopArtist);

    useEffect(() => {
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
    }, [height, width, user]);

    const handlePlayMusic = (musicItem, sourceList) => {
        setSelectedMusic(musicItem);
        setActiveList(sourceList);
        setIsPlayerVisible(true);
        setHasInteracted(true);
    };

    const handleClosePlayer = () => {
        setIsPlayerVisible(false);
        setSelectedMusic(null);
        setActiveList([]);
    };

    const animationClass = hasInteracted
        ? isPlayerVisible
            ? 'animate-slide-right'
            : 'animate-slide-left'
        : '';

    if (trendingLoading || topArtistLoading) {
        return (
            <div className="h-screen w-full flex flex-col justify-center items-center bg-custom-white rounded-l-lg" >
                <div className="loader"></div>
                <div className="text-2xl font-bold mt-2">Loading ...</div>
            </div>
        );
    }

    if (trendingError || topArtistError) {
        return <div>Error: {trendingError?.message || topArtistError?.message}</div>;
    }

    return (
        <React.Fragment>
            <div className="shrink-0">
                <MusicPlayer
                    getStyle="home"
                    musicDetails={selectedMusic}
                    musicPlayerShow={isPlayerVisible}
                    onClose={handleClosePlayer}
                    onChangeMusic={(item) => handlePlayMusic(item, activeList)}
                    musicList={activeList}
                />
            </div>

            <section
                className={`h-screen w-screen bg-custom-white flex flex-col overflow-hidden rounded-l-lg z-20 relative ${animationClass}`}
            >
                <div className="flex-1 overflow-hidden pt-3 lg:px-6 md:px-5 px-2 scrollbar-custom h-screen">
                    <Header />

                    <div className="flex flex-wrap pt-4 bg-custom-white">
                        <div className="lg:basis-3/5 w-full px-3 max-h-[40vh] flex justify-center items-center">
                            <HeaderPostCarousel />
                        </div>
                        <div className="lg:basis-2/5 w-full px-3 max-h-[40vh]">
                            <TopArtist topArtistList={topArtistList} />
                        </div>
                        <div className="lg:basis-3/5 w-full mt-4 px-3 max-h-[40vh]">
                            <TrendingList
                                trendingList={trendingList}
                                onPlay={handlePlayMusic}
                                currentPlaying={selectedMusic}
                                user={user}
                            />
                        </div>
                        <div className="lg:basis-2/5 w-full mt-4 px-3 max-h-[40vh]">
                            <RecentFavourite />
                        </div>
                    </div>

                    <div className="container md:hidden block mt-6">
                        <AllMusic onPlay={handlePlayMusic} />
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
};

export default Home;