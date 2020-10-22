import * as tf from '@tensorflow/tfjs';
import * as faceRecognition from './face-recognition';
import * as webcam from './webcam';
import { findTheBest } from './trip-finder';
import { showImageAndText, waitFor } from './utils';

const showLoadingScreen = () => {
    const image = 'https://images.unsplash.com/photo-1599689444589-133726281155?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80';
    const text = 'Please allow the webcam access and pay attention to the images that follow';
    showImageAndText({ image, text });
};

const showErrorScreen = () => {
    const image = 'https://images.unsplash.com/photo-1563207153-f403bf289096?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=751&q=80';
    const text = 'We need access to your webcam =(';
    showImageAndText({ image, text });
};

const showDreamTrip = ({ place }) => {
    const image = place.url;
    const text = `You'll love ${place.name}!`;
    showImageAndText({ image, text });
};

(async () => {
    // loading models
    await faceRecognition.loadModels();

    // asking for user permission
    try {
        showLoadingScreen();
        await webcam.init();

        // finding the best trip
        await waitFor(5000);
        const bestTrip = await findTheBest();

        // showing results
        showDreamTrip(bestTrip);
    } catch (err) {
        console.log(err);
        showErrorScreen();
    }
})();
