/*
 * Judges if a game of TicTacToe is over.
 */
class Judge {
  constructor(rows, cols, diagonal, antiDiagonal) {
    this.rows = rows;
    this.cols = cols;
    this.diagonal = diagonal;
    this.antiDiagonal = antiDiagonal;
  }

  /*
   * Updates the board by occupying the given node with given player's color.
   * Returns the winner if this move resulted in a win.
   */
  updateBoard(node, currPlayer) {
    var winner = null;
    var size = 3;
    var toAdd = currPlayer == Player.RED ? 1 : -1;
    var id = node.id;
    var row = Math.floor(id / size);
    var col = id % size;
    this.rows[row] += toAdd;
    this.cols[col] += toAdd;
    if (row == col) {
        this.diagonal += toAdd;
    }
    if (col == (size - row - 1)) {
        this.antiDiagonal += toAdd;
    }
    
    if (Math.abs(this.rows[row]) == size ||
        Math.abs(this.cols[col]) == size ||
        Math.abs(this.diagonal) == size  ||
        Math.abs(this.antiDiagonal) == size) {
        $("results").innerText = (currPlayer == Player.RED) ? "You win." : "I win.";
        winner = currPlayer;
    } 
    return winner;
  }

  /*
   * Returns the winner from the given set of cells if there is one, otherwise returns null.
   */
  getWinner(nodes) {
    for (var i = 1; i < nodes.length - 1; i += 3) {
      if (!isBlank(nodes[i])) {
        if (nodes[i].style.background == nodes[i+1].style.background 
            && nodes[i].style.background == nodes[i-1].style.background) {
          return nodes[i].style.background == "red" ? Player.RED : Player.BLUE;
        }
      }
    }
    
    for (var i = 0; i < 3; i++) {
      if (!isBlank(nodes[i])) {
        if (nodes[i].style.background == nodes[i+3].style.background
            && nodes[i].style.background == nodes[i+6].style.background) {
          return nodes[i].style.background == "red" ? Player.RED : Player.BLUE;
        }
      }      
    }
    
    if (!isBlank(nodes[0])) {
      if (nodes[0].style.background == nodes[4].style.background
          && nodes[0].style.background == nodes[8].style.background) {
          return nodes[0].style.background == "red" ? Player.RED : Player.BLUE;
      }
    }
    if (!isBlank(nodes[2])) {
      if (nodes[2].style.background == nodes[4].style.background
          && nodes[2].style.background == nodes[6].style.background) {
          return nodes[2].style.background == "red" ? Player.RED : Player.BLUE;
      }
    }
    return null;
  }
}