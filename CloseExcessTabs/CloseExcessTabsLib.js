function optionsButton () {
    chrome.windows.create({
        url:'CloseExcessTabsOptions.html',
        type:'popup'
    });
}
if (document.getElementById("ob")) {
    document.getElementById("ob").addEventListener("click", optionsButton);
}