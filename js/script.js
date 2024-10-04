let scrollButton = document.getElementsByClassName("scroll-btn")[0];

window.onscroll = function () {
  console.log(scrollButton.style.display);

  if (window.scrollY > 20) {
    scrollButton.style.display = "block";
  } else {
    scrollButton.style.display = "none";
  }
};

const scrollToTop = function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
