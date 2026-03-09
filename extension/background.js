chrome.runtime.onInstalled.addListener(() => {
  console.log("PureWill AI Guardian installed.");
});

// Notify backend if extension is being messed with
chrome.runtime.onSuspend?.addListener(() => {
    // Note: onSuspend is not reliable for uninstall, but we can detect "disable" attempts
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "CHECK_LOCK_STATUS") {
    chrome.storage.local.get(["isLocked"], (result) => {
      sendResponse({ isLocked: !!result.isLocked });
    });
    return true;
  }

  if (request.type === "BYPASS_ATTEMPT") {
      // Call the web app API to send email to partner
      fetch('https://stop-porn-ai-q7pt.vercel.app/api/alert', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
              partnerEmail: request.partnerEmail,
              eventType: 'BYPASS' 
          })
      });
  }
});
