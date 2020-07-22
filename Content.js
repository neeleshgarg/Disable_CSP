var disabledTabIds = [];                                 // List of tabIds where CSP headers are disabled
var isCSPDisabled = function (tabId) 
{
  return disabledTabIds.includes(tabId);
};
var toggleDisableCSP = function (tabId)
{
  if (isCSPDisabled(tabId)) 
  {
   disabledTabIds = disabledTabIds.filter(function (val)  // remove this tabId from disabledTabIds
   {
    return val !== tabId;
   });
  } 
  else                                                  

  {
    disabledTabIds.push(tabId);                          
    chrome.browsingData.remove({}, { serviceWorkers: true }, function () {});
  }
  updateUI(tabId);
};
var onHeadersReceived = function (details) 
{
  if (!isCSPDisabled(details.tabId)) 
    {
      return;
  }
  for (var i = 0; i < details.responseHeaders.length; i++) 
  {
   if (details.responseHeaders[i].name.toLowerCase() === 'content-security-policy') 
   {
      details.responseHeaders[i].value = '';
   }
  }
  return {
    responseHeaders: details.responseHeaders
  };
};
var updateUI = function (tabId) 
{
  var isDisabled = isCSPDisabled(tabId);
  var iconName = isDisabled ? 'on' : 'off';
  var title = isDisabled ? 'disabled' : 'enabled';

  chrome.browserAction.setIcon({ path: 'icon38-' + iconName + '.png' });
  chrome.browserAction.setTitle({ title: 'Content-Security-Policy headers are ' + title + ' for this tab' });
};
var init = function () 
{
  var onHeaderFilter = { urls: ['*://*/*'], types: ['main_frame', 'sub_frame'] }; // When Chrome recieves some headers
  chrome.webRequest.onHeadersReceived.addListener
  (
  onHeadersReceived, onHeaderFilter, ['blocking', 'responseHeaders']
  );

    chrome.tabs.query({active:true,currentWindows:true},function(tabs){
      toggleDisableCSP(tabs[0].id);
    })
};
  
chrome.runtime.onMessage.addListener(function(req,send,sendRes){
  if(req.CSPstate=="check"){
    init();
  }
})
/* init(); */
