import React from 'react';
import Slider from 'react-slick';
import { headerPostItem } from '../../data/tracks';
import useWindowDimensions from '../../hooks/useWidthSize';

const HeaderPostCarousel = () => {
    const { height, width } = useWindowDimensions();

    const settings = {
        fade: width >= 1024 && height <= 1300,
        dots: true,
        infinite: true,
        speed: 1200,
        slidesToShow: width >= 1024 && height > 1300 ? 1.65 : 1,
        slidesToScroll: 1,
        arrows: false,
        vertical: true,
        autoplaySpeed: 3000,
        autoplay: true,
    };

    return (
        <div
            id="header-carousel"
            className="relative flex justify-center items-center h-[30%] min-h-[250px] lg:mt-0 mt-2"
        >
            <Slider
                {...settings}
                className="flex flex-nowrap justify-center items-center overflow-hidden relative "
            >
                {headerPostItem.map(item => (
                    <img
                        key={item.id}
                        src={item.imageSrc}
                        alt=""
                        className="rounded-3xl w-auto max-h-[300px] min-h-[250px] my-1 drop-shadow-md"
                    />
                ))}
            </Slider>
        </div>
    );
};

export default HeaderPostCarousel;