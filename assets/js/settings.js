if (document.documentElement.className.includes("dark")) {
  document.getElementById("dtToggle").checked = true;
}
if (localStorage.getItem("hide-back") === "true") {
  document.getElementById("btToggle").checked = true;
}
if (localStorage.getItem("hide-title") === "true") {
  document.getElementById("htToggle").checked = true;
}

// Function to handle next tick with a Promise
const removeTransition = () => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));

// Wait for the next tick and remove the class
removeTransition().then(() => {
  document.querySelector("div#settings").classList.remove('no-transition');
});

// Hide Title Scroll
document.getElementById("htToggle").addEventListener("click", function () {
  if (localStorage.getItem("hide-title") === "true") {
    document.getElementById("htToggle").checked = false;
    localStorage.setItem("hide-title", "false");
    window.onscroll = function () { };
    document.querySelector(".nav").style.top = "0";
  } else {
    localStorage.setItem("hide-title", "true");
    document.querySelector("html").classList.add("hidetitlebar");
    var prevScrollpos = window.pageYOffset;
    window.onscroll = function () {
      var currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        document.querySelector(".nav").style.top = "0";
      } else {
        document.querySelector(".nav").style.top = "-61px";
      }
      prevScrollpos = currentScrollPos;
    };
    document.getElementById("htToggle").checked = true;
  }
});

// Back Top Clicking
document.getElementById("btToggle").addEventListener("click", function () {
  if (localStorage.getItem("hide-back") === "true") {
    document.getElementById("btToggle").checked = false;
    document.getElementById("top-link").style.display = "block";
    localStorage.setItem("hide-back", "false");
  } else {
    localStorage.setItem("hide-back", "true");
    document.getElementById("top-link").style.display = "none";
    document.getElementById("btToggle").checked = true;
  }
});

// Dark Mode Clicking
document.getElementById("dtToggle").addEventListener("click", function () {
  if (document.documentElement.className.includes("dark")) {
    document.getElementById("dtToggle").checked = false;
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  } else {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
    document.getElementById("dtToggle").checked = true;
  }
});