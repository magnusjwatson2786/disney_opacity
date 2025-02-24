const applyTransparency = (enabled) => {
    const videoContainer = document.querySelector("#video-container");
    if (videoContainer) {
        videoContainer.style.filter = enabled ? "opacity(0.84)" : "none";
    }
    else{
        console.log("#video-container not found!!")
    }
};

// Listen for messages from the popup
browser.runtime.onMessage.addListener((message) => {
    applyTransparency(message.enabled);
});

// Check saved state on page load
browser.storage.local.get("enabled", (data) => {
    applyTransparency(data.enabled !== undefined ? data.enabled : true);
});
