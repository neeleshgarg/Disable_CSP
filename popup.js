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
}


let checkbox = document.getElementById('DisableCSP');
