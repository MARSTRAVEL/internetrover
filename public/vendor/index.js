
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

window.addEventListener('scroll', function(e) {
  scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
  if(scrollTop > 60){
    navOverlay.style.display == 'block'? null:navOverlay.style.display = 'block';
  }else{
    navOverlay.style.display == 'block'? navOverlay.style.display = 'none':null;
  }
});