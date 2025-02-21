class VideoCarousel {
    constructor(target, videos, options = {}, show_label = true, speed_pos = {}) {
        this.target = target;
        this.videos = videos;
        this.options = options;
        this.show_label = show_label;
        this.speed_pos = speed_pos;
        this.init();
    }

    init() {
        const carousel_container = document.createElement('div');
        carousel_container.classList.add('splide');
        carousel_container.id = 'carousel_container'; // 添加 id

        const track = document.createElement('div');
        track.classList.add('splide__track');
        const list = document.createElement('ul');
        list.classList.add('splide__list');

        this.videos.forEach(item => {
            const li = document.createElement('li');
            li.className = 'splide__slide video-container';
            let videoHTML = `
                <video muted loop autoplay>
                    <source src="${item.video}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            `;

            // 如果需要显示 label，则添加 span
            if (this.show_label) {
                videoHTML += `<span class="top-label">${item.label}</span>`;
            }

            videoHTML += `<span class="speed-label">${item.speed}</span>`;
            li.innerHTML = videoHTML;
            list.appendChild(li);

        });

        track.appendChild(list);
        carousel_container.appendChild(track);

        const arrows = `
            <div class="splide__arrows">
                <button class="splide__arrow splide__arrow--prev">&#8592;</button>
                <button class="splide__arrow splide__arrow--next">&#8594;</button>
            </div>
        `;
        carousel_container.innerHTML += arrows;

        document.querySelector(this.target).appendChild(carousel_container);

        new Splide(this.target + ' .splide', {
            perPage: 3,
            perMove: 1,
            autoplay: true,
            rewind: true,
            interval: 10000,
            pagination: true,
            arrows: true,
            breakpoints: {
                768: {
                    perPage: 1
                }
            },
            ...this.options
        }).mount();
    }
}

// Export globally
window.VideoCarousel = VideoCarousel;
