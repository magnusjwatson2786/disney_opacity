document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("toggleBtn");

    // Get the saved state
    browser.storage.local.get("enabled", (data) => {
        let enabled = data.enabled !== undefined ? data.enabled : true;
        updateButtonText(enabled);
    });

    // Toggle the effect when clicked
    toggleBtn.addEventListener("click", () => {
        browser.storage.local.get("enabled", (data) => {
            let enabled = !data.enabled;
            browser.storage.local.set({ enabled });

            // Send message to content.js
            browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                browser.tabs.sendMessage(tabs[0].id, { enabled });
            });

            updateButtonText(enabled);
        });
    });

    function updateButtonText(enabled) {
        toggleBtn.textContent = enabled ? "Disable Transparency" : "Enable Transparency";
    }
});
