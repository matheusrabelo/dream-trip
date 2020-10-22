import axios from 'axios';
import * as webcam from './webcam';
import * as faceRecognition from './face-recognition';
import { waitFor, showImageAndText } from './utils';

const loadPlaceImage = ({ url }) => {
    const text = 'Pay attention to this image';
    showImageAndText({ image: url, text })
};

const getPlaces = async () => {
    let placesUrl = 'http://localhost:3000/places.json';

    if (process.env.NODE_ENV == 'production') {
        placesUrl = './places.json';
    }

    const places = await axios.get(placesUrl);
    return places.data;
};

const getScore = ({ expressions }) => {
    const { angry, disgusted, fearful, happy, sad, surprised } = expressions;
    const positive = happy + surprised;
    const negative = disgusted + angry + fearful + sad;
    return 4 * positive - 2 * negative;
};

const getResultWithHighestScore = (results) => {
    let highestScore = 0;
    let bestResult = results[0];

    for (let i = 0; i < results.length; i++) {
        const result = results[i];
        const score = getScore(result);
        if (score > highestScore) {
            highestScore = score;
            bestResult = result;
        }
    }

    return bestResult;
};

export const findTheBest = async () => {
    const places = await getPlaces();
    const results = [];

    for (let i = 0; i < places.length; i++) {
        // loading image
        const place = places[i];
        loadPlaceImage(place);
        
        // detecting user expression
        const video = webcam.getVideo();
        const { expressions } = await faceRecognition.detectFaceExpression(video);
        results.push({ place, expressions });

        // waiting for 5 seconds
        await waitFor(5000);
    }

    console.log('results');
    console.log(results);
    return getResultWithHighestScore(results);
};
