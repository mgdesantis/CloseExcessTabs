chrome.tabs.onCreated.addListener(checkTabCount);
function checkTabCount() {
    chrome.storage.sync.get({
        removeMethod: 'newtab',
        tabsAllowed: '10'
    }, function (items) {
        chrome.windows.getAll({populate:true}, function (windows) {
            windows.forEach(function (w) {
                if (w.tabs.length > items.tabsAllowed) {
                    if (items.removeMethod == "newtab") {
                        console.log("[Remove Method] newtab");
                        removeTabs(items, w.tabs, w.tabs.length);
                    } else if (items.removeMethod == "random") {
                        console.log("[Remove Method] random");
                        removeTabs(items, w.tabs.sort(() => Math.random() - 0.5), w.tabs.length);
                    } else {
                        console.log("[Remove Method] fifo");
                        removeTabs(items, w.tabs.reverse(), w.tabs.length);
                    }
                }
            });
        });
    });
}
function removeTabs(i, t, n) {
    for (;n > i.tabsAllowed; n--) {
        console.log("[Remove Tab] " + t[n-1].id);
        chrome.tabs.remove(t[n-1].id);
    }
}