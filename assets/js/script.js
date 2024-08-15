// To get the start game modal
var modal = document.getElementById("startGame");

var start = document.getElementsByClassName("start")[0];

// When the user clicks play now, close the modal
start.onclick = function() {
  modal.style.display = "none";
}
