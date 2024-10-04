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

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    window.scrollTo({
      top: targetElement.offsetTop,
      behavior: "smooth",
    });

    const scrollDuration = 500; // Duration in milliseconds
    const start = window.scrollY; // Use window.scrollY instead
    const distance = targetElement.offsetTop - start - 70;
    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, start, distance, scrollDuration);
      window.scrollTo(0, run);
      if (timeElapsed < scrollDuration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
  });
});
