
let logo_canvas = document.getElementById("canvas");
let ctx = logo_canvas.getContext("2d");
let fontSize = 60;
let alpha =1;
//const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
//const randomByte = () => randomNumber(0, 255)
//const randomRgba = () => `rgba(${[randomByte(), randomByte(), randomByte(), 1].join(',')})`;

function draw(){
  ani_2 = window.requestAnimationFrame(draw, logo_canvas);
  ctx.fillStyle = `rgba(20, 138, 50, ${alpha})`;
  ctx.font = fontSize+"pt Arial ";
  ctx.fillText("R", 10,80);
  ctx.fillText("O", 60,80);
  ctx.fillText("V", 110,80);
  ctx.fillText("E", 160,80);
  ctx.fillText("R", 220,80);
  if (alpha>1){
    fontSize = 60;
    alpha = 1;
      window.cancelAnimationFrame(ani_2);
    //ctx.clearRect(0, 0, 280,90);
  }
    fontSize -= 0.5;
    alpha -= 0.025;

};


let x = 1;
let alpha_r = 0;
//drawLogo();
const draw_R =() =>{
  ani_1 = window.requestAnimationFrame(draw_R, logo_canvas);
  ctx.fillStyle = `rgba(20, 138, 50, ${alpha_r})`;
  ctx.font = 60+"pt Arial ";
  ctx.fillText("R", x ,80);
  //fontSize -= 1;
  alpha_r += 0.02;
  x += 5;
  if (x>280) {
    ctx.clearRect(0, 0, 280,90);
  //  ctx.fillText("R", 160 ,80);
    draw();
    window.cancelAnimationFrame(ani_1);
  }

};

const redirectToIndex = () =>{
  location.replace("https://internetrover.herokuapp.com/");
};
document.getElementById("logo").addEventListener("click", redirectToIndex);

draw_R();
