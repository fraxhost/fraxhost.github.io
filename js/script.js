// JavaScript to dynamically load content from external HTML files
function loadContent(page) {
  fetch(page)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text();
    })
    .then((data) => {
      document.getElementById("main-body").innerHTML = data;
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
      document.getElementById("main-body").innerHTML =
        "<p>Failed to load content.</p>";
    });
}
