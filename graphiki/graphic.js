// Install libs with: npm i chartjs-node-canvas chart.js
// Docs https://www.npmjs.com/package/chartjs-node-canvas
// Config documentation https://www.chartjs.org/docs/latest/axes/
const fs = require('fs');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');

const width = 900; //px
const height = 900; //px
const backgroundColour = 'white'; // Uses https://www.w3schools.com/tags/canvas_fillstyle.asp
const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height, backgroundColour });

// const configuration = {
//     type: 'line',
//     data: {
//       labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//       datasets: [{
//         label: 'Dataset 1',
//         data: [0, 10, 5, 2, 20, 30, 45],
//         backgroundColor: 'rgba(255, 99, 132, 0.2)',
//         borderColor: 'rgba(255, 99, 132, 1)',
//         borderWidth: 1
//       }, {
//         label: 'Dataset 2',
//         data: [30, 50, 25, 12, 40, 55, 75],
//         backgroundColor: 'rgba(54, 162, 235, 0.2)',
//         borderColor: 'rgba(54, 162, 235, 1)',
//         borderWidth: 1
//       }]
//     },
//     options: {
//       responsive: false,
//       plugins: {
//         title: {
//           display: true,
//           text: 'Chart Title'
//         },
//         legend: {
//           display: true,
//           position: 'bottom'
//         }
//       },
//       scales: {
//         x: {
//           display: true,
//           title: {
//             display: true,
//             text: 'X Axis Title'
//           }
//         },
//         y: {
//           display: true,
//           title: {
//             display: true,
//             text: 'Y Axis Title'
//           },
//           suggestedMin: 0,
//           suggestedMax: 100
//         }
//       }
//     }
//   };

async function run(configuration) {
    const dataUrl = await chartJSNodeCanvas.renderToDataURL(configuration);
    const base64Image = dataUrl

    var base64Data = base64Image.replace(/^data:image\/png;base64,/, "");


    fs.writeFile("out.png", base64Data, 'base64', function (err) {
        if (err) {
            console.log(err);
        }
    });
    return dataUrl
}
module.exports = {run}