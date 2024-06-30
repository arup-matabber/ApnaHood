const signUpbtn = document.getElementById("signup");
const signInbtn = document.getElementById("signin");
const container = document.getElementById("containr");

signUpbtn.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInbtn.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("signinbutton");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

const signin=document.getElementById("submitin");

signin.addEventListener("submit", async function (e) {
  e.preventDefault();
  const formData = new FormData(signin);
  
  var data = {};
  formData.forEach(function(value, key){
      data[key] = value;
  });
  
  const response = await fetch(
    "https://a3cd395f-a873-4cc8-863d-5937166f1d15-00-1rs47bgtx64wq.pike.repl.co/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );
    const status=response.status
    
    
  const result = await response.json();
    if(status==200)
        location.replace("https://a3cd395f-a873-4cc8-863d-5937166f1d15-00-1rs47bgtx64wq.pike.replit.dev/search")
    else
        alert(result.error);
});

const signup=document.getElementById("submitup");

signup.addEventListener("submit", async function (e) {
  e.preventDefault();
  const formData = new FormData(signup);

  var data = {};
  formData.forEach(function(value, key){
      data[key] = value;
  });

  const response = await fetch(
    "https://a3cd395f-a873-4cc8-863d-5937166f1d15-00-1rs47bgtx64wq.pike.repl.co/register",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );
    const status=response.status
    const result = await response.json();
    
    if(status==200)
        location.replace("https://a3cd395f-a873-4cc8-863d-5937166f1d15-00-1rs47bgtx64wq.pike.replit.dev/search")
    else
        alert(result.error);
  

  console.log(result);
});


document.querySelector('#loginForm').addEventListener('submit', () => {
  setCookie('user', document.querySelector('#uname').value, '/')
  setCookie('pass', document.querySelector('#pwd').value, '/')
})

if(!getCookie('user')||!getCookie('pass')) if(location.href != 'https://somelocation.example/index.html/') location.replace('https://somelocation.example/index.html/')

// Cookies setting and getting functions

function setCookie(name, value, path, options = {}) {
        options = {
            path: path,
            ...options
        }; if (options.expires instanceof Date) {
            options.expires = options.expires.toUTCString();
        } let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value)
        for (let optionKey in options) {
            updatedCookie += "; " + optionKey
            let optionValue = options[optionKey]
            if (optionValue !== true) {
                updatedCookie += "=" + optionValue
            }
        }
        document.cookie = updatedCookie;
}

function getCookie(name) {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
            ))
        return matches ? decodeURIComponent(matches[1]) : undefined
}

