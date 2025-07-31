import React from "react";
import FavoriteIcon from "../components/FavoriteIcon";
import MenuIcon from "../components/MenuIcon";
import clsx from "clsx";

const MusicList = ({ myListArray, isShowAlbumAndTime, userId, onPlay, currentPlaying }) => {
    return (
        <div className="flex-1 overflow-y-auto scrollbar-custom">
            {/* Header Row */}
            {isShowAlbumAndTime && (
                <div className="w-full flex items-center justify-between text-lg pb-2 shadow-sm text-opacity-50 capitalize font-semibold text-custom-black bg-custom-white cursor-pointer sticky top-0 z-30">
                    <div className="w-2/6 flex items-center gap-5 border-l-4 border-transparent">
                        <span className="w-[10px] ms-2">#</span>
                        <h2 className="xl:ms-[70px] 2xl:ms-[75px]">Title</h2>
                    </div>
                    <div className="w-1/6 text-left">Album</div>
                    <div className="w-1/6 text-right">Time</div>
                    <div className="w-2/6 flex items-center justify-end pe-28">Playing</div>
                </div>
            )}

            {/* Music Items */}
            {myListArray?.map((item, index) => (
                <div
                    key={item.id}
                    data-testid={`music-item-${item.id}`}
                    className="music-item w-full flex items-center justify-between py-2 text-custom-black cursor-pointer"
                     // 🎯 اتصال به پلیر
                >
                    {/* Left Section: Index + Image + Title */}
                    <div onClick={() => onPlay?.(item)} className={`w-full flex items-center ${currentPlaying?.id === item.id ? 'border-l-4 border-custom-pink' : 'border-l-4 border-transparent'}`}>
                        <span className="w-5 text-center xl:text-lg lg:text-base md:text-lg font-semibold opacity-50 md:ms-2">
                            {String(index + 1).padStart(2, "0")}
                        </span>
                        <img
                            className="lg:w-[65px] md:w-[75px] w-[55px] xl:mx-5 lg:mx-3 md:mx-4 mx-2 shadow-lg rounded-md"
                            src={`/images/${item.imagesrc}`}
                            alt={`${item.musicname} by ${item.artistname}`}
                        />
                        <div className="capitalize md:w-[200px] w-[150px]">
                            <h2 className="font-bold xl:text-xl lg:text-xl md:text-xl text-base line-clamp-1">
                                {item.musicname}
                            </h2>
                            <span className="text-custom-gray xl:text-[15px] lg:text-base md:text-lg text-sm line-clamp-1">
                                {item.artistname}
                            </span>
                        </div>
                    </div>

                    {/* Middle Section: Album + Time */}
                    {isShowAlbumAndTime && (
                        <React.Fragment>
                            <div className="w-1/6 text-left font-semibold text-md">{item.musicname}</div>
                            <div className="w-1/6 text-right font-semibold text-sm">{item.musictime}</div>
                        </React.Fragment>
                    )}

                    {/* Right Section: Views + Icons */}
                    <div
                        className={clsx({
                            "w-2/6": isShowAlbumAndTime,
                            "xl:w-2/5 lg:w-1/5": !isShowAlbumAndTime,
                            "relative flex items-center justify-end": true,
                        })}
                    >
                        <span className="text-custom-gray lg:text-sm md:text-base md:inline-block hidden font-semibold">
                            {item.viewnumber}
                        </span>
                        <FavoriteIcon userId={userId} songId={item.id} />
                        <MenuIcon />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MusicList;