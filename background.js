browser.commands.onCommand.addListener((command) => {
    if (command === "toggle-opacity") {
        browser.storage.local.get("enabled", (data) => {
            let enabled = !data.enabled;
            browser.storage.local.set({ enabled });

            browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                browser.tabs.sendMessage(tabs[0].id, { enabled });
            });
        });
    }
});
