var   menuToggle = document.getElementById('menu-toggle'),
      innerToggle = document.getElementById('toggle-inner'),
      mainNav = document.getElementById('nav'),
      innerNav = document.getElementById('inner-nav');

function toggle(el) {
  el.previousElementSibling.classList.toggle('toggled');
  // el.slideToggle();
  el.classList.toggle('open');
  window.onresize = function(){ checkWindow();};
};

function checkWindow(){
  if (window.innerWidth >= 769) {
    mainNav.classList.remove('open');
    innerNav.classList.remove('open');
    menuToggle.classList.remove('toggled');
    innerToggle.classList.remove('toggled');
  }
}
innerToggle.onclick = function(){toggle(innerNav);};
menuToggle.onclick = function(){toggle(mainNav);};