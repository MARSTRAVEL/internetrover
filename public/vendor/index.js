
let scrollTop;

const navOverlay = document.querySelector('.navOverlay');

// get viewpoint height
// const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

const card = document.querySelectorAll('.copeItem');

const hideAllCards=()=>{
  card.forEach(element=>element.style.display='none');
}
const showAllCards=()=>{
  card.forEach(element=>element.style.display='block');
};

const close = document.querySelectorAll('.copeItem')

card.forEach(element=(ele)=>{

  ele.querySelector('.cardWrapper').addEventListener("click",(env)=>{

    hideAllCards();
    env.currentTarget.parentNode.style.display = 'flex';
    env.currentTarget.parentNode.classList.add('showSingleCard');
    env.currentTarget.previousElementSibling.style.opacity = '1';
    env.currentTarget.lastElementChild.style.display = 'block';
    env.currentTarget.querySelector('.btnTl').style.display = 'none';
  });

  ele.querySelector('.close').addEventListener("click",(env)=>{
    showAllCards();
    env.currentTarget.parentNode.classList.remove('showSingleCard');
    env.currentTarget.style.opacity = '0';
    ele.querySelector('.showMore').style.display = 'none';
    ele.querySelector('.btnTl').style.display = 'block';
  });

  }
);

const isInViewport=(element)=> {
	var position = element.getBoundingClientRect();

	// checking whether fully visible
	if(position.top >= 0 && position.bottom <= window.innerHeight) {
		return true;
	}
	// checking for partial visibility
	if(position.top < window.innerHeight && position.bottom >= 0) {
		return true;
	}
	return false;
}

const selfCare = document.getElementById('slefCareCard');
const convidLive = document.getElementById('live_convid_section');

window.addEventListener('scroll', function(e) {
  scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
  if(scrollTop > 60){
    navOverlay.style.display == 'block'? null:navOverlay.style.display = 'block';
  }else{
    navOverlay.style.display == 'block'? navOverlay.style.display = 'none':null;
  }

  if(isInViewport(convidLive)){
    if(!convidLive.classList.contains('inited_convid')){
      convidLive.classList.add('inited_convid');
      console.log('inited!');
      liveConvid();
    }
  }
});


// live convid-19
const convidTotal=(convidWroldObj)=>{
  const obj = convidWroldObj;
  const htmlContent = `
  <div class="convid_confirm convid_card">
  <div class="NewConfirmed_world convid_card2">
    <p>NewConfirmed:</p>
    <span>${convidWroldObj.NewConfirmed}</span>
  </div>
  <div class="TotalConfirmed_world convid_card2">
    <p>TotalConfirmed:</p>
    <span>${convidWroldObj.TotalConfirmed}</span>
  </div>
</div>
<div class="convid_death convid_card">
  <div class="NewDeaths_world convid_card2">
    <p>NewDeaths:</p>
    <span>${convidWroldObj.NewDeaths}</span>
  </div>
  <div class="TotalDeaths_world convid_card2">
    <p>TotalDeaths:</p>
    <span>${convidWroldObj.TotalDeaths}</span>
  </div>
</div>
<div class="convid_recover convid_card">
  <div class="NewRecovered_world convid_card2">
    <p>NewRecovered:</p>
    <span>${convidWroldObj.NewRecovered}</span>
  </div>
  <div class="TotalRecovered_world convid_card2">
    <p>TotalRecovered:</p>
    <span>${convidWroldObj.TotalRecovered}</span>
  </div>
</div>
  `;
  document.getElementById('total_convid').innerHTML = htmlContent;
};

async function liveConvid() {

  // read our JSON
  let response = await fetch('https://api.covid19api.com/summary');
  let allData = await response.json();
  let tabledata = allData.Countries;
  const worldData = allData.Global;
  convidTotal(worldData);

    //create Tabulator on DOM element with id "example-table"
  var table = new Tabulator("#example-table", {
      data:tabledata, //assign data to table
      responsiveLayout:"hide",
      layout:"fitColumns", //fit columns to width of table (optional)
      columns:[ //Define Table Columns
          {title:"Country", field:"Country", width:150},
          {title:"NewConfirmed", field:"NewConfirmed"},
          {title:"TotalConfirmed", field:"TotalConfirmed"},
          {title:"NewDeaths", field:"NewDeaths", sorter:"date", hozAlign:"center"},
          {title:"TotalDeaths", field:"TotalDeaths"},
          {title:"NewRecovered", field:"NewRecovered"},
          {title:"TotalRecovered", field:"TotalRecovered"},
      ],
      rowClick:function(e, row){ //trigger an alert message when the row is clicked
          alert("Row " + row.getData().id + " Clicked!!!!");
      },
  });
}
