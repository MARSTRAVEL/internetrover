
const play = document.getElementById("playButton");
const video = document.getElementById('feateredVideos-video');

play.addEventListener("click", () => {
   video.play();
  }, false);

const slides = document.getElementsByClassName("city_img");
  // init slideShow images
let firstImgIndex = 0;
const showSlides=(n)=> {
  	for (let i = 0; i < 4; i++) {
  		if (n >= slides.length) {
  			n = 0;
  		}else if (n < 0) {
  			n = slides.length-1;
  		}
  		slides[n].style.display = 'block';
  		n+=1;
  	}
  }
const plusSlides=(num)=> {
  	firstImgIndex += num;
  	if (firstImgIndex>=slides.length) {
  		firstImgIndex =0;
  	}
  	if (firstImgIndex<0) {
  		firstImgIndex = slides.length-1;
  	}

  	for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    showSlides(firstImgIndex);
}

const myFunction=(x)=> {
  if (!x.matches) { // If media query matches
    showSlides(firstImgIndex);
  }
}

var x = window.matchMedia("(max-width: 1000px)")
myFunction(x) // Call listener function at run time
x.addListener(myFunction) // Attach listener function on state changes
