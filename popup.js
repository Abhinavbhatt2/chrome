document.getElementById('start').addEventListener('click', async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: injectScript
  });
});

function injectScript() {
  const script = document.createElement('script');
  script.textContent = `
    (function autoClickLoadMore() {
      function clickButton() {
        var btn = document.querySelector('#ContentPlaceHolder1_LnkShowNext100');
        if (btn && btn.offsetParent !== null) {
          console.log('Clicking Load More...');
          btn.click();
          setTimeout(clickButton, 50000); // wait 50 seconds
        } else {
          console.log('No more Load More button.');
          alert('✅ All records loaded!');
        }
      }
      clickButton();
    })();
  `;
  document.documentElement.appendChild(script);
}
