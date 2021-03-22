/**********
 * DATA *
 **********/

let sixes = [];
let doubleSixes = [];
let twelves = [];
let twenties = [];

/********************
 * HELPER FUNCTIONS *
********************/

const getRandomNumber = function(max) {
    const rand = Math.random();
    const range = rand * max;
    const result = Math.ceil(range);
    
    return result;
}

const sortByNumber = function(arr) {
  const byNumber = function(item1, item2) {
    return item1 - item2;
  }

  return arr.slice().sort(byNumber);
}

reset();
/*******************
 * YOUR CODE BELOW *
 *******************/



/*******************
 * EVENT LISTENERS *
 *******************/
const d6 = document.querySelector("#d6-roll");
d6.addEventListener('click', () => d6Roller());

const doubleD6 = document.querySelector('#double-d6-buttons');
doubleD6.addEventListener('click', () => doubleD6Roller());

const d12 = document.querySelector("#d12-roll");
d12.addEventListener('click', () => d12Roller());

const d20 = document.querySelector("#d20-roll");
d20.addEventListener('click', () => d20Roller());

const resetButton = document.querySelector("#reset-button");
resetButton.addEventListener('click', () => reset());
/******************
 * RESET FUNCTION *
 ******************/
function reset(){
  sixes, doubleSixes, twelves, twenties = [];

  document.querySelector("#d6-roll").src = "images/start/d6.png";
  document.querySelector("#double-d6-roll-1").src = "images/start/d6.png";
  document.querySelector("#double-d6-roll-2").src = "images/start/d6.png";
  document.querySelector("#d12-roll").src = "images/start/d12.jpeg";
  document.querySelector("#d20-roll").src = "images/start/d20.jpg";

  const prefix = ['d6-', 'double-d6-', 'd12-', 'd20-'];
  for (let i = 0; i < prefix.length; i++){
    document.querySelector(`#${prefix[i]}rolls-mean`).innerHTML = "NA";
    document.querySelector(`#${prefix[i]}rolls-median`).innerHTML = "NA";
    document.querySelector(`#${prefix[i]}rolls-mode`).innerHTML = "NA";
  }
}
/****************************
 * CLICK HANDLING FUNCTIONS *
****************************/
function d6Roller(){
  let roll = getRandomNumber(6);
  randRoll(6, "d6", roll);
  document.querySelector("#d6-roll").src = `images/d6/${roll}.png`;
  sixes.push(roll);
  doTheNumbers(sixes, 'd6')
}

function doubleD6Roller(){
  let roll1 = getRandomNumber(6);
  let roll2 = getRandomNumber(6);
  randDouble(roll1, roll2);
  document.querySelector("#double-d6-roll-1").src = `images/d6/${roll1}.png`;
  document.querySelector("#double-d6-roll-2").src = `images/d6/${roll2}.png`;
  doubleSixes.push(roll1 + roll2);
  doTheNumbers(doubleSixes, 'double-d6')
}

function d12Roller(){
  let roll = getRandomNumber(12)
  randRoll(12, "d12", roll);
  document.querySelector("#d12-roll").src = `images/numbers/${roll}.png`;
  twelves.push(roll);
  doTheNumbers(twelves, 'd12')
}

function d20Roller(){
  let roll = getRandomNumber(20);
  randRoll(20, "d20", roll);
  document.querySelector("#d20-roll").src = `images/numbers/${roll}.png`;
  twenties.push(roll);
  doTheNumbers(twenties, 'd20')
}

function randRoll(max, prefix, roll){
  const file = max > 6 ? 'numbers' : 'd6';
  let counter = 0;
  let num = setInterval(() => {
      document.querySelector(`#${prefix}-roll`).src = `images/${file}/${getRandomNumber(max)}.png`;
      counter++;
      if (counter >= 10){
        clearInterval(num);
        document.querySelector(`#${prefix}-roll`).src = `images/${file}/${roll}.png`;
      }
    }, 50)
}

function randDouble(roll1, roll2){
  let counter = 0;
  let num = setInterval(() => {
      document.querySelector("#double-d6-roll-1").src = `images/d6/${getRandomNumber(6)}.png`;
      document.querySelector("#double-d6-roll-2").src = `images/d6/${getRandomNumber(6)}.png`;
      counter++;
      if (counter >= 10){
        clearInterval(num);
        document.querySelector("#double-d6-roll-1").src = `images/d6/${roll1}.png`;
        document.querySelector("#double-d6-roll-2").src = `images/d6/${roll2}.png`;
      }
    }, 50)
}
/****************
 * MATH SECTION *
 ****************/
function doTheNumbers(arr, elementPrefix){
  const mean = ((arr.reduce((a, b) => a + b))) / arr.length;
  document.querySelector(`#${elementPrefix}-rolls-mean`).innerHTML = mean.toFixed(2);
  let median;  
  arr = sortByNumber(arr);
  if (arr.length % 2 === 0){
      i = arr.length / 2;
      median = (arr[i] + arr[i-1]) / 2;
    }else{
      median = arr[Math.floor(arr.length / 2)];
    }
  document.querySelector(`#${elementPrefix}-rolls-median`).innerHTML = median;
  let freq = 0;
  let modeArray = [];
  for (let i = 0; i < arr.length; i++){
    let quan = 1;
    while(arr[i] === arr[i+1]){
      quan++;
      i++;
      console.log(quan)
    }
    if (quan > freq){
      modeArray = [arr[i]];
      freq = quan;
    }else if(quan === freq){
      modeArray.push(arr[i]);
    }
  }
  let modeStr = "";
  console.log(modeArray)
  if (modeArray.length === 1){
    modeStr += modeArray[0];
  }else{
    for (let i = 0; i < modeArray.length - 1; i++){
      modeStr += `${modeArray[i]}, `; 
    }
    modeStr += `and ${modeArray[modeArray.length-1]}`;
  }
  document.querySelector(`#${elementPrefix}-rolls-mode`).innerHTML = modeStr;
}