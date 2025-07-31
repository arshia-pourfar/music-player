import React from 'react';
import MenuIcon from '../MenuIcon';

const TopArtist = ({topArtistList}) => {
  return (
    <div className="relative lg:block hidden justify-center items-center h-[30%] min-h-[300px] lg:mt-0 mt-2">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold inline-block xl:text-3xl md:text-2xl">Top Artist</h1>
        <button className="underline text-custom-blue xl:text-base lg:text-sm">See all</button>
      </div>
      <div className="w-full h-full top-artist-list lg:px-1 xl:mt-3 md:mt-1 flex flex-col">
        {topArtistList && topArtistList.map((item, index) => (
          <div key={index} className="w-full min-h-fit flex items-center justify-between py-2 text-custom-black cursor-pointer">
            <div className="w-full items-center flex border-l-4 border-transparent">
              <img className="lg:w-[65px] md:w-[70px] shadow-lg rounded-md" src={item.imageSrc} alt="" />
              <div className="capitalize w-[200px] xl:mx-4 lg:mx-2 md:mx-3">
                <h2 className="font-bold xl:text-xl lg:text-xl md:text-xl line-clamp-1">{item.title}</h2>
                <span className="text-custom-gray xl:text-sm lg:text-base md:text-lg line-clamp-1 flex items-center">
                  <i className="fi fi-ss-waveform-path"></i>
                  <span className="inline-block mx-1">5.1M</span>
                  Plays
                </span>
              </div>
            </div>
            <div className="xl:w-2/5 lg:w-1/5 relative flex items-center justify-end">
              <MenuIcon />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopArtist;