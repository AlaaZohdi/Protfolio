// theme
var themeBtn = document.getElementById("theme-toggle-button");
if (localStorage.getItem("theme") === null || undefined) {
  localStorage.setItem("theme", "dark");}
else if (localStorage.getItem("theme")==="light"){
    document.documentElement.classList.remove("dark");
}
themeBtn.addEventListener("click",function(){
    document.documentElement.classList.toggle("dark")
    if(document.documentElement.classList.contains("dark")){
        localStorage.setItem("theme","dark");}
    else{
        localStorage.setItem("theme", "light");}
})

// gear settings
// ? show settings
var settingBtn = document.getElementById("settings-toggle");
var settingsSidebar = document.getElementById("settings-sidebar");
var closeSettings = document.getElementById("close-settings");
settingBtn.addEventListener("click",function(){
    settingsSidebar.classList.remove("translate-x-full");
    settingBtn.style = "transform: translateX(-319px)";})
closeSettings.addEventListener("click" ,function(){
    settingsSidebar.classList.add("translate-x-full");
    settingBtn.style = "transform: translateX(0)";
})

// ? change font
var fontButtons = document.querySelectorAll(".font-option");
var body = document.body;
for (var i = 0; i < fontButtons.length; i++) {
  fontButtons[i].addEventListener("click", function () {
    var selectedFont = this.getAttribute("data-font");
    body.classList.remove("font-alexandria", "font-tajawal", "font-cairo");
    body.classList.add("font-" + selectedFont);
    localStorage.setItem("selectedFont", selectedFont);

    for (var j = 0; j < fontButtons.length; j++) {
      fontButtons[j].classList.remove("active");
      fontButtons[j].setAttribute("aria-checked", "false");
    }
    this.classList.add("active");
    this.setAttribute("aria-checked", "true");
  });
}
var savedFont = localStorage.getItem("selectedFont");

if (savedFont) {
  body.classList.remove("font-alexandria", "font-tajawal", "font-cairo");
  body.classList.add("font-" + savedFont);

  for (var k = 0; k < fontButtons.length; k++) {
    if (fontButtons[k].getAttribute("data-font") === savedFont) {
      fontButtons[k].classList.add("active");
      fontButtons[k].setAttribute("aria-checked", "true");
    } else {
      fontButtons[k].classList.remove("active");
      fontButtons[k].setAttribute("aria-checked", "false");
    }
  }
}

// ?colors
var colors = [
  "#326fd3",
  "#10B981",
  "#8B5CF6",
  "#F97316",
  "#F43F5E"
];
var colorGrid = document.getElementById("colorGrid");
for (var i = 0; i < colors.length; i++) {
  colorGrid.innerHTML +=` <button
      class="theme-color w-14 h-14 rounded-full cursor-pointer"
      style="background:${colors[i]}"
      data-color=${colors[i]}
    ></button>`;
}
var colorList =document.querySelectorAll(".theme-color");
for (var i = 0; i < colorList.length; i++) {
  colorList[i].addEventListener("click",function(){
    var selectedColor = this.getAttribute("data-color");
    document.documentElement.style.setProperty("--color-primary",selectedColor);
        localStorage.setItem("selectedColor", selectedColor);
  })
}
var savedColor = localStorage.getItem("selectedColor");
if (savedColor) {
  document.documentElement.style.setProperty("--color-primary", savedColor);
}

// reset
var resetBtn = document.getElementById("reset-settings");
if (resetBtn) {
  resetBtn.addEventListener("click", function () {
    localStorage.removeItem("theme");
    localStorage.removeItem("selectedFont");
    localStorage.removeItem("selectedColor");
    window.location.reload();
  });
}

// ?slider
var carousel = document.querySelector("#testimonials-carousel");
var cards = document.querySelectorAll(".testimonial-card");
var nextBtn = document.querySelector("#next-testimonial");
var prevBtn = document.querySelector("#prev-testimonial");
var indicators = document.querySelectorAll(".carousel-indicator");
var currentIndex = 0;
function updateSlider() {
  var moveAmount;
  if (window.innerWidth >= 1024) {
    moveAmount = 100 / 3;
  } else if (window.innerWidth >= 640) {
    moveAmount = 50;
  } else {
    moveAmount = 100;
  }
  carousel.style.transform = `translateX(${currentIndex * moveAmount}%)`;
  updateIndicators();}
function getMaxIndex() {
  if (window.innerWidth >= 1024) {
    return cards.length - 3;
  }
  if (window.innerWidth >= 640) {
    return cards.length - 2;
  }
  return cards.length - 1;}
nextBtn.addEventListener("click", () => {
  if (currentIndex < getMaxIndex()) {
    currentIndex++;
  } else {
    currentIndex = 0;}
  updateSlider();});
prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;}
     else {
    currentIndex = getMaxIndex();}
  updateSlider();});
function updateIndicators() {
  for (var i = 0; i < indicators.length; i++) {
    indicators[i].classList.remove("bg-accent");

    if (i === currentIndex) {
      indicators[i].classList.add("bg-accent");}}}

for (var j = 0; j < indicators.length; j++) {
  indicators[j].addEventListener("click", function () {
    currentIndex = Number(this.dataset.index); // أو this.getAttribute("data-index")
    updateSlider();});}
window.addEventListener("resize", updateSlider);





