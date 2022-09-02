function save_options() {
    var status = document.getElementById('status');
    var rm = document.getElementById('rm').value;
    var ta = document.getElementById('ta').value;
    ta = Number.parseInt(ta);
    if (Number.isNaN(ta) || 1 > ta) {
        console.log("[Remove Options] invalid value");
        status.textContent = 'Out of range.'
        return 1;
    }
    chrome.storage.sync.set({
        removeMethod: rm,
        tabsAllowed: ta
    }, function() {
        console.log("[Remove Options] saved");
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}
function restore_options() {
    chrome.storage.sync.get({
        removeMethod: 'newtab',
        tabsAllowed: '10'
    }, function(items) {
        document.getElementById('rm').value = items.removeMethod;
        document.getElementById('ta').value = items.tabsAllowed;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);