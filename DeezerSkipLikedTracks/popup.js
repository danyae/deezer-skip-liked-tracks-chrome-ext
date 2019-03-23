//SET VARIABLE
var isExtensionOn = false;
var input;

function setVariable() {
  chrome.extension.sendMessage({
    cmd: "setOnOffState",
    data: { value: isExtensionOn }
  });
}

function getVariable() {
  chrome.extension.sendMessage({ cmd: "getOnOffState" }, function(response) {
    if (response == true) {
      $(input).prop("checked", true);
    } else {
      $(input).prop("checked", false);
    }
  });
}

$(document).ready(function() {
  getVariable();
  input = $("#turnon");
  $("#turnon").on("change", function(e) {
    isExtensionOn = $(input).prop("checked");
    setVariable();
  });
});
