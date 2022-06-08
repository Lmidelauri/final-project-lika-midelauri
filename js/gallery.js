
function scrollup() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};

function openModal() {
  document.getElementById("fotosgadideba").style.display = "block";
};

function closeModal() {
  document.getElementById("fotosgadideba").style.display = "none";
};

var slideIndex = 2;
slaiderisgamochena(slideIndex);

function shemdegifoto(n) {
  slaiderisgamochena(slideIndex += n);
};

function dziritadiphoto(n) {
  slaiderisgamochena(slideIndex = n);
};

function slaiderisgamochena(n) {
  var i;
  var slides = document.getElementsByClassName("zoomslider");


  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  };

  slides[slideIndex - 1].style.display = "block";

};