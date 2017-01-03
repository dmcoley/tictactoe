/** Difficulty of the AI */
Difficulty = {
  BEGINNER : "Beginner",
  INTERMEDIATE : "Intermediate",
  EXPERT : "Expert"
}

/** Players of the game */
Player = {
  RED : "Red",
  BLUE : "Blue"
}

/*
 * Resets the game board to all blank cells.
 */ 
function newGame() {
  NodeList.prototype.forEach = Array.prototype.forEach
  var children = Array.from($("board").childNodes);
  for (var i = 0; i < children.length; i++) {
    children[i].style.background = "";
  }
  initializeGlobals();
}

/*
 * Makes a move for the human player by setting the
 * given cell to red, then makes an AI move.
 */
function makeMove(node) {
  if (!isBlank(node)) {
    return;
  }
  player = Player.RED;
  node.style.background = "red";
  winner = judge.updateBoard(node, player);
  setTimeout(opponentMakeMove, 10);
}

/*
 * Makes a move for the AI by setting a cell to blue.
 */
function opponentMakeMove() {
  player = Player.BLUE;
  if (isGameOver()) {
    return;
  }
  var possibleMoves = getPossibleMoves(nodes);
  if (possibleMoves.length == 0) {
    isTieGame = true;
    $("results").innerText = "Tie game.";
    return;
  }
  
  // Pick a random choice if we're in beginner mode or 1/4 of the time in intermediate mode.
  if (difficulty == Difficulty.BEGINNER || (difficulty == Difficulty.INTERMEDIATE && Math.random() >= 0.75)) {
    choice = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    finishMove();
  } else {
    showLoader();
    setTimeout(doOptimalMove, 100);
  }
}

/*
 * Makes the optimal move for the AI.
 */
function doOptimalMove() {
  var serialized = getSerialized(nodes);
  if (serialized in cache) {
    choice = cache[serialized];
  } else {
    minimax(player, nodes, 0);
    cache[serialized] = choice;
  }
  finishMove(serialized);
}

/* 
 * Finishes the AI's move.
 */
function finishMove(serialized) {
  choice.style.background = "blue";
  winner = judge.updateBoard(choice, player);
  hideLoader();  
}

/**
 * Computes the next optimal move for the AI.
 */
function minimax(currPlayer, nodes, depth) {
  var winner = judge.getWinner(nodes);
  var possibleMoves = getPossibleMoves(nodes);
  if (winner != null || possibleMoves.length == 0) {
    return getScore(winner, player, depth);
  }

  var scores = [];
  var moves = [];
  possibleMoves.forEach(function(move) {
    // Make the move
    move.style.background = (currPlayer == Player.RED) ? "red" : "blue";

    // Recurse on the rest of the game
    var nextPlayer = (currPlayer == Player.RED) ? Player.BLUE : Player.RED;
    scores.push(minimax(nextPlayer, nodes, depth + 1));
    moves.push(move);

    // Undo the move after recursing
    move.style.background = "";
  })

  if (currPlayer == player) {
    var maxScoreIndex = 0;
    var maxScore = scores[0];
    for (var i = 1; i < scores.length; i++) {
      if (scores[i] > maxScore) {
        maxScore = scores[i];
        maxScoreIndex = i;
      }
    }
    choice = moves[maxScoreIndex];
    return scores[maxScoreIndex];
  } else {
    var minScoreIndex = 0;
    var minScore = scores[0];
    for (var i = 1; i < scores.length; i++) {
      if (scores[i] < minScore) {
        minScore = scores[i];
        minScoreIndex = i;
      }
    }
    choice = moves[minScoreIndex];
    return scores[minScoreIndex];
  }
}

/*
 * Gets the cost of making a choice for the Minimax algorithm.
 */
function getScore(winner, currPlayer, depth) {
  if (winner == null) {
    return 0;
  } else if (winner == currPlayer) {
    return 10 - depth;
  } else {
    return depth - 10;
  }
}