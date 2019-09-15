
const typingcanvas = document.getElementById('typingcanvas');
const typing = typingcanvas.getContext('2d');

typingcanvas.height = window.innerHeight*0.2;
typingcanvas.width = window.innerWidth;

const drawtext = (wordStr, xPos, yPos) =>{
  typing.font = "30px Arial";
  typing.fillText(wordStr, xPos, yPos);
};

const typingWord = () =>{
  let gapBetweenWord = 0.05;
  let startDrawPosition  =0.3;

  if (window.innerWidth<=600) {
    gapBetweenWord = 0.13;
    startDrawPosition =0.01;
  }

  const stringArr = ['Hi,', 'You', 'Are', 'Here.', 'Welcome!'];
  let i=0;
  let timer = setInterval(function(){
      typing.font = "30px Arial";
      typing.fillText(stringArr[i], window.innerWidth*startDrawPosition, 50);
      startDrawPosition += gapBetweenWord;
      i += 1;
      if (i>=5) {
        clearInterval(timer);
        return;
      }

    }, 300);
};
//typingWord();

const image_canvas = document.getElementById('indeximage_canvas');
const imagecontext = image_canvas.getContext('2d');

 function drawCanvasImage(canvas, width, height){
  const img=new Image();
  img.src = "pictures/juliaset.jpg";
  img.onload = function () {
    console.log('i am running!');
    canvas.drawImage(img, 0, 0);
  };
};

const shuffleArray = (array) =>{
  for(let i = 500; i < array.length; i += 1000){
  const random1 = Math.floor(Math.random() * 1000000)*2;
  const random2 = Math.floor(Math.random() * 1000000)*2;

 for (let j = 0; j < 30; j +=4) {

   let tem1 = array[random1+j];
   let tem2 = array[random1+j+1];
   let tem3 = array[random1+j+2];

   array[random1+j] = array[random2+j];
   array[random1+j+1] = array[random2+j+1];
   array[random1+j+2] = array[random2+j+2];

   array[random2+j] = tem1;
   array[random2+j+1] = tem2;
   array[random2+j+2] = tem3;

    tem1 = array[random1+3200+j];
   tem2 = array[random1+j+3200+1];
   tem3 = array[random1+j+3200+2];

   array[random1+j+3200] = array[random2+j+3200];
   array[random1+j+1+3200] = array[random2+j+1+3200];
   array[random1+j+2+3200] = array[random2+j+2+3200];

   array[random2+j+3200] = tem1;
   array[random2+j+1+3200] = tem2;
   array[random2+j+2+3200] = tem3;

    tem1 = array[random1+3200*2+j];
    tem2 = array[random1+j+3200*2+1];
    tem3 = array[random1+j+3200*2+2];

   array[random1+j+3200*2] = array[random2+j+3200*2];
   array[random1+j+1+3200*2] = array[random2+j+1+3200*2];
   array[random1+j+2+3200*2] = array[random2+j+2+3200*2];

   array[random2+j+3200*2] = tem1;
   array[random2+j+1+3200*2] = tem2;
   array[random2+j+2+3200*2] = tem3;

       tem1 = array[random1+3200*3+j];
       tem2 = array[random1+j+3200*3+1];
       tem3 = array[random1+j+3200*3+2];

      array[random1+j+3200*3] = array[random2+j+3200*3];
      array[random1+j+1+3200*3] = array[random2+j+1+3200*3];
      array[random1+j+2+3200*3] = array[random2+j+2+3200*3];

      array[random2+j+3200*3] = tem1;
      array[random2+j+1+3200*3] = tem2;
      array[random2+j+2+3200*3] = tem3;

      tem1 = array[random1+3200*4+j];
      tem2 = array[random1+j+3200*4+1];
      tem3 = array[random1+j+3200*4+2];

     array[random1+j+3200*4] = array[random2+j+3200*4];
     array[random1+j+1+3200*4] = array[random2+j+1+3200*4];
     array[random1+j+2+3200*4] = array[random2+j+2+3200*4];

     array[random2+j+3200*4] = tem1;
     array[random2+j+1+3200*4] = tem2;
     array[random2+j+2+3200*4] = tem3;
 }
}
};

drawCanvasImage(imagecontext);

document.getElementById('indeximage_canvas').addEventListener("click", function(e){
  let xPosition = e.clientX;
  let yPosition = e.clientY;
  const imgData = imagecontext.getImageData(0, 0, image_canvas.width, image_canvas.height);
  const orginalImage = imgData;
  shuffleArray(imgData.data);
  imagecontext.putImageData(imgData, 0, 0);
});

document.getElementById('indeximage_canvas').addEventListener("dblclick",function(){
  drawCanvasImage(imagecontext);
});
