import React, { useEffect } from 'react';
import { useAuth } from '../hooks/AuthContext';
import LoginOrSingup from './LogIn';
import useFetchData from '../hooks/useFetchData';
import { Link } from 'react-router-dom'; // اگر از React Router استفاده می‌کنی
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare, faSignOut, faFolder, faMusic } from '@fortawesome/free-solid-svg-icons';

const Setting = () => {
    const { user, setUser } = useAuth();

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
    };

    const {
        data: favorites,
        loading,
        setUrl,
        fetchData,
    } = useFetchData(null, "GET", null, false);

    useEffect(() => {
        if (user?.id) {
            setUrl(`/api/${user.id}/favoriteslist`);
            fetchData();
        }
    }, [user, setUrl, fetchData]);

    if (!user) return <LoginOrSingup />;

    const displayedFavorites = favorites?.slice(0, 6);
    const hasMoreFavorites = favorites?.length > 6;

    const playlists = [
        { name: "Chill Vibes", count: 18 },
        { name: "Workout Boost", count: 12 },
        { name: "Late Night Drive", count: 24 },
        { name: "Indie Gems", count: 15 },
        { name: "Jazz Nights", count: 10 },
    ];
    const displayedPlaylists = playlists.slice(0, 4);
    const hasMorePlaylists = playlists.length > 4;

    return (
        <section
            id="setting-page"
            className="relative w-full h-full bg-custom-white rounded-xl pt-3 lg:px-6 md:px-5 px-2 gap-7 text-custom-black overflow-y-auto flex flex-col"
        >
            <h1 className="text-5xl font-extrabold text-custom-black">Settings</h1>

            {/* User Info */}
            <div className="flex flex-col items-start w-full">
                <div className="flex justify-between items-center w-full">
                    <div className="flex items-center gap-6">
                        <img
                            className="w-32 h-32 rounded-full border-2 border-custom-gray"
                            src="/images/avatar.svg"
                            alt="User Avatar"
                        />
                        <div>
                            <p className="text-3xl font-bold">{user.username}</p>
                            <p className="text-base text-custom-black">{user.email}</p>
                        </div>
                    </div>
                    <div>
                        <button
                            onClick={() => alert("Invite feature coming soon!")}
                            className="bg-custom-blue hover:bg-custom-blue/70 py-3 px-8 mx-2 rounded-full font-bold text-lg transition shadow-sm text-white"
                        >
                            Invite
                            <FontAwesomeIcon icon={faShare} className='ms-2' />
                        </button>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-500/70 py-3 px-8 mx-2 rounded-full font-bold text-lg transition shadow-sm text-white"
                        >
                            Logout
                            <FontAwesomeIcon icon={faSignOut} className='ms-2' />
                        </button>
                    </div>
                </div>
            </div>

            {/* Content Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full mt-3">
                {/* Favorite Songs Section */}
                <div className="w-full">
                    <h2 className="text-2xl font-bold mb-2 text-custom-black flex items-center gap-2">
                        <FontAwesomeIcon icon={faMusic} className='text-custom-blue mx-2' />
                        Favorite Songs
                    </h2>
                    {loading ? (
                        <p className="text-custom-black/60">Loading your favorite songs...</p>
                    ) : favorites?.length === 0 ? (
                        <p className="text-custom-black/60">You haven’t added any favorites yet.</p>
                    ) : (
                        <>
                            <div className="flex flex-wrap">
                                {displayedFavorites?.map((song, index) => (
                                    <div key={index} className="w-1/2 p-2">
                                        <div className="bg-custom-blue/30 hover:bg-custom-blue/60 flex items-center w-full h-full shadow-md rounded-xl transition-all gap-4 p-2">
                                            <img
                                                src={`/images/${song.imagesrc}`}
                                                alt={song.title}
                                                className="w-24 h-24 rounded-lg object-cover"
                                            />
                                            <div>
                                                <p className="text-lg font-semibold line-clamp-1">{song.musicname}</p>
                                                <p className="text-sm text-custom-black/70 line-clamp-1">{song.artistname}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {hasMoreFavorites && (
                                <div className="w-full p-2 h-24">
                                    <Link to="/favourite" className="bg-custom-blue/30 hover:bg-custom-blue/60 flex items-center justify-center w-full h-full shadow-md rounded-xl transition-all gap-4 p-2">
                                        <div
                                            to="/favourite"
                                            className="text-custom-black text-lg font-bold hover:text-custom-blue transition"
                                        >
                                            View All ...
                                        </div>
                                    </Link>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Playlists Section */}
                <div className="w-full">
                    <h2 className="text-2xl font-bold mb-2 text-custom-black flex items-center gap-2">
                        <FontAwesomeIcon icon={faFolder} className='text-custom-blue mx-2' />
                        Your Playlists
                    </h2>
                    <div className="grid grid-cols-1 gap-4 p-2">
                        {displayedPlaylists?.map((playlist, index) => (
                            <div
                                key={index}
                                className="bg-custom-blue/30 hover:bg-custom-blue/50 transition p-4 rounded-xl shadow-md h-20"
                            >
                                <p className="text-lg font-semibold">{playlist.name}</p>
                                <p className="text-sm text-custom-black/70">{playlist.count} songs</p>
                            </div>
                        ))}
                        {hasMorePlaylists && (
                            <Link to="/playlist" className="grid grid-cols-1 gap-4">
                                <div
                                    className="bg-custom-blue/30 hover:bg-custom-blue/50 transition p-4 rounded-xl shadow-md text-lg font-bold h-20 flex items-center justify-center"
                                >
                                    View All ...
                                </div>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Setting;