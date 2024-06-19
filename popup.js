document.addEventListener('DOMContentLoaded', function() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: "extractData" }, function(response) {
      if (response) {
        document.getElementById('propertyAddress').value = response.address;
      }
    });
  });

  document.getElementById('dealForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let dealData = {
      address: document.getElementById('propertyAddress').value,
      purchasePrice: document.getElementById('purchasePrice').value,
      loanTerm: document.getElementById('loanTerm').value,
      downPayment: document.getElementById('downPayment').value
    };
    fetch('https://yourserver.com/api/submitDeal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dealData)
    }).then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  });
});
