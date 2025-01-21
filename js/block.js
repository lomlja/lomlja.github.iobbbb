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


// Check the current time
const now = new Date();
const hour = now.getHours();

// Log the current hour
console.log("Current Hour:", hour);

if (hour >= 0 && hour < 5) {
    console.log("Popup should appear");
    showBlockPop();
} else {
    console.log("Popup should NOT appear");
}