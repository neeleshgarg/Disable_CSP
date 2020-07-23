let checkbox = document.getElementById('DisableCSP');
function myFunction() {
  console.log('fired');
  if (checkbox.checked) {
    chrome.runtime.sendMessage({ CSPstate: "check" });
  }
  else {
    console.log("NO");
  }
}
window.onload = function () {
  document.getElementById('DisableCSP').addEventListener('change', myFunction);  
  chrome.runtime.onMessage.addListener(function (req, send, sendRes) {
    console.log('message check');
    if (req.state === "checked") {
      document.getElementById('DisableCSP').checked=true;
    }
  });
};
