function changeCss () {
    // var bodyElement = document.querySelector("body");
    var navElement = document.querySelector("nav");
    this.scrollY > 100 ? navElement.style.backgroundColor = '#efefef' : navElement.style.backgroundColor = 'transparent';
  }
  
window.addEventListener("scroll", changeCss , false);


function openlogin(){
    let loginForm = document.querySelector('.login-form');
    loginForm.classList.toggle('active');
}



function opensearch(){
    document.getElementById('searchslider').style.marginLeft='0';
}
function closesearch(){
    document.getElementById('searchslider').style.marginLeft='100%';
}