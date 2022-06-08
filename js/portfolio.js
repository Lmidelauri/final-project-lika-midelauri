let slideIndex = 0;
changeimages();

function changeimages() {
  let i;
  let slides = document.getElementsByClassName("secondpageslider");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    

  slides[slideIndex-1].style.display = "block";  
  setTimeout(changeimages, 2000); 
}