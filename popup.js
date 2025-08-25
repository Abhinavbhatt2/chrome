document.getElementById('start').addEventListener('click', async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: autoLoadMore
  });
});

function autoLoadMore() {
  function clickButton() {
    const btn = document.querySelector('#ContentPlaceHolder1_LnkShowNext100'); // Replace with correct selector
    if (btn && btn.style.display !== 'none') {
      console.log('Clicking Load More...');
      btn.click();
      setTimeout(clickButton, 2000); // wait 2s then click again
    } else {
      console.log('No more button or finished loading.');
      alert('✅ All records loaded!');
    }
  }
  clickButton();
}
