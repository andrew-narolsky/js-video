const FindVideos = function () {
    this.init();
}

FindVideos.prototype.init = function () {
    let $videos = document.querySelectorAll('.view-block-wrap');
    for (let i in $videos) {
        if ($videos.hasOwnProperty(i)) {
            this.setupVideo($videos[i]);
        }
    }
}

FindVideos.prototype.setupVideo = function ($video) {
    let $link = $video.querySelector('.video__link');
    let $media = $video.querySelector('.video__media');
    let $button = $video.querySelector('.video__button');
    let id = this.parseMediaURL($media);
    $video.addEventListener('click', function () {
        let $iframe = FindVideos.prototype.createIframe(id);
        $link.remove();
        $button.remove();
        $video.appendChild($iframe);
    });
    $link.removeAttribute('href');
    $video.classList.add('video--enabled');
}

FindVideos.prototype.parseMediaURL = function ($media) {
    let regexp = /https:\/\/i\.ytimg\.com\/vi\/([a-zA-Z0-9_-]+)\/maxresdefault\.jpg/i;
    let url = $media.src;
    let match = url.match(regexp);
    return match[1];
}

FindVideos.prototype.createIframe = function (id) {
    let $iframe = document.createElement('iframe');
    $iframe.setAttribute('allowfullscreen', '');
    $iframe.setAttribute('allow', 'autoplay');
    $iframe.setAttribute('src', this.generateURL(id));
    $iframe.classList.add('video__media');
    return $iframe;
}

FindVideos.prototype.generateURL = function (id) {
    let query = '?rel=0&showinfo=0&autoplay=1';
    return 'https://www.youtube.com/embed/' + id + query;
}
