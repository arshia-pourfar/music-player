import React, { useEffect, useState } from "react";
import MusicPlayer from "../components/MusicPLayer";
import Header from "../components/Header";
import useFetchData from "../hooks/useFetchData";
import { useAuth } from "../hooks/AuthContext";
import MusicList from "../components/MusicList";

const Favourite = () => {
    const [selectedMusic, setSelectedMusic] = useState(null);
    const [isPlayerVisible, setIsPlayerVisible] = useState(false);
    const [activeList, setActiveList] = useState([]);
    const { user } = useAuth();

    const {
        data,
        loading,
        setUrl,
        fetchData,
    } = useFetchData(`/api/${user ? user.id : 0}/favoriteslist`, "GET", null, true);

    useEffect(() => {
        if (user) {
            setUrl(`/api/${user.id}/favoriteslist`);
            fetchData();
        }
    }, [user, setUrl, fetchData]);

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

    if (loading) {
        return (
            <div className="h-screen w-screen flex flex-col justify-center items-center bg-custom-white">
                <div className="loader" />
                <div className="text-2xl font-bold mt-2">Loading ...</div>
            </div>
        );
    }

    return (
        <section className="relative w-full h-screen bg-custom-white flex flex-col overflow-hidden">
            {/* موزیک پلیر پایین صفحه */}
            {isPlayerVisible && (
                <MusicPlayer
                    getStyle="bottom"
                    musicDetails={selectedMusic}
                    musicPlayerShow={true}
                    onClose={handleClosePlayer}
                    onChangeMusic={(item) => handlePlayMusic(item, activeList)}
                    musicList={activeList}
                />
            )}

            {/* محتوای صفحه با اسکرول داخلی حرفه‌ای */}
            <div className="custom-h-full overflow-y-auto scrollbar-custom px-6 pt-5">
                <Header />

                <div className="mt-5">
                    {Array.isArray(data) && data.length > 0 ? (
                        <MusicList
                            myListArray={data}
                            isShowAlbumAndTime={true}
                            userId={user?.id}
                            onPlay={handlePlayMusic}
                            currentPlaying={selectedMusic}
                        />
                    ) : (
                        <div className="text-center mt-20">
                            <img
                                className="w-[170px] mx-auto animate-bounce"
                                src="/images/playlist.png"
                                alt="Empty playlist"
                            />
                            <h2 className="font-black text-4xl text-custom-black mt-4">
                                No Songs Available
                            </h2>
                            <h5 className="text-lg text-gray-500 mt-2">
                                Your Favorites List Is Empty
                            </h5>
                            <a
                                href="./AllMusic"
                                className="text-2xl flex items-center justify-center font-extrabold text-custom-black mt-12 animate-pulse"
                            >
                                <i className="fi fi-ss-heart text-custom-pink"></i>
                                <span className="mx-2">Add Favourite</span>
                                <i className="fi fi-br-arrow-right mt-1"></i>
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Favourite;