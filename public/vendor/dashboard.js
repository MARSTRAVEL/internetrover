// weather
const weather = (url) => {
    // Create the XHR request
    const request = new XMLHttpRequest();
    // Return a new promise.
    return new Promise((resolve, reject) => {
      request.open('POST', url, true);
      request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      request.onload = () => {
        // This is called even on 404 etc
        // so check the status
        if (request.status === 200 && request.readyState === 4) {
          // Resolve the promise with the response text
          resolve(request.response);
        } else {
          // Otherwise reject with the status text
          // which will hopefully be a meaningful error
          reject(Error(request.statusText));
        }
      };
      // Handle network errors
      request.onerror = () => {
        reject(Error('Network Error'));
      };
      // Make the request
      request.send();
    });
  };
$('#current_weather').click(function(){
    const openWeatherAPIKey = 'be4f63ffaad56d681f19dba18437e57e';
    const city = document.getElementById('search_city').value;
    let searchLink = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid="+openWeatherAPIKey;
    let city_name = document.getElementById('cityName');
    let city_tempature = document.getElementById('tempature');
    let city_humidity = document.getElementById('humidity');
    let city_icon = document.getElementById('icon');
    let city_pressure = document.getElementById('pressure');
    let city_wind = document.getElementById('wind');
    weather(searchLink)
    .then((response)=>{
      const result = JSON.parse(response);
      const cityName = result.name;
      const tempature = parseInt(result.main.temp - 273) + "°";
      const humidity = result.main.humidity + "%";
      const pressure = result.main.pressure + 'hPa';
      const wind = result.wind.speed + 'meter/sec';
      const icon = "http://openweathermap.org/img/w/" + result.weather[0].icon + ".png";
      city_name.innerHTML = cityName;
      city_tempature.innerHTML = '<p>'+'tempature:'+'</p>'+ tempature;
      city_humidity.innerHTML = '<p>'+'humidity:'+'</p>'+ humidity;
      city_pressure.innerHTML = '<p>'+'pressure:'+'</p>'+ pressure;
      city_wind.innerHTML = '<p>'+'wind:'+'</p>'+ wind;
      city_icon.src = icon;
      })
      .catch((error) => {
        city_name.innerHTML = '';
        city_tempature.innerHTML = '';
        city_humidity.innerHTML = '';
        city_icon.src = '';
        alert('Please Type correct city, for Example: beijing');
    });
});


// stock
const url_interval = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=60min&outputsize=full&apikey=O8A62I5REWNAM36I'
const url_daily = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&outputsize=full&apikey=O8A62I5REWNAM36I';
const url_weekly ='https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=MSFT&apikey=O8A62I5REWNAM36I';
const url_monthly = 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=MSFT&apikey=O8A62I5REWNAM36I';

const str_interval = 'Time Series (60min)';
const str_daily = 'Time Series (Daily)';
const str_weekly = 'Weekly Time Series';
const str_monthly = 'Monthly Time Series';
let data_lable=[];
let data_close = [];
let lable_counter= 0;
let data_counter = 0;

const config = {
  type: 'line',
  data: {
    labels: data_lable,
     datasets: [{
      label: "MSFT",
      fill:false,
      lineTension: 0,
      borderColor: "#0000FF",
      strokeColor: "rgba(220,220,220,1)",
      pointColor: "rgba(220,220,220,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(220,220,220,0.5)",
      data: data_close
    }
  ]},
  options: {
    responsive: true,
    fullWidth:true,
    maintainAspectRatio: false,
    title: {
    display: true,
    text: 'Please select Time Series',
  }
  }
};
const linechartCanvas = document.getElementById("linechart_canvas").getContext("2d");
const lineChart = new Chart(linechartCanvas, config);
const stock = async(url, str, title_text) =>{
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
      lineChart.config.options.title.text = title_text;
      lineChart.update();

  } catch (e) {
    alert('Error, pleaee try again!');
    text = 'Please select Time Series';
    data.datasets.data = [];
    data.labels = [];
    lineChart.update();
  }
};

document.getElementById("interval").addEventListener("click", function(){
  stock(url_interval, str_interval, str_interval);
});

document.getElementById("daily").addEventListener("click", function(){
  stock(url_daily, str_daily, str_daily);
});

document.getElementById("weekly").addEventListener("click", function(){
  stock(url_weekly, str_weekly, str_weekly);
});

document.getElementById("monthly").addEventListener("click", function(){
  stock(url_monthly, str_monthly, str_monthly);
});

// toDoList

// Create a new list item when clicking on the "Add" button
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("todo").appendChild(li);
  }
  document.getElementById("myInput").value = "";
}

$( function() {
    $( "#todo, #doing" ).sortable({
      connectWith: ".connectedSortable"
    }).disableSelection();
  } );

$( function() {
  $( "#todo, #done" ).sortable({
    connectWith: ".connectedSortable"
  }).disableSelection();
} );

$( function() {
  $( "#done, #doing" ).sortable({
    connectWith: ".connectedSortable"
  }).disableSelection();
} );
