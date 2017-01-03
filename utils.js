/*
 * Close the dropdown menu if the user clicks outside of it. 
 */
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

/* 
 * When the user clicks on the button, toggle
 * between hiding and showing the dropdown content.
 */
function dropdownClick() {
  $("myDropdown").classList.toggle("show");
}

/*
 * Gets a serialized version of the passed in board.
 */
function getSerialized(nodes) {
  var serialized = "";
  nodes.forEach(function(node) {
    if (isBlank(node)) {
      serialized += "#";
    } else if (node.style.background == "red") {
      serialized += "R";
    } else {
      serialized += "B";
    }
  });
  return serialized;  
}

/*
 * Returns all blank cells from the given set of cells.
 */
function getPossibleMoves(nodes) {
  var possibleMoves = [];
  nodes.forEach(function(node) {
    if (isBlank(node)) {
      possibleMoves.push(node);
    }
  });
  return possibleMoves;
}

/*
 * Returns true if the given cell is blank, false otherwise.
 */
function isBlank(node) {
  return !(node.style.background == "red" || node.style.background == "blue");
}

/*
 * Returns true if the game is over, false otherwise.
 */
function isGameOver() {
  return winner != null && !isTieGame;
}

/* 
 * Shows the loading wheel.
 */
function showLoader() {
  $("loader").style.display = "block";
}

/*
 * Hides the loading wheel.
 */
function hideLoader() {
  $("loader").style.display = "none";
}

/*
 * Returns the DOM element with the given id 
 */
function $(id) {
  return document.getElementById(id);
}