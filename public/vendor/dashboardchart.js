const url_interval = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=60min&outputsize=full&apikey=O8A62I5REWNAM36I'
const url_daily = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&outputsize=full&apikey=O8A62I5REWNAM36I';
const url_weekly ='https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=MSFT&apikey=O8A62I5REWNAM36I';
const url_monthly = 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=MSFT&apikey=O8A62I5REWNAM36I';

const str_interval = 'Time Series (60min)';
const str_daily = 'Time Series (Daily)';

let data_lable=[];
let data_close = [];
let lable_counter= 0;
let data_counter = 0;
let text = 'Please select Time Series';

const config = {
  type: 'line',
  data: {
    labels: data_lable,
     datasets: [{
      label: "MSFT",
      fill:false,
      lineTension: 0,
      strokeColor: "rgba(220,220,220,1)",
      pointColor: "rgba(220,220,220,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(220,220,220,1)",
      data: data_close
    }
  ]},
  options: {
    responsive: true,
    fullWidth:true,
    maintainAspectRatio: false,
    title: {
    display: true,
    text: text,
  }
  }
};
const linechartCanvas = document.getElementById("linechart_canvas").getContext("2d");
const lineChart = new Chart(linechartCanvas, config);

document.getElementById("daily").addEventListener("click", function(){
  text = 'daily';
  stock(url_daily, str_daily);
});
document.getElementById("interval").addEventListener("click", function(){
  text = 'interval';
  stock(url_interval, str_interval);
});

const stock = async(url, str) =>{
  try {
    let response = await fetch(url);
    let result = await response.json();
    for (const [key, value] of Object.entries(result[str])) {
      lable_counter += 1;
      data_counter += 1;
      if (lable_counter % 50 == 0) {
        data_lable.push(key);
        data_close.push(value['4. close'])
      }}
      let data = lineChart.config.data;
      data.datasets.data = data_close;
      data.labels = data_lable;
      lineChart.update();

  } catch (e) {
    alert('Error, pleaee try again!');
    text = 'Please select Time Series';
    data.datasets.data = [];
    data.labels = [];
    lineChart.update();
  }
};
