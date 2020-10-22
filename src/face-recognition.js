import * as faceapi from 'face-api.js';

export const loadModels = async () => {
    let modelsUrl = 'http://localhost:3000/models';

    if (process.env.NODE_ENV == 'production') {
        modelsUrl = './models';
    }

    await faceapi.nets.ssdMobilenetv1.loadFromUri(modelsUrl);
    await faceapi.loadFaceExpressionModel(modelsUrl);
};

export const detectFaceExpression = async (video) => {
    const minConfidence = process.env.MIN_CONFIDENCE || 0.5;
    const options = new faceapi.SsdMobilenetv1Options({ minConfidence });
    
    return faceapi
        .detectSingleFace(video, options)
        .withFaceExpressions();
};
