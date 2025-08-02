import { useEffect, useMemo, useState } from 'react';
import { recentFavList } from '../../data/tracks';

const RecentFavourite = () => {
  const [height, setHeight] = useState(window.innerHeight);

  // 🎯 مدیریت تغییر سایز پنجره
  useEffect(() => {
    const handleResize = () => setHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 🧠 تابع برای تعیین کلاس ارتفاع داینامیک
  const getDynamicHeight = (h) => {
    if (h >= 1000) return 'max-h-[55vh]';
    if (h >= 800) return 'max-h-[45vh]';
    return 'max-h-[41vh]';
  };

  const dynamicHeight = getDynamicHeight(height);

  // 🧹 رندر بهینه‌ی لیست با useMemo
  const renderedList = useMemo(() => (
    recentFavList.map(item => (
      <div key={item.id} className="flex flex-col p-2 cursor-pointer">
        <img
          className="m-auto rounded-xl drop-shadow-md"
          src={item.imageSrc}
          alt={item.title}
        />
        <div className="m-auto text-center">
          <h2 className="font-bold xl:text-lg lg:text-base mt-2">{item.title}</h2>
          <h5 className="xl:text-sm lg:text-xs font-semibold opacity-50 line-clamp-1">
            {item.subTitle}
          </h5>
        </div>
      </div>
    ))
  ), []);

  return (
    <div className="relative lg:block hidden w-full box-border">
      {/* 🔖 هدر بخش */}
      <div className="flex justify-between items-center px-2 mb-2">
        <h1 className="font-semibold xl:text-3xl md:text-2xl text-lg text-custom-black">
          Recent Favourite
        </h1>
        <button className="underline text-custom-blue xl:text-base lg:text-sm text-xs hover:text-blue-600 transition-colors">
          See all
        </button>
      </div>

      {/* 🧱 لیست با اسکرول و ارتفاع داینامیک */}
      <div className={`overflow-y-auto scrollbar-custom box-border ${dynamicHeight}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {renderedList}
        </div>
      </div>
    </div>
  );
};

export default RecentFavourite;