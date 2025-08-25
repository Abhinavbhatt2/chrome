document.getElementById('start').addEventListener('click', async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: autoLoadMore
  });
});

function autoLoadMore() {
  function clickButton() {
    const btn = document.querySelector('#ContentPlaceHolder1_LnkShowNext100');
    if (btn && btn.offsetParent !== null) { // check if visible
      console.log('Clicking Load More in page context...');
      // Create real DOM click event
      const event = document.createEvent('MouseEvents');
      event.initMouseEvent('click', true, true, window);
      btn.dispatchEvent(event);

      setTimeout(clickButton, 300000); // wait 30 sec then check again
    } else {
      console.log('No more Load More button or finished loading.');
      alert('✅ All records loaded!');
    }
  }
  clickButton();
}
