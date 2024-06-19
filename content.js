chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "extractData") {
    let address, price;

    // Extraction logic for Zillow
    if (window.location.hostname.includes('zillow.com')) {
      address = document.querySelector('h1').innerText;
      price = document.querySelector('.ds-summary-row .ds-value').innerText;
    }

    // Extraction logic for Redfin
    if (window.location.hostname.includes('redfin.com')) {
      address = document.querySelector('span[data-rf-test-id="abp-streetLine"]').innerText;
      price = document.querySelector('div[data-rf-test-id="abp-price"]').innerText;
    }

    // Extraction logic for Realtor.com
    if (window.location.hostname.includes('realtor.com')) {
      address = document.querySelector('span[data-label="pc-address"]').innerText;
      price = document.querySelector('span[data-label="pc-price"]').innerText;
    }

    sendResponse({ address: address, price: price });
  }
});
