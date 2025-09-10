import React, { useMemo } from "react";
import FavoriteIcon from "../components/FavoriteIcon";
import MenuIcon from "../components/MenuIcon";
import clsx from "clsx";

const MusicList = ({ myListArray, isShowAlbumAndTime, userId, onPlay, currentPlaying }) => {
  const renderedList = useMemo(
    () =>
      myListArray?.map((item, index) => {
        const isPlaying = currentPlaying?.id === item.id;

        return (
          <div
            key={item.id}
            className={clsx(
              "grid items-center gap-2 p-2 w-full relative",
              "hover:bg-custom-light transition-colors duration-200 grid-cols-12",
            )}
          >
            {/* ستون: شماره، کاور، عنوان/خواننده */}
            <div
              className={clsx(
                isShowAlbumAndTime ? "col-span-7 md:col-span-5" : "col-span-8",
                isPlaying ? "border-l-4 border-custom-pink" : "border-l-4 border-transparent",
                "flex items-center gap-2 sm:gap-3 cursor-pointer ps-1"
              )}
              onClick={() => onPlay?.(item, myListArray)}
            >
              <span className="lg:w-6 w-4 text-center text-xs sm:text-sm lg:text-base font-semibold opacity-50">
                {String(index + 1).padStart(2, "0")}
              </span>

              <img
                src={`/images/${item.imagesrc}`}
                alt={`${item.musicname} by ${item.artistname}`}
                className="w-12 sm:w-14 lg:w-16 h-12 sm:h-14 lg:h-16 rounded-md object-cover shadow-sm"
              />

              <div className="flex flex-col overflow-hidden">
                <span className="font-bold text-sm sm:text-base md:text-lg truncate">{item.musicname}</span>
                <span className="text-custom-gray text-xs sm:text-sm truncate">{item.artistname}</span>
              </div>
            </div>

            {/* آلبوم */}
            {isShowAlbumAndTime && (
              <div className="col-span-3 sm:col-span-2 text-xs sm:text-sm font-semibold truncate cursor-pointer lg:inline-block hidden" onClick={() => onPlay?.(item, myListArray)}>
                {item.albumname || item.musicname}
              </div>
            )}

            {/* زمان */}
            {isShowAlbumAndTime && (
              <>
                <div className="lg:col-span-1 col-span-3 text-xs sm:text-sm font-semibold cursor-pointer" onClick={() => onPlay?.(item, myListArray)}>
                  {item.musictime}
                </div>
                <div className="lg:col-span-3 col-span-3 sm:col-span-2 text-center text-custom-gray text-xs sm:text-sm font-semibold truncate cursor-pointer md:inline-block hidden" onClick={() => onPlay?.(item, myListArray)}>
                  {item.viewnumber}
                </div>
                <div className="lg:col-span-1 col-span-2 flex justify-end gap-2 sm:gap-4">
                  <FavoriteIcon userId={userId} songId={item.id} />
                  <MenuIcon />
                </div>
              </>
            )}

            {!isShowAlbumAndTime && (
              <div className="col-span-4 flex justify-between items-center gap-2 sm:gap-4">
                <div className="flex-1 text-right text-custom-gray text-xs sm:text-sm font-semibold truncate">
                  {item.viewnumber}
                </div>
                <FavoriteIcon userId={userId} songId={item.id} />
                <MenuIcon />
              </div>

            )}
          </div>
        );
      }),
    [myListArray, currentPlaying, onPlay, isShowAlbumAndTime, userId]
  );

  return (
    <div className="flex-1 overflow-y-auto scrollbar-custom">
      {/* هدر لیست */}
      {isShowAlbumAndTime && (
        <div className="grid grid-cols-12 gap-2 px-4 py-3 sticky top-0 bg-custom-white text-xs sm:text-sm md:text-sm font-semibold text-opacity-50 text-custom-black shadow-sm z-30">
          <div className="lg:col-span-5 md:col-span-5 col-span-7 flex items-center gap-2 sm:gap-3">
            <span className="w-8 text-center">#</span>
            <span>Cover</span>
            <span>Title</span>
          </div>
          <span className="lg:col-span-2 truncate lg:inline-block hidden">Album</span>
          <span className="lg:col-span-1 md:col-span-1 col-span-2 truncate">Time</span>
          <span className="lg:col-span-3 md:col-span-5  text-center truncate md:inline-block hidden">Views</span>
          <span className="lg:col-span-1 md:col-span-1 col-span-3 text-right">Actions</span>
        </div>
      )}

      {/* آیتم‌ها */}
      {renderedList}
    </div>
  );
};

export default MusicList;
