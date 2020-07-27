let checkbox = document.getElementById('DisableCSP');
function myFunction() {
  console.log('fired');
  if (checkbox.checked) {
    chrome.runtime.sendMessage({ CSPstate: "check" });
  }
}
window.onload = function () {
  document.getElementById('DisableCSP').addEventListener('change', myFunction);  
  chrome.runtime.sendMessage({send:"hello"},function (res) {
    console.log('message check');
    if (res.response==="true") {
      document.getElementById('DisableCSP').checked=true;
    }
  });
};

