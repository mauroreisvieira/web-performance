import { LazyImage } from './lazy-image.js';

customElements.define('lazy-image', LazyImage);

const images = document.querySelectorAll('lazy-image');
const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
        entry.target.visible = entry.isIntersecting;
    }
});

for (const image of images) {
    // if on screen
    io.observe(image);

    // or clicked
    image.onclick = () => {
        image.visible = true;
    }

    // or there is idle time
    requestIdleCallback(() => {
        image.visible = true;
    });
}
