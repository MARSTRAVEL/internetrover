/* eslint-env jquery */
/*
POINTS_SERVER = 'https://cs.uef.fi/o-mopsi/controller/OMopsiGameController.php
- desc (the game name - make a dropdown list to select a game by name)
- gameId (you will need it in second step)
- latitude and longitude are the coordinates. Use those to decide where your overlay will be placed.
You can also ignore these and do another variant (explained in second step below)
- you can also use the thumbnail to display on map, but it is optional, I think.
 */
/* global google */

const MinBoxSize = 3; // minimun box size
const fontFamily = 'sans-serif'; // font style
const canvasWidth = 700;
const canvasHeight = 700;
const wordWidthOfBvh = 350;
const wordHeightOfBvh = 300;
const maxFontSize = 55;
const minFontSize = 10;
const inputWordList = ['Helisnki','Espoo', 'Vantaa','Joensuu','Kuopio','sushi','bread','coffee','hi','in',
'korea','china','finland','iceland','USA','UK','Turkey','sweden','norway','ice','water','nothing',
'love','to','eat','at','some','place','Restaurtant','shop','tori','kala','satama',
'artichoke','eggplant','asparagus','legumes','alfalfa','sprouts','azuki','beans','sprouts','peas',
'borlotti','broad','chickpeas', 'garbanzos','kidney','lentils','lima','mung','navy','pinto','runner',
'split','soy','mangetout','snap','broccoflower','hybrid','broccoli','brussels','sprouts',
'cabbage','kohlrabi','Savoy','Red','Pointed','Sweetheart','cauliflower',
'celery','endive','fiddleheads','frisee','fennel','greens','beet','bok',' choy',
'chard','collard','kale','mustard','spinach','herbs','spices','anise','basil',
'caraway','coriander','chamomile','dill','lavender','lemon','Grass',
'marjoram','oregano','parsley','rosemary','sage','thyme','lettuce','arugula',
'mushrooms','fungus', 'nettles','okra','onions','Chives','Garlic','Leek','shallot',
'scallion','pepper','chili','Jalapeño','Habanero','Paprika','Tabasco','Cayenne','radicchio',
'rhubarb','root','beetroot','mangel','wurzel','carrot','celeriac','corms',
'eddoe','konjac','taro','chestnut','ginger','parsnip','rutabaga','radish','wasabi',
'horseradish','daikon','tubers','jicama','jerusalem','potato','sunchokes','yam',
'turnip','salsify','skirret','sweetcorn','topinambur','squashes','acorn','bitter','melon',
'butternut','banana','courgette','Zucchini','cucumber','delicata','gem',
'marrow','spaghetti','tat','soi','tomato','watercress'];

// create canvas for getting pixcel of each word, doesnt show this canvas
const canvasGetPixcel = document.createElement('canvas');
canvasGetPixcel.width = wordWidthOfBvh;
canvasGetPixcel.height = wordHeightOfBvh;
canvasGetPixcel.style.border = '1px solid red';
const c = canvasGetPixcel.getContext('2d');
document.body.appendChild(canvasGetPixcel);

const can = document.getElementById("canvas");
const context = can.getContext("2d");

const drawcanavs1 = document.getElementById("drawingcanvas1");
const equalDrawing = drawcanavs1.getContext("2d");

const drawcanavs2 = document.getElementById("drawingcanvas2");
const linearDrawing = drawcanavs2.getContext("2d");

const drawcanavs3 = document.getElementById("drawingcanvas3");
const expDrawing = drawcanavs3.getContext("2d");

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
  const imageData = c.getImageData(1, 1, wordWidthOfBvh, wordHeightOfBvh);
  const pixels = imageData.data;
  const pixelArray = [];
  // if r+g+b+a != 0 something inside
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

const wordf = (weight,maxf,minf,maxw)=>{
    return (maxf-minf)/maxw * weight + minf;
    //return fontSize = Math.round(Math.log10(weight) / Math.log10(maxw)* (maxf-minf) + minf);
};

// x=vt∗cos(wt)
// y=vt∗cos(wt)
const moveSteps = (a, b, step)=> {
  const angle = 0.25 * step;
  const x = (2 + 2 * angle) * Math.cos(angle) + a;
  const y = (2 + 2 * angle) * Math.sin(angle) + b;
  return [Math.round(x), Math.round(y)];
}

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

const boxInsideBox=(subTreeA, subTreeB, positionA, positionB)=>{
  const [ax, ay] = positionA;
  const [bx, by] = positionB;
  return subTreeA.topLeftX + ax >= subTreeB.topLeftX + bx
  && subTreeA.topLeftY + ay >= subTreeB.topLeftY + by
  && subTreeA.bottomRightX + ax <= subTreeB.bottomRightX + bx
  && subTreeA.bottomRightY + ay <= subTreeB.bottomRightY + by;
};

const collectBvhTreeLeaves = (tree)=> {
  const parentNode = [];
  const leavesArray = [];
  parentNode.push(tree);
  while (parentNode.length !== 0) {
    // pop() select last element of array
    const parent = parentNode.pop();
    if (parent.children.length === 0) {
      leavesArray.push(parent);
    } else {
      for (let i = 0; i < parent.children.length; i += 1) { parentNode.push(parent.children[i]); }
    }
  }
  return leavesArray;
}

const wordInsideShape=(treeA, treeB, positionA, positionB)=>{
  //const overlap = treesOverlaped(shapeBvh, word.bvhTree, [0,0], word.drawPosition);
  //return overlap;
  let insideShape= true;
  const wordLeaves = collectBvhTreeLeaves(treeA);
  const shapeLeaves = collectBvhTreeLeaves(treeB);
  for (let i = 0; i < wordLeaves.length; i++) {
    if (!insideShape) {
      break;
    }
    insideShape=false;
    for (let j = 0; j < shapeLeaves.length; j++) {
      if (boxInsideBox(wordLeaves[i],shapeLeaves[j],positionA,positionB)) {
        insideShape=true;
        break;
      }
    }
  }
  return insideShape;
};

const catPixelArray=(ctx)=>{
  const img=new Image();
  //img.src = "pictures/dove.png";
  img.onload = function () {
  ctx.drawImage(img, 0,0);
  };
};
catPixelArray(context);
const catBvhTree = (array) => {
  const initialBoundingBox = {
    x0: 0, y0: 0, x1: 650, y1: 433,
  };
  return buildBvhTree(
    { wordPixelArray: array, ...initialBoundingBox },
    initialBoundingBox,
  );
};
function drawBvhTree2(leavesArray) {
  const ca = document.getElementById('drawingcanvas1');
  const ctx = ca.getContext('2d');
  for (let i = 0; i < leavesArray.length; i += 1) {
    ctx.beginPath();
    ctx.strokeStyle = 'purple';
    ctx.rect(leavesArray[i].topLeftX, leavesArray[i].topLeftY,Math.abs(leavesArray[i].bottomRightX - leavesArray[i].topLeftX),
      Math.abs(leavesArray[i].bottomRightY - leavesArray[i].topLeftY));
    ctx.stroke();
  }
}
document.getElementById('button').addEventListener("click", function(e){
  const imData = context.getImageData(0, 0, 650, 433);
  const pixels = imData.data;
  const heartPixelArray = [];
  // if r+g+b+a != 0 something inside
  for (let i = 0; i < 300 * 300; i += 1) {
console.log('('+pixels[i * 4 + 0]+','+pixels[i * 4 + 1]+','+pixels[i * 4 + 2]+','+pixels[i * 4 + 3]);
  }
//const catBvh =catBvhTree(heartPixelArray);
//const lea = collectBvhTreeLeaves(catBvh);
//drawBvhTree2(lea);
});
