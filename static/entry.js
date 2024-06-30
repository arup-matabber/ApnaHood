const signUpbtn = document.getElementById('signup');
const signInbtn = document.getElementById('signin');
const container = document.getElementById('container');

signUpbtn.addEventListener('click',()=>{
  container.classList.add('right-panel-active')
});

signInbtn.addEventListener('click',()=>{
  container.classList.remove('right-panel-active')
});
