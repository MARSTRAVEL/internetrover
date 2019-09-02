
const typingcanvas = document.getElementById('typingcanvas');
const typing = typingcanvas.getContext('2d');

typingcanvas.height = window.innerHeight*0.2;
typingcanvas.width = window.innerWidth;

const drawtext = (wordStr, xPos, yPos) =>{
  typing.font = "30px Arial";
  typing.fillText(wordStr, xPos, yPos);
};

const typingWord = () =>{
  const stringArr = ['Hi,', 'You', 'Are', 'Here.', 'Welcome!'];
  let i=0;
  let t = 0.3;
  let timer = setInterval(function(){
      typing.font = "30px Arial";
      typing.fillText(stringArr[i], window.innerWidth*t, 50);
      t += 0.05;
      i += 1;
      if (i>=5) {
        clearInterval(timer);
        return;
      }

    }, 500);
};
typingWord();
