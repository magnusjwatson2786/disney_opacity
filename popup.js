document.addEventListener("DOMContentLoaded", () => {
    const slider = document.getElementById("opacitySlider");
    const opacityValue = document.getElementById("opacityValue");
    const toggleBtn = document.getElementById("toggleBtn");

    // Load saved opacity and toggle state
    browser.storage.local.get(["opacity", "enabled"], (data) => {
        let opacity = data.opacity !== undefined ? data.opacity : 0.84;
        let enabled = data.enabled !== undefined ? data.enabled : true;

        slider.value = opacity;
        opacityValue.textContent = `Opacity: ${opacity}`;
        toggleBtn.textContent = enabled ? "Disable Opacity" : "Enable Opacity";

        // Apply to active tab
        browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            browser.tabs.sendMessage(tabs[0].id, { opacity, enabled });
        });
    });

    // Update opacity on slider change
    slider.addEventListener("input", () => {
        let opacity = slider.value;
        opacityValue.textContent = `Opacity: ${opacity}`;
        browser.storage.local.set({ opacity });

        browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            browser.tabs.sendMessage(tabs[0].id, { opacity });
        });
    });

    // Toggle opacity on button click
    toggleBtn.addEventListener("click", () => {
        browser.storage.local.get("enabled", (data) => {
            let enabled = !data.enabled;
            browser.storage.local.set({ enabled });

            toggleBtn.textContent = enabled ? "Disable Opacity" : "Enable Opacity";

            browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                browser.tabs.sendMessage(tabs[0].id, { enabled });
            });
        });
    });
});
