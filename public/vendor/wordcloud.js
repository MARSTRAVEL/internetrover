// max font size : 92
const MinBoxSize = 2; // minimun box size
const fontFamily = 'sans-serif'; // font style
const wordWidthOfBvh = 350;
const wordHeightOfBvh = 300;
const maxFontSize = 60;
const minFontSize = 10;
/*const inputWordList = [
  { normal: 'Interesting', count: '100' },
  { normal: 'Finland', count: '200' },
];
*/
let inputWordList;
// changed wordFontSize
const wordFontSize = (inputWords) => {
  let multiplier;
  const maxAppearWord = Math.max(...inputWords.map(o => o.count));
  const minAppearWord = Math.min(...inputWords.map(o => o.count));
  if (maxAppearWord === minAppearWord) {
    multiplier = 0;
  } else {
    multiplier = maxFontSize - minFontSize;
  }
  for (let item in inputWords) {
    if (inputWords.hasOwnProperty(item)) {
      if (inputWords[item].count <= 1) {
        inputWords[item].fontSize = minFontSize;
      } else {
        inputWords[item].fontSize = Math.round(Math.log(inputWords[item].count) / Math.log(maxAppearWord)
        * multiplier + minFontSize);
      }
    }
  }
  return inputWords;
};

const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const randomByte = () => randomNumber(0, 255)
const randomRgba = () => `rgba(${[randomByte(), randomByte(), randomByte(), 1].join(',')})`

// create canvas for getting pixcel of each word, doesnt show this canvas
// text.length = 12, fontSize 55 otherwise out of box
const canvasGetPixcel = document.createElement('canvas');
//document.body.appendChild(canvasGetPixcel);
canvasGetPixcel.width = wordWidthOfBvh;
canvasGetPixcel.height = wordHeightOfBvh;
//canvasGetPixcel.style.border = '0px none black;';
const c = canvasGetPixcel.getContext('2d');

// Bounding Volume Hierarchy Tree constructor
// topLeft x-Coordinate:topLeftX bottomRight X-Coordinate: bottomRightX
class BvhTree {
  constructor(topLeftX, topLeftY, bottomRightX, bottomRightY) {
    this.topLeftX = topLeftX;
    this.topLeftY = topLeftY;
    this.bottomRightX = bottomRightX;
    this.bottomRightY = bottomRightY;
    this.children = [];
  }

  // add children nodes
  addChildNode(children) {
    this.children = [].concat(this.children, children);
  }
}
// detect bounding box we are working on is inside word or not
const boundingBoxIsInsideWord = (wordPixel, boundingBox) => {
  const {
    x0, y0, x1, y1,
  } = boundingBox;
  const widthOfBoungBox = wordPixel.x1 - wordPixel.x0;
  const wordPixelArr = wordPixel.wordPixelArray;

  // if there is empty pixcel, then boundingBox is not inside word
  for (let i = x0; i < x1; i += 1) {
    for (let j = y0; j < y1; j += 1) {
      if (!wordPixelArr[j * widthOfBoungBox + i]) return false;
    }
  }
  return true;
};
// boundingBox intesect word or not
const boundingBoxIntersectWord = (wordPixel, boundingBox) => {
  let {
    x0, y0, x1, y1,
  } = boundingBox;
  x0 = Math.max(0, x0 - wordPixel.x0);
  y0 = Math.max(0, y0 - wordPixel.y0);
  x1 = Math.min(wordPixel.x1, x1) - wordPixel.x0;
  y1 = Math.min(wordPixel.y1, y1) - wordPixel.y0;

  const widthOfBoungBox = wordPixel.x1 - wordPixel.x0;
  const wordPixelArr = wordPixel.wordPixelArray;
  for (let j = y0; j < y1; j += 1) {
    for (let i = x0; i < x1; i += 1) {
      if (wordPixelArr[j * widthOfBoungBox + i]) return true;
    }
  }
  return false;
};
// get pxels array of each word
const getWordPixel = (text, wordfont, rotateDegree) => {
  const fontSize = wordfont;
  c.clearRect(0, 0, wordWidthOfBvh * 2, wordHeightOfBvh * 2);
  c.save();
  c.textBaseline = 'top';
  c.font = `${~~fontSize}px ${fontFamily}`;// eslint-disable-line no-bitwise
  c.translate(70, 0);
  c.rotate(rotateDegree * Math.PI / 180);
  c.fillText(text, 0, 0);
  c.restore();
  // imageData:width、height、data
  // 其中data为Uint8ClampedArray，是一个长度为width*height长度的一维数组，描述各个像素的rgba
  const imageData = c.getImageData(1, 1, wordWidthOfBvh, wordHeightOfBvh);
  const pixels = imageData.data;
  const pixelArray = [];
  // 如果这个像素内的r+g+b+a不为0，则表示该像素有内容
  for (let i = 0; i < wordWidthOfBvh * wordHeightOfBvh; i += 1) {
    pixelArray[i] = pixels[i * 4 + 0] + pixels[i * 4 + 1] + pixels[i * 4 + 2] + pixels[i * 4 + 3];
  }
  return pixelArray;
};
// bottom up build Hierarchical Bounding Box Tree for each word
const buildBvhTree = (wordPixel, boundingBox) => {
  const {
    x0, y0, x1, y1,
  } = boundingBox;
  // the bounding box we are working on to decide to separate or not(target box)
  if (boundingBoxIsInsideWord(wordPixel, boundingBox)) return new BvhTree(x0, y0, x1, y1);
  if (boundingBoxIntersectWord(wordPixel, boundingBox)) {
    const tree = new BvhTree(x0, y0, x1, y1);
    // if boundingBox bigger than MinBoxSize, divide bounding box into four parts
    if (x1 - x0 > MinBoxSize || y1 - y0 > MinBoxSize) {
      const newX = Math.floor((x0 + x1) / 2);
      const newY = Math.floor((y0 + y1) / 2);

      const topLeft = buildBvhTree(wordPixel, {
        x0, y0, x1: newX, y1: newY,
      });
      const topRight = buildBvhTree(wordPixel, {
        x0: newX, y0, x1, y1: newY,
      });
      const bottomLeft = buildBvhTree(wordPixel, {
        x0, y0: newY, x1: newX, y1,
      });
      const bottomRight = buildBvhTree(wordPixel, {
        x0: newX, y0: newY, x1, y1,
      });
      if (topLeft) { tree.addChildNode(topLeft); }
      if (topRight) { tree.addChildNode(topRight); }
      if (bottomLeft) { tree.addChildNode(bottomLeft); }
      if (bottomRight) { tree.addChildNode(bottomRight); }

    // topLeft && tree.addChildren(topLeft)
    }
    return tree;
  }
  return null;
};
// initialize BvhTree
const initializeBvhTree = (text, wordfontS, rotateDegree) => {
  const initialBoundingBox = {
    x0: 0, y0: 0, x1: wordWidthOfBvh, y1: wordHeightOfBvh,
  };
  return buildBvhTree(
    { wordPixelArray: getWordPixel(text, wordfontS, rotateDegree), ...initialBoundingBox },
    initialBoundingBox,
  );
};


// two trees overlapTest
const twoBoundingBoxesIntersect = (subTreeA, subTreeB, positionA, positionB) => {
  const [ax, ay] = positionA;
  const [bx, by] = positionB;
  return subTreeA.topLeftX + ax < subTreeB.bottomRightX + bx
  && subTreeA.topLeftY + ay < subTreeB.bottomRightY + by
  && subTreeA.bottomRightX + ax > subTreeB.topLeftX + bx
  && subTreeA.bottomRightY + ay > subTreeB.topLeftY + by;
};
const treesOverlaped = (treeA, treeB, positionA, positionB) => {
  if (twoBoundingBoxesIntersect(treeA, treeB, positionA, positionB)) {
    if (!treeA.children.length) {
      if (!treeB.children.length) return true;
      for (let i = 0, n = treeB.children.length; i < n; i += 1) {
        if (treesOverlaped(treeA, treeB.children[i], positionA, positionB)) return true;
      }
    } else {
      for (let i = 0, n = treeA.children.length; i < n; i += 1) {
        if (treesOverlaped(treeB, treeA.children[i], positionB, positionA)) return true;
      }
    }
  }
  return false;
};
function moveSteps(a, b, step) {
  const angle = 0.35 * step;
  const x = (12 + 4 * angle) * Math.cos(angle) + a;
  const y = (12 + 4 * angle) * Math.sin(angle) + b;
  return [Math.round(x), Math.round(y)];
}

// unplacedWord overlapplacedWordsArray
const wordOverlapeAllPlaced = (word, wordarray) => {
  // not overlap
  let overlap = false;
  const unplacedWord = word;
  const placedWords = wordarray;
  for (let i = 0; i < placedWords.length; i += 1) {
    if (placedWords[i].rotate === true) {
      if (treesOverlaped(placedWords[i].rotatebvhTree, unplacedWord.bvhTree,
        placedWords[i].drawPosition, unplacedWord.drawPosition)) {
        overlap = true;
        break;
      }
    } else if (treesOverlaped(placedWords[i].bvhTree, unplacedWord.bvhTree,
      placedWords[i].drawPosition, unplacedWord.drawPosition)) {
      overlap = true;
      break;
    }
  }

  if (overlap === true) {
    unplacedWord.rotate = true;
    for (let i = 0; i < placedWords.length; i += 1) {
      if (placedWords[i].rotate === true) {
        if (treesOverlaped(placedWords[i].rotatebvhTree, unplacedWord.rotatebvhTree,
          placedWords[i].drawPosition, unplacedWord.drawPosition)) {
          overlap = true;
          unplacedWord.rotate = false;
          break;
        }
        overlap = false;
      } else {
        if (treesOverlaped(placedWords[i].bvhTree, unplacedWord.rotatebvhTree,
          placedWords[i].drawPosition, unplacedWord.drawPosition)) {
          overlap = true;
          unplacedWord.rotate = false;
          break;
        }
        overlap = false;
      }
    }
  }
  return overlap;
};

// find drawPosition for each word
const findDrawPosition = (wordsList) => {
  let step;
  const wl = wordsList;
  let wordToPlace;
  const placedWordArray = [];
  placedWordArray.push(wl.shift());
  while (wl.length !== 0) {
    step = 1;
    // take one word if there is
    wordToPlace = wl.shift();

    // if wordToPlace overlap at least one word in placedWordArray
    while (wordOverlapeAllPlaced(wordToPlace, placedWordArray)) {
      step += 1;
      wordToPlace.drawPosition = moveSteps(wordToPlace.drawPosition[0],
        wordToPlace.drawPosition[1], step);
    }
    // update placedWordArray
    placedWordArray.push(wordToPlace);
  }
  return placedWordArray;
};

const roateText = (canvasRotateText, posX, posY, degree, fontSize, text) => {
  const pFCanvas = canvasRotateText;
  pFCanvas.save();
  pFCanvas.textBaseline = 'top';
  pFCanvas.font = `${~~fontSize}px sans-serif`;// eslint-disable-line no-bitwise
  pFCanvas.fillStyle = randomRgba();
  // test 'interesting' fontSize 55
  pFCanvas.translate(posX, posY);
  pFCanvas.rotate(degree * Math.PI / 180);
  pFCanvas.fillText(text, 0, 0);
  pFCanvas.restore();
};

const drawInputwords = (pFCanvas, wordsList) => {
  for (let i = 0; i < wordsList.length; i += 1) {
    if (wordsList[i].rotate === true) {
      roateText(pFCanvas, wordsList[i].drawPosition[0], wordsList[i].drawPosition[1],
        90, wordsList[i].drawFont, wordsList[i].word);
    } else {
      roateText(pFCanvas, wordsList[i].drawPosition[0], wordsList[i].drawPosition[1],
        0, wordsList[i].drawFont, wordsList[i].word);
    }
  }
};

const playingFieldCanvas = document.getElementById('playingFieldCanvas');
const pFCanvas = playingFieldCanvas.getContext('2d');

const generateWordCloud = () =>{
pFCanvas.clearRect(0, 0, playingFieldCanvas.width, playingFieldCanvas.height);
const text = document.getElementById('textarea').value;
let doc = nlp(text);
let str = doc.match('#Verb').out('frequency');
inputWordList = str;
const newWordList = wordFontSize(inputWordList);
const wordsListForDraw = newWordList.map(word => (
  {
    word: word.normal,
    bvhTree: initializeBvhTree(word.normal, word.fontSize),
    rotatebvhTree: initializeBvhTree(word.normal, word.fontSize, 90),
    rotate: false,
    // initize drawPosition wihin square 100x100 Math.floor(Math.random() * (max - min)) + min;
    drawPosition: [Math.floor(Math.random() * 100) + 250, Math.floor(Math.random() * 100) + 250],
    drawFont: word.fontSize,
  //  wordWidthHeight: getWordPixel(word.normal, word.fontSize).textWidthHeight,
  }
));
const words = findDrawPosition(wordsListForDraw);
drawInputwords(pFCanvas, words);
};
