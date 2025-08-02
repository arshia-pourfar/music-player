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
              "grid grid-cols-12 items-center gap-2 p-2 w-full relative",
              "hover:bg-custom-light transition-colors duration-200",
            )}
          >
            {/* ستون: شماره، کاور، عنوان/خواننده */}
            <div
              className={`${isShowAlbumAndTime ? "col-span-4" : "col-span-8"} ${isPlaying ? "border-l-4 border-custom-pink" : "border-l-4 border-transparent"} flex items-center gap-3 cursor-pointer ps-1`}
              onClick={() => onPlay?.(item, myListArray)}
            >
              <span className="w-6 text-center text-base font-semibold opacity-50">
                {String(index + 1).padStart(2, "0")}
              </span>

              <img
                src={`/images/${item.imagesrc}`}
                alt={`${item.musicname} by ${item.artistname}`}
                className="size-16 rounded-md object-cover shadow-sm"
              />

              <div className="flex flex-col overflow-hidden">
                <span className="font-bold text-lg truncate">{item.musicname}</span>
                <span className="text-custom-gray text-sm truncate">{item.artistname}</span>
              </div>
            </div>

            {/* آلبوم */}
            {isShowAlbumAndTime && (
              <div className="col-span-3 text-sm md:text-sm font-semibold truncate cursor-pointer" onClick={() => onPlay?.(item, myListArray)}>
                {item.albumname || item.musicname}
              </div>
            )}

            {/* زمان */}
            {isShowAlbumAndTime && (
              <>
                <div className="col-span-1 text-xs md:text-sm font-semibold cursor-pointer" onClick={() => onPlay?.(item, myListArray)}>{item.musictime}</div>
                <div className="col-span-3 text-center text-custom-gray text-xs md:text-sm font-semibold truncate cursor-pointer" onClick={() => onPlay?.(item, myListArray)}>
                  {item.viewnumber}
                </div>
                <div className="col-span-1 flex justify-end gap-4">
                  <FavoriteIcon userId={userId} songId={item.id} />
                  <MenuIcon />
                </div>
              </>
            )}
            {!isShowAlbumAndTime && (
              <>
                <div className="col-span-4 flex justify-end gap-4">
                  <div className="text-right text-custom-gray text-xs md:text-sm font-semibold truncate">
                    {item.viewnumber}
                  </div>
                  <FavoriteIcon userId={userId} songId={item.id} />
                  <MenuIcon />
                </div>
              </>
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
        <div className="grid grid-cols-12 gap-2 px-4 py-3 sticky top-0 bg-custom-white text-sm font-semibold text-opacity-50 text-custom-black shadow-sm z-30">
          <div className="col-span-4 flex items-center gap-5">
            <span className="w-8 text-center">#</span>
            <span>Cover</span>
            <span>Title</span>
          </div>
          <span className="col-span-3">Album</span>
          <span className="col-span-1">Time</span>
          <span className="col-span-3 text-center">Views</span>
          <span className="col-span-1 text-right">Actions</span>
        </div>
      )}

      {/* آیتم‌ها */}
      {renderedList}
    </div>
  );
};

export default MusicList;
