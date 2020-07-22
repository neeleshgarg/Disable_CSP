

/* 
chrome.tabs.query({active:true,currentWindows:true},function(tabs){
  let checkBox = document.getElementById("DisableCSP");
    if (checkBox.checked == true){
        chrome.runtime.sendMessage({CSPstate:"check"});
        checkBox=true;
      } else {
         console.log("NO");
      }
});
*/

function myFunction(){
    console.log('fired');
  let checkBox = document.getElementById("DisableCSP");
    if (checkBox.checked == true){
        chrome.runtime.sendMessage({CSPstate:"check"});
      } else {
         console.log("NO");
      }
}

window.onload = function () {
  document.querySelector('checkbox').addEventListener('change', myFunction);
};

