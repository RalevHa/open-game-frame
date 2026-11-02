// Click the toolbar icon -> open the largest iframe of the current tab in a new tab.
chrome.action.onClicked.addListener(async (tab) => {
  let res = [];
  try {
    // runs in every frame (nested and cross-origin too) and reports the real URL + size
    res = await chrome.scripting.executeScript({
      target: { tabId: tab.id, allFrames: true },
      func: () => ({ url: location.href, area: innerWidth * innerHeight, top: window === top }),
    });
  } catch (e) {
    // chrome:// pages, the Web Store, etc. can't be scripted
  }
  // ponytail: picks the single largest frame; add a chooser if multiple games per page matter
  const best = res.map((r) => r.result)
    .filter((r) => r && !r.top && /^https?:/.test(r.url))
    .sort((a, b) => b.area - a.area)[0];

  if (best) {
    chrome.tabs.create({ url: best.url, index: tab.index + 1 });
  } else {
    // visible feedback: "!" badge for 2s when no iframe was found
    chrome.action.setBadgeBackgroundColor({ color: "#dc2626", tabId: tab.id });
    chrome.action.setBadgeText({ text: "!", tabId: tab.id });
    setTimeout(() => chrome.action.setBadgeText({ text: "", tabId: tab.id }), 2000);
  }
});
