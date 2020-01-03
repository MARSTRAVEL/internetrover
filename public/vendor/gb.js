
$(document).on('ready', function() {
  $(".regular").slick({
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4
  });
  const play = document.getElementById("playButton");
  const video = document.getElementById('feateredVideos-video');

  play.addEventListener("click", () => {
     video.play();
    }, false);
});
