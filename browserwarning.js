function isChrome() {
    const userAgent = navigator.userAgent;
    return /Chrome/.test(userAgent) && !/Edg|OPR|Brave/.test(userAgent);
  }

  // Show the banner if the browser is not Chrome
  document.addEventListener("DOMContentLoaded", () => {
    if (!isChrome()) {
      const warningBanner = document.getElementById("browser-warning");
      warningBanner.style.display = "block";
    }
  });

  // Close the banner
  function closeWarning() {
    const warningBanner = document.getElementById("browser-warning");
    warningBanner.style.display = "none";
  }