const applyTransparency = (opacity, enabled) => {
    const videoContainer = document.querySelector("#video-container");
    if (videoContainer) {
        videoContainer.style.filter = enabled ? `opacity(${opacity})` : "none";
    }
    else{
        console.log("#video-container not found!!")
    }
};

// Listen for messages from popup and background script
browser.runtime.onMessage.addListener((message) => {
    if (message.opacity !== undefined || message.enabled !== undefined) {
        browser.storage.local.get(["opacity", "enabled"], (data) => {
            let opacity = message.opacity !== undefined ? message.opacity : data.opacity || 0.84;
            let enabled = message.enabled !== undefined ? message.enabled : data.enabled || true;
            applyTransparency(opacity, enabled);
        });
    }
});

// Apply stored settings on page load
browser.storage.local.get(["opacity", "enabled"], (data) => {
    applyTransparency(data.opacity || 0.84, data.enabled !== undefined ? data.enabled : true);
});
