const FindVideos = function() {

    this.init = () => {
        let $videos = document.querySelectorAll('.view-block-wrap');
        for (let i = 0; i < $videos.length; i++) {
            this.setupVideo($videos[i]);
        }
    }

    this.setupVideo = ($video) => {
        let $link = $video.querySelector('.video__link');
        let $media = $video.querySelector('.video__media');
        let $button = $video.querySelector('.video__button');
        let id = this.parseMediaURL($media);
        $video.addEventListener('click', () => {
            let $iframe = this.createIframe(id);
            $link.remove();
            $button.remove();
            $video.appendChild($iframe);
        });
        $link.removeAttribute('href');
        $video.classList.add('video--enabled');
    }

    this.parseMediaURL = ($media) => {
        let regexp = /https:\/\/i\.ytimg\.com\/vi\/([a-zA-Z0-9_-]+)\/maxresdefault\.jpg/i;
        let url = $media.src;
        let match = url.match(regexp);
        return match[1];
    }

    this.createIframe = (id) => {
        let $iframe = document.createElement('iframe');
        $iframe.setAttribute('allowfullscreen', '');
        $iframe.setAttribute('allow', 'autoplay');
        $iframe.setAttribute('src', this.generateURL(id));
        $iframe.classList.add('video__media');
        return $iframe;
    }

    this.generateURL = (id) => {
        let query = '?rel=0&showinfo=0&autoplay=1';
        return 'https://www.youtube.com/embed/' + id + query;
    }
}
