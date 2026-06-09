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

// ? scroll to top
var scrollToTopBtn = document.getElementById("scroll-to-top");

if (scrollToTopBtn) {
  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      // إظهار الزر بسلاسة عند تجاوز التمرير 300 بكسل
      scrollToTopBtn.classList.remove("opacity-0");
      scrollToTopBtn.classList.add("opacity-100");
    } else {
      scrollToTopBtn.classList.remove( "opacity-100");
      scrollToTopBtn.classList.add("opacity-0");
    }});
  scrollToTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });});}

    // ? active link
var sections = document.querySelectorAll("section");
var navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", function () {
  var scrollPosition = window.scrollY + 150;

  for (var i = 0; i < sections.length; i++) {
    var currentSection = sections[i];
    var sectionHeight = currentSection.offsetHeight;
    var sectionTop = currentSection.offsetTop;
    var sectionId = currentSection.getAttribute("id");

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      for (var j = 0; j < navLinks.length; j++) {
        var link = navLinks[j];
        if (link.getAttribute("href") === "#" + sectionId) {
          link.classList.remove("text-slate-600", "dark:text-slate-300");
          link.classList.add("text-primary", "dark:text-primary");
        } else {
          link.classList.remove("text-primary", "dark:text-primary");
          link.classList.add("text-slate-600", "dark:text-slate-300");
        }
      }
    }
  }
});  

// ?navs and taps
var filterButtons = document.querySelectorAll(".portfolio-filter");
var portfolioItems = document.querySelectorAll(".portfolio-item");

  for (var i = 0; i < filterButtons.length; i++) {
    filterButtons[i].addEventListener("click", function () {
      for (var j = 0; j < filterButtons.length; j++) {
        filterButtons[j].classList.remove("active", "bg-linear-to-r", "from-primary", "to-secondary", "text-white", "hover:shadow-lg", "hover:shadow-primary/50");
        filterButtons[j].setAttribute("aria-pressed", "false");
        filterButtons[j].classList.add("bg-white", "dark:bg-slate-800", "text-slate-600", "dark:text-slate-300", "hover:bg-slate-100", "dark:hover:bg-slate-700", "border", "border-slate-300", "dark:border-slate-700");
      }
      this.classList.remove("bg-white", "dark:bg-slate-800", "text-slate-600", "dark:text-slate-300", "hover:bg-slate-100", "dark:hover:bg-slate-700", "border", "border-slate-300", "dark:border-slate-700");
      this.classList.add("active", "bg-linear-to-r", "from-primary", "to-secondary", "text-white", "hover:shadow-lg", "hover:shadow-primary/50");
      this.setAttribute("aria-pressed", "true");

      var selectedFilter = this.getAttribute("data-filter");
      for (var k = 0; k < portfolioItems.length; k++) {
        var item = portfolioItems[k];
        var itemCategory = item.getAttribute("data-category"); 
        if (selectedFilter === "all" || selectedFilter === itemCategory) {
          item.classList.remove("hidden");
          (function(currentCard) {
            setTimeout(function() {
              currentCard.style.opacity = "1";
              currentCard.style.transform = "scale(1)";
            }, 10);
          })(item);
        } else {
          item.style.opacity = "0";
          item.style.transform = "scale(0.95)";
          item.classList.add("hidden");
        }
      }
    });
  }

