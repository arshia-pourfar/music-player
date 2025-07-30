import React, { useState } from 'react';
import MusicPlayer from '../components/MusicPLayer';
import Header from '../components/Header';
import HeaderPostCarousel from '../components/home/HeaderPostCarousel';
import TrendingList from '../components/home/TrendingList';
import TopArtist from '../components/home/TopArtist';
import RecentFavourite from '../components/home/RecentFavourite';
import AllMusic from '../components/MusicList';

const Home = () => {
    const [selectedMusic, setSelectedMusic] = useState(null);
    const [isPlayerVisible, setIsPlayerVisible] = useState(false);
    const [activeList, setActiveList] = useState([]);

    const handlePlayMusic = (musicItem, sourceList) => {
        setSelectedMusic(musicItem);
        setActiveList(sourceList);
        setIsPlayerVisible(true);
    };

    const handleClosePlayer = () => {
        setIsPlayerVisible(false);
        setSelectedMusic(null);
        setActiveList([]);
    };

    return (
        <React.Fragment>
            <div className="shrink-0">
                <MusicPlayer
                    getStyle="home"
                    musicDetails={selectedMusic}
                    musicPlayerShow={isPlayerVisible}
                    onClose={handleClosePlayer}
                    onChangeMusic={(item) => handlePlayMusic(item, activeList)}
                />
            </div>

            <section className={`h-screen w-screen bg-custom-white flex flex-col overflow-hidden rounded-l-xl z-20 relative ${isPlayerVisible ? 'animate-slide-right' : 'animate-slide-left'}`}>
                <div className="flex-1 overflow-hidden pt-3 lg:px-6 md:px-5 px-2 scrollbar-custom h-screen">
                    <Header />

                    <div className="flex flex-wrap pt-4 bg-custom-white">
                        <div className="lg:basis-3/5 w-full px-3 max-h-[40vh] flex justify-center items-center">
                            <HeaderPostCarousel />
                        </div>
                        <div className="lg:basis-2/5 w-full px-3 max-h-[40vh]">
                            <TopArtist />
                        </div>
                        <div className="lg:basis-3/5 w-full mt-4 px-3 max-h-[40vh]">
                            <TrendingList onPlay={handlePlayMusic} currentPlaying={selectedMusic} />
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