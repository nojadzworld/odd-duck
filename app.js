'use strict';

// ******* GLOBALS ********

let productArray = [];
let votingRounds = 25;

//  ******* DOM WINDOWS ********

let imgContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');
document.querySelector('h3').style.visibility = 'hidden';
let resultsBtn = document.getElementById('show-results-btn');
// let resultsList = document.getElementById('results-container');

// ******* CANVAS ELEMENT FOR CHART *****
let ctx = document.getElementById('my-chart');

// ******* CONSTRUCTOR FUNCTION ********
function Duck(name, fileExtension = 'jpg'){
  this.name = name;
  this.image = `img/${name}.${fileExtension}`;
  this.votes= 0;
  this.views= 0;
}

// ****** HELPER FUNCTIONS / UTILITIES ******


let indexArray = [];
function renderImg(){

  while(indexArray.length < 6){
    let ranNum = randomIndex();
    if(!indexArray.includes(ranNum)){
      console.log(ranNum);
      indexArray.push(ranNum);

    }
    //   if(indexArray.includes(ranNum) || previousArray.includes(ranNum)){
    //     console.log();
    //   }
    //   else{ indexArray.push(ranNum);

    //   }
  }

  console.log(indexArray);
  // let imgOneIndex = randomIndex();
  // let imgTwoIndex = randomIndex();
  // let imgThreeIndex = randomIndex();

  // while(imgOneIndex === imgTwoIndex || imgOneIndex === imgThreeIndex || imgTwoIndex === imgThreeIndex){
  //   imgTwoIndex = randomIndex();
  //   imgThreeIndex = randomIndex();
  // }

  let imgOneIndex = indexArray.shift();
  let imgTwoIndex = indexArray.shift();
  let imgThreeIndex = indexArray.shift();


  imgOne.src = productArray[imgOneIndex].image;
  imgOne.title = productArray[imgOneIndex].name;
  imgOne.alt = `this is an image of ${productArray[imgOneIndex].name}`;
  imgTwo.src = productArray[imgTwoIndex].image;
  imgTwo.title = productArray[imgTwoIndex].name;
  imgTwo.alt = `this is an image of ${productArray[imgTwoIndex].name}`;
  imgThree.src = productArray[imgThreeIndex].image;
  imgThree.title = productArray[imgThreeIndex].name;
  imgThree.alt = `this is an image of ${productArray[imgThreeIndex].name}`;

  // increase the views on the images
  productArray[imgOneIndex].views++;
  productArray[imgTwoIndex].views++;
  productArray[imgThreeIndex].views++;
}
function randomIndex(){
  return Math.floor(Math.random() * productArray.length);
}

// ****** HELPER FUNCTION TO RENDER CHART *****
function renderChart(){

  let prodNames = [];
  let prodVotes = [];
  let prodViews = [];

  for (let i = 0; i < productArray.length; i++) {
    prodNames.push(productArray[i].name);
    prodVotes.push(productArray[i].votes);
    prodViews.push(productArray[i].views);
  }

  let chartObj = {
    type: 'bar',
    data: {
      labels: prodNames,
      datasets: [{
        label: '# Of Votes',
        data: prodVotes,
        borderWidth: 5,
        backgroundColor: ['red'],
        borderColor: ['white']
      },
      {
        label: '# of Views',
        data: prodViews,
        borderWidth: 5,
        backgroundColor: ['blue'],
        borderColor: ['white']
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: false
        }
      }
    }
  };

  new Chart(ctx, chartObj); //eslint-disable-line
}


// ****** EVENT HANDLERS *******
function handleImgClick(event){
  // TODO: Identify the image that was clicked
  let imgClicked = event.target.title;
  console.dir(imgClicked);

  // TODO: Increase the number of clicks on that image
  for(let i = 0; i < productArray.length; i++){
    if(imgClicked === productArray[i].name){
      productArray[i].votes++;
    }
  }

  votingRounds--;

  renderImg();

  if(votingRounds === 0){
    imgContainer.removeEventListener('click', handleImgClick);
    document.querySelector('h3').style.visibility = 'visible';

    // ***** LOCAL STORAGE STARTS HERE *****
    // ! STEP 1 - CONVERT OUR DATA TO A STRING TO STORE IN LOCAL STORAGE
    let stringifiedProds = JSON.stringify(productArray);

    // console.log('Stringifed Goats >>> ', stringifiedProds);

    // ! STEP 2 - SET STRINGIFIED GOATS INTO LOCAL STORAGE
    localStorage.setItem('myProds', stringifiedProds);
  }
}

function handleShowResults() {
  if (votingRounds === 0) {

    renderChart();

    resultsBtn.removeEventListener('click', handleShowResults);
  }
}
let retreivedProds = localStorage.getItem('myProds');

console.log('Prods from LS >>>', retreivedProds);

// ! STEP 4  - CONVERT BACK TO USEABLE CODE
let parsedProds = JSON.parse(retreivedProds);

console.log('Parsed Goats >>>>', parsedProds);


if(retreivedProds){
  for(let i = 0; i < parsedProds.length; i++){
    if(parsedProds[i].name === 'sweep'){
      let reconstructedSweepProd = new Duck(parsedProds[i].name, 'png');
      reconstructedSweepProd.views = parsedProds[i].views;
      reconstructedSweepProd.votes = parsedProds[i].votes;
      productArray.push(reconstructedSweepProd);
    } else {
      let reconstructedProd = new Duck(parsedProds[i].name);
      reconstructedProd.views = parsedProds[i].views;
      reconstructedProd.votes = parsedProds[i].votes;
      productArray.push(reconstructedProd);
    }
  }


}else{
  // ***** EXECTUABLE CODE ******
  let bagProd = new Duck('bag');
  let bananaProd = new Duck('banana');
  let bathroomProd = new Duck('bathroom');
  let bootsProd = new Duck('boots');
  let bubblegumProd = new Duck('bubblegum');
  let chairProd = new Duck('chair');
  let cthulhuProd = new Duck('cthulhu');
  let dogDuckProd = new Duck('dog-duck');
  let dragonProd = new Duck('dragon');
  let penProd = new Duck('pen');
  let petsweepProd = new Duck('pet-sweep');
  let scissorsProd = new Duck('scissors');
  let sharkProd = new Duck('shark');
  let sweepProd = new Duck('sweep', 'png');
  let tauntaunProd = new Duck('tauntaun');
  let unicornProd = new Duck('unicorn');
  let watercanProd = new Duck('water-can');
  let wineglassProd = new Duck('wine-glass');

  productArray.push(bagProd,bananaProd,bathroomProd,bootsProd,bubblegumProd,chairProd,cthulhuProd,dogDuckProd,dragonProd,penProd,petsweepProd,scissorsProd,sharkProd,sweepProd,tauntaunProd,unicornProd,watercanProd,wineglassProd);
}
console.log(productArray);
renderImg();

imgContainer.addEventListener('click', handleImgClick);
resultsBtn.addEventListener('click', handleShowResults);
