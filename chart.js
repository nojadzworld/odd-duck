'use strict';

let retreivedProds = localStorage.getItem('myProds');

let parsedProds = JSON.parse(retreivedProds);

let canvasElem = document.getElementById('my-chart');

function renderChart() {

  let prodNames = [];
  let prodVotes = [];
  let prodViews = [];

  for (let i = 0; i < parsedProds.length; i++) {
    prodNames.push(parsedProds[i].name);
    prodVotes.push(parsedProds[i].votes);
    prodViews.push(parsedProds[i].views);
  }

  Chart.defaults.font.size = 20; //eslint-disable-line
  Chart.defaults.font.weight = 'bold'; //eslint-disable-line

  let chartObj = {
    type: 'bar',
    data: {
      labels: prodNames, 
      datasets: [{
        label: '# Of Votes',
        data: prodVotes,
        borderWidth: 5,
        backgroundColor: ['red'],
        borderColor: ['red']
      },
      {
        label: '# of Views',
        data: prodViews,
        borderWidth: 5,
        backgroundColor: ['blue'],
        borderColor: ['blue']
      }]
    },
    options: {
      indexAxis: 'y',
      scales: {
        y: {
          beginAtZero: true,
          ticks: { color: 'black' }
        },
        x: {
          ticks: { color: 'black' }
        }
      },
      plugins: {
        legend: {
          labels: {
            color: 'red',
            padding: 30,
            font: {
              size: 12
            }
          },
        }
      }
    }
  };

   new Chart(canvasElem, chartObj); //eslint-disable-line
}

if(retreivedProds){
  renderChart();
}
