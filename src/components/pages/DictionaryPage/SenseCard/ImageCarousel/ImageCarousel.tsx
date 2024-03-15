import {Swiper, SwiperSlide} from 'swiper/react';
import React from 'react';
import {Pagination, Mousewheel} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import {IWordImage} from "../../../../../types/WordInterface.ts";
import classes from "./ImageCarousel.module.css"

interface SwiperExampleInterface {
    images: IWordImage[];
    height: number;
}

const ImageCarousel: React.FC<SwiperExampleInterface> = ({images, height}) => {
    return (
        <Swiper
            slidesPerView={"auto"}
            spaceBetween={30}
            pagination={{
                clickable: true,
            }}
            centeredSlides={images.length === 1}
            mousewheel={true}
            modules={[Pagination, Mousewheel]}
            style={{height: height}}
            className={classes.carousel}
        >
            {images.map(image =>
                <SwiperSlide key={image.f_image_id} className={classes.carouselSlide}>
                    <img key={image.f_image_id} style={{height: "100%", borderRadius: 20}} src={image.img} alt=""/>
                </SwiperSlide>
            )}
        </Swiper>
    );
};

export default ImageCarousel;