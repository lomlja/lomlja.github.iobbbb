// Function to display the popup and handle audio
function showBlockPop() {
    console.log("showBlockPop() triggered");

    const popup = document.getElementById("blockpop");
    const overlay = document.getElementById("overlay");
    const mainContent = document.getElementById("main-content");
    const audio = document.getElementById("block-audio");

    // Ensure the elements exist
    if (!popup || !overlay || !mainContent || !audio) {
        console.error("One or more required elements are missing in the HTML.");
        return; // Stop if elements are missing
    }

    // Show the popup and overlay
    popup.style.display = "block";
    overlay.style.display = "block";
    mainContent.classList.add("blurred");

    // Play audio once, then play again after it's finished
    let playCount = 0;
    audio.play().catch((error) => {
        console.error("Error playing audio:", error);
    });

    // Event listener for when audio ends
    audio.addEventListener("ended", () => {
        playCount++;
        if (playCount < 2) {
            audio.currentTime = 0; // Reset audio to the beginning
            audio.play(); // Play again
        } else {
            window.location.href = "index.html"; // Redirect after audio has played twice
        }
    });
}

// Function to check the UAE time dynamically
async function checkUAETime() {
    try {
        const response = await fetch("https://timeapi.io/api/Time/current/zone?timeZone=Asia/Dubai");
        const data = await response.json();

        const dateTime = new Date(data.dateTime);
        const currentHour = dateTime.getHours();
        const currentMinute = dateTime.getMinutes();

        console.log(`UAE Time: ${currentHour}:${currentMinute < 10 ? '0' : ''}${currentMinute}`);

        if (currentHour >= 10 || currentHour < 23) {
            console.log("Popup should appear (UAE Time)");
            showBlockPop();
        } else {
            console.log("Popup should NOT appear (UAE Time)");
        }
    } catch (error) {
        console.error("Error fetching UAE time:", error);
    }
}

// Initial check and periodic checks
setInterval(checkUAETime, 300000); // Check every 5 minutes
document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
        console.log("Tab became active, checking UAE time...");
        checkUAETime();
    }
});
checkUAETime(); // Initial check
