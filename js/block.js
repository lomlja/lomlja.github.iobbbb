// Function to display the popup
function showBlockPop() {
    console.log("showBlockPop() triggered");
    const popup = document.getElementById("blockpop");
    const overlay = document.getElementById("overlay");
    const mainContent = document.getElementById("main-content");
    const audio = document.getElementById("block-audio");

    popup.style.display = "block";
    overlay.style.display = "block";
    mainContent.classList.add("blurred");
    audio.play();
}

// Function to hide the popup
function closePopup() {
    console.log("closePopup() triggered");
    const popup = document.getElementById("blockpop");
    const overlay = document.getElementById("overlay");
    const mainContent = document.getElementById("main-content");
    const audio = document.getElementById("block-audio");

    popup.style.display = "none";
    overlay.style.display = "none";
    mainContent.classList.remove("blurred");
    audio.pause();
}

// Function to check the time dynamically
function checkTime() {
    const now = new Date();
    const hour = now.getHours();
    console.log(`Current Time: ${hour}`);

    if (hour >= 0 && hour < 5) {
        console.log("Popup should appear");
        showBlockPop();
    } else {
        console.log("Popup should NOT appear");
        closePopup();
    }
}

// Set up an interval to check the time every second (1000ms)
setInterval(checkTime, 1000);

// Add event listener for visibility change to ensure the popup works when returning to the tab
document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
        console.log("Tab became active, checking time...");
        checkTime();
    }
});

// Initial time check
checkTime();
