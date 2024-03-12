import {Swiper, SwiperSlide} from 'swiper/react';
import React from 'react';
import { Keyboard, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import {IWordImage} from "../../../../../types/WordInterface.ts";
import classes from "./ImageCarousel.module.css"
interface SwiperExampleInterface {
    images: IWordImage[];
}


const ImageCarousel: React.FC<SwiperExampleInterface> = ({images}) => {
    return (
        <Swiper
            slidesPerView={1}
            spaceBetween={15}
            keyboard={{
                enabled: true,
            }}
            pagination={{
                clickable: true,
            }}
            navigation={true}
            modules={[Keyboard, Pagination, Navigation]}
            className={classes.carousel}
        >
            {images.map(image =>
                <SwiperSlide>
                    <img style={{width: "100%"}} src={image.img}/>
                </SwiperSlide>
            )}


        </Swiper>
    );
};
export default ImageCarousel;
