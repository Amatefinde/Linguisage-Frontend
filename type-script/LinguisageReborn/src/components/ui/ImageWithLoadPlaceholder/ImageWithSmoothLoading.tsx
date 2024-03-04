import React, {useState} from 'react';
import classes from "./ImageWithLoadPlaceholder.module.css"

interface ImageWithLoadPlaceholderInterface {
    src: string;
    alt?: string;
    imgStyle?: React.CSSProperties;
}

const ImageWithSmoothLoading: React.FC<ImageWithLoadPlaceholderInterface> = ({
                                                                                 src,
                                                                                 alt = "",
                                                                                 imgStyle = {width: 160, height: 230},

                                                                             }) => {
    const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false)
    const image = new Image();
    image.src = src;
    image.onload = () => {
        setIsImageLoaded(true)
    }


    return (
        isImageLoaded && <img className={classes.smoothAppearance} style={imgStyle} src={src} alt={alt}/>
    );
};

export default ImageWithSmoothLoading;