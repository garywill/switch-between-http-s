const default_title = "Switch between httpS and http";

var currentTab;

function isHTTPS(){
    return currentTab.url.substring(0, "https://".length) == "https://";
}

function isHTTP(){
    return currentTab.url.substring(0, "http://".length) == "http://";
}

function updateIcon() {
	if(isHTTP()) {
		browser.pageAction.setIcon({
			path: {
				16: "noS.svg", 
			},
			tabId: currentTab.id,
		});
		browser.pageAction.setTitle({
			title: default_title + "\nClick to switch to httpS",
			tabId: currentTab.id,
		});
	} else {
		browser.pageAction.setIcon({
			path: {
				16: "S.svg",
			},
			tabId: currentTab.id,			
		});
		browser.pageAction.setTitle({
			title: default_title + "\nClick to switch to http",
			tabId: currentTab.id,
		});
	}
	/*
  browser.pageAction.setIcon({
    path: isHTTP() ? {
      16: "add_S_red.svg",
    } : {
      16: "icons/minusSlika1.png",
    },
    tabId: currentTab.id,
  });
  */
}

function updateUrl(){
    if(isHTTPS()){
        updateActiveTab(browser.tabs.update(currentTab.id, {url: "http" + currentTab.url.substring(5)}));
    }
    else if(isHTTP()){
		updateActiveTab(browser.tabs.update(currentTab.id, {url: "https" + currentTab.url.substring(4)}));
    }
}

browser.pageAction.onClicked.addListener(updateUrl);

function handleTabChange() {
	updateActiveTab(browser.tabs.query({active: true, currentWindow: true}));
}

function updateActiveTab(gettingActiveTab) {
	gettingActiveTab.then(function(tab) {
		currentTab = tab[0] || tab;
		updateIcon();
	});
}

browser.tabs.onUpdated.addListener(handleTabChange);
browser.tabs.onActivated.addListener(handleTabChange);
browser.windows.onFocusChanged.addListener(handleTabChange);

handleTabChange();
