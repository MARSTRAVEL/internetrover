
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
typingWord();
