import React from 'react';
import MenuIcon from '../MenuIcon';

const TopArtist = ({ topArtistList }) => {
  return (
    <div className="relative lg:block hidden min-h-[300px]">
      {/* عنوان بخش */}
      <div className="flex justify-between items-center px-2">
        <h1 className="font-semibold text-2xl xl:text-3xl">Top Artist</h1>
        <button className="underline text-custom-blue text-sm xl:text-base">See all</button>
      </div>

      {/* لیست هنرمندان */}
      <div className="w-full h-full flex flex-col mt-1 ps-2">
        {topArtistList?.map((item, index) => (
          <div
            key={index}
            className="relative w-full flex items-center justify-between py-2 hover:bg-custom-light rounded-md transition-colors duration-200 cursor-pointer"
          >
            {/* بخش تصویر و اطلاعات */}
            <div className="flex items-center gap-3 flex-1">
              <img
                src={`/images/${item.imagesrc}`}
                alt={`Top artist: ${item.artistname}`}
                className="size-[70px] object-cover rounded-md shadow-lg"
              />

              <div className="flex flex-col overflow-hidden w-[200px]">
                <h2 className="font-bold text-lg xl:text-xl truncate">
                  {item.artistname}
                </h2>
                <span className="text-custom-gray text-sm flex items-center gap-1 mt-1">
                  <i className="fi fi-ss-waveform-path text-custom-gray"></i>
                  <span>5.1M</span> Plays
                </span>
              </div>
            </div>

            {/* آیکون منو */}
            <div className="px-2">
              <MenuIcon />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopArtist;
