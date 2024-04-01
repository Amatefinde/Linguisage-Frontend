import React, {useState} from 'react';
import {IUserSense} from "../../../types/UserSensesInterface.ts";
import pickRandomImage from "../../../utils/pickRandomImage.ts";
import HorizontalTrainWordCard from "./HorizontalTrainWordCard/HorizontalTrainWordCard.tsx";
import VerticalTrainWordCard from "./VerticalTrainWordCard/VerticalTrainWordCard.tsx";


interface TrainWordCardInterface {
    sense: IUserSense;
}


const TrainWordCard: React.FC<TrainWordCardInterface> = ({sense}) => {
    const image = new Image()
    image.src = pickRandomImage(sense)
    const [imageOrientation, setImageOrientation] = useState<"horizontal" | "vertical" | "loading">("loading")
    image.onload = function() {
        const width = this.width;
        const height = this.height;
        if (width > height*1.25 && sense.examples.length != 0) {
            setImageOrientation("horizontal");
        } else {
            setImageOrientation("vertical");
        }
    };

    const cards = {
        "horizontal": <HorizontalTrainWordCard sense={sense} imageUrl={image.src}/>,
        "vertical": <VerticalTrainWordCard sense={sense} imageUrl={image.src} />,
        "loading": null,
    }
    return cards[imageOrientation];
};

export default TrainWordCard;