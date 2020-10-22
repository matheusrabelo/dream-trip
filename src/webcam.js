const videoOptions = {
    audio: false,
    video: {
        facingMode: 'user',
    }
};

export const init = async () => {
    const stream = await navigator.mediaDevices.getUserMedia(videoOptions);
    document.querySelector('video').srcObject = stream;
};

export const getVideo = () => {
    return document.querySelector('.webcam');
};
