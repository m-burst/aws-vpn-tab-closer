async function closeAwsTabs() {
    const windows = await chrome.windows.getAll({ populate: true });

    const idsToRemove = [];
    windows.forEach(window => {
        const tabs = window.tabs;
        if (tabs == null) return;

        tabs.forEach(tab => {
            if (tab.url === "http://127.0.0.1:35001/") {
                idsToRemove.push(tab.id);
            }
        });
    });
    if (idsToRemove.length > 0) {
        console.log(`Closing ${idsToRemove.length} tabs`);
        await chrome.tabs.remove(idsToRemove);
    }
}

chrome.webNavigation.onCompleted.addListener(details => {
    setTimeout(closeAwsTabs, 1000);
}, {
    url: [
        {
            hostEquals: "127.0.0.1",
        }
    ],
})

setTimeout(closeAwsTabs, 1000);
