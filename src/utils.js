export const waitFor = sec => new Promise(res => setTimeout(res, sec));

export const showImageAndText = ({ image, text }) => {
    document.querySelector('.place').style.backgroundImage = `url(${image})`;
    document.querySelector('.text').innerText = text;
};
