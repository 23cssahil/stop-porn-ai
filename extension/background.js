chrome.runtime.onInstalled.addListener(() => {
  console.log("PureWill AI Guardian installed.");
  chrome.storage.local.set({ isLocked: false });
});

// Sync from Dashboard via Content Script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Internal message received:", request);
  
  if (request.type === "SYNC_LOCK") {
    const { isLocked, partnerEmail } = request;
    
    // Always update local storage
    chrome.storage.local.set({ isLocked, partnerEmail }, () => {
      // Toggle blocking rules dynamically
      chrome.declarativeNetRequest.updateEnabledRulesets({
        [isLocked ? "enableRulesetIds" : "disableRulesetIds"]: ["ruleset_1"]
      }, () => {
        console.log(`Porn Blocking is now ${isLocked ? "ENABLED" : "DISABLED"}`);
        sendResponse({ success: true, status: isLocked ? "LOCKED" : "UNLOCKED" });
      });
    });
    return true; // Wait for async
  }

  if (request.type === "CHECK_LOCK_STATUS") {
    chrome.storage.local.get(["isLocked"], (result) => {
      sendResponse({ isLocked: !!result.isLocked });
    });
    return true;
  }

  if (request.type === "BYPASS_ATTEMPT") {
    chrome.storage.local.get(["partnerEmail"], (result) => {
      const email = request.partnerEmail || result.partnerEmail;
      if (email) {
        fetch('http://localhost:3000/api/alert', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            partnerEmail: email,
            eventType: 'BYPASS' 
          })
        }).catch(err => console.error("Alert failed:", err));
      }
    });
  }
});
