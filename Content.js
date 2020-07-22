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
var init = function () 
{ console.log('in init');
  var onHeaderFilter = { urls: ['*://*/*'], types: ['main_frame', 'sub_frame'] }; // When Chrome recieves some headers
  chrome.webRequest.onHeadersReceived.addListener
  (
  onHeadersReceived, onHeaderFilter, ['blocking', 'responseHeaders']
  );

  chrome.tabs.query({active:true},function(tabs){
    console.log('in call of toggleCSP');
    toggleDisableCSP(tabs[0].id);
    })
};
  
chrome.runtime.onMessage.addListener(function(req,send,sendRes){
  console.log('message sent');
  if(req.CSPstate=="check"){
    init();
  }
})
