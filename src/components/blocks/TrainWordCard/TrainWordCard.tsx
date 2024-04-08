import React, {useEffect, useState} from 'react';
import {IUserSense} from "../../../types/UserSensesInterface.ts";
import pickRandomImage from "../../../utils/pickRandomImage.ts";
import HorizontalTrainWordCard from "./HorizontalTrainWordCard/HorizontalTrainWordCard.tsx";
import VerticalTrainWordCard from "./VerticalTrainWordCard/VerticalTrainWordCard.tsx";
import NoImageWordCard from "./NoImageWordCard/NoImageWordCard.tsx";


interface TrainWordCardInterface {
    sense: IUserSense;
}


const TrainWordCard: React.FC<TrainWordCardInterface> = ({sense}) => {
    const image = new Image()
    const [pickedImageUrl, setPickedImageUrl] = useState<string | null>(null)
    useEffect(() => {
        const randomImageUrl = pickRandomImage(sense)
        if (randomImageUrl === null) {
            setImageType("noImage")
        } else {
            setPickedImageUrl(randomImageUrl)
        }
    }, [sense.definition]);

    image.src = pickedImageUrl
    const [imageType, setImageType] = useState<"horizontal" | "vertical" | "noImage" | "loading">("loading")
    image.onload = function () {
        const width = this.width;
        const height = this.height;
        if (width > height * 1.25 || sense.examples.length == 0) {
            setImageType("horizontal");
        } else {
            setImageType("vertical");
        }
    };
    const cards = {
        "horizontal": <HorizontalTrainWordCard sense={sense} imageUrl={image.src}/>,
        "vertical": <VerticalTrainWordCard sense={sense} imageUrl={image.src}/>,
        "noImage": <NoImageWordCard sense={sense} imageUrl={image.src}/>,
        "loading": null,
    }

    return cards[imageType];
};

export default TrainWordCard;