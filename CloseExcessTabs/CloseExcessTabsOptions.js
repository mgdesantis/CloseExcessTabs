function save_options() {
    var status = document.getElementById('status');
    var rm = document.getElementById('rm').value;
    var ta = document.getElementById('ta').value;
    var al = document.getElementById('al').checked;
    ta = Number.parseInt(ta);
    if (Number.isNaN(ta) || 1 > ta) {
        console.log("[Remove Options] invalid value");
        status.textContent = 'Out of range.'
        return 1;
    }
    chrome.storage.sync.set({
        removeMethod: rm,
        tabsAllowed: ta,
        alertsAllowed: al
    }, function() {
        console.log("[Remove Options] saved" + al);
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}
function restore_options() {
    chrome.storage.sync.get({
        removeMethod: 'newtab',
        tabsAllowed: '10',
        alertsAllowed: false
    }, function(items) {
        document.getElementById('rm').value = items.removeMethod;
        document.getElementById('ta').value = items.tabsAllowed;
        document.getElementById('al').checked = items.alertsAllowed;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);