import { useEffect, useState } from 'react';
import { recentFavList } from '../../data/tracks';

const RecentFavourite = () => {
    const [height, setHeight] = useState(0);

    useEffect(() => {
        setHeight(window.innerHeight);
    }, []);

    const dynamicHeight =
        height >= 1000
            ? 'max-h-[55vh]'
            : height >= 800
                ? 'max-h-[45vh]'
                : 'max-h-[41vh]';


    return (
        <div className="relative lg:block hidden w-full box-border">
            <div className="flex justify-between items-center px-2 mb-2">
                <h1 className="font-semibold xl:text-3xl md:text-2xl text-lg text-custom-black">Recent Favourite</h1>
                <a href="#" className="underline text-custom-blue xl:text-base lg:text-sm text-xs hover:text-blue-600 transition-colors">
                    See all
                </a>
            </div>

            <div className={`overflow-y-auto scrollbar-custom box-border`}>
                <div className={`flex flex-wrap ${dynamicHeight}`}>
                    {recentFavList.map(item => (
                        <div key={item.id} className="flex flex-col xl:basis-1/3 lg:basis-1/2 p-2 cursor-pointer">
                            <img className="m-auto rounded-xl drop-shadow-md" src={item.imageSrc} alt="" />
                            <div className="m-auto">
                                <h2 className="font-bold xl:text-lg lg:text-base mt-2">{item.title}</h2>
                                <h5 className="xl:text-sm lg:text-xs font-semibold opacity-50 line-clamp-1">{item.subTitle}</h5>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RecentFavourite;