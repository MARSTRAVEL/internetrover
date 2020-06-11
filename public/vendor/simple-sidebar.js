
const openNav=()=> {
    const sideNav = document.getElementById("mySidenav");
   document.querySelectorAll('.navItem').forEach(ele=>ele.style.display='block');
    sideNav.style.width = "100%";
    sideNav.style.opacity = "1";
    sideNav.style.zIndex = "12";
  }
  const closeNav=()=> {
    const sideNav = document.getElementById("mySidenav");
    document.querySelectorAll('.navItem').forEach(ele=>ele.style.display='none');
    sideNav.style.width = "0";
    sideNav.style.opacity = "0";
    sideNav.style.zIndex = "10";
  }