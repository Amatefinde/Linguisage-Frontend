import {IUserSense} from "../types/UserSensesInterface.ts";

function pickRandomImage(sense: IUserSense): string {
    const amountWordImages = sense.word_images.length
    const randomIndex = Math.floor(Math.random() * amountWordImages);
    return sense.word_images[0].img
}

export default pickRandomImage;