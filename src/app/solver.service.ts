import { Injectable } from '@angular/core';

@Injectable()

export class SolverService {
  constructor() {}
  checks = 0;
  backtracks = 0;
  guesses = 0;

  /**
  * checks every cell in the given row to see if it can take the input value
  * @return [boolean] if input is valid return true, otherwise return false
  */
  checkRow(board, row, checkValue){
    if(row > 8) throw new Error('max index is 8');
    var validInput = true;
    for(var i = 0; i < board.length; i++){
      for(var j = 0; j < board.length; j++){
        if(board[row][j] === checkValue){
          validInput = false;
        }
      }
    }
    return validInput;
  }

  /**
  *  checks every cell in the given column
  *  @return [boolean] if input is valid return true, otherwise return false
  */
  checkColumn(board, column, checkValue){
    if(column > 8) throw new Error('max index is 8');
    var validInput = true;
    for(var i = 0; i < board.length; i++){
      for(var j = 0; j < board.length; j++){
        if(board[i][column] === checkValue){
          validInput = false;
        }
      }
    }
    return validInput;
  }

  /**
  *  checks every cell within the same 3x3 area as the cell
  *  @return [boolean] if input is valid return true, otherwise return false
  */
  check3x3Square(board, row, column, checkValue){
    if(row > 8 || column > 8) throw new Error('max index is 8');
    var validInput = true;

    // modulo can ensure that row/column indicies = 0 or 3 or 6
    var startRowIndex = row - row % 3;
    var startColumnIndex = column - column % 3;

    // which allows iterating the 3x3 cells with a nested for loop of 3x3
    for(var i = 0; i < 3; i++){
      for(var j = 0; j < 3; j++){
        if(board[startRowIndex + i][startColumnIndex + j] === checkValue){
          validInput = false;
        }
      }
    }
    return validInput;
  }

  /**
   * creates a collection of unsolved sudoku square coords, alongside possible choices
   * @return Array of objects
   */
  findEmptySquares(board){
    var emptySquares = [];

    for(var i = 0; i < board.length; i++){
      for(var j = 0; j < board.length; j++){
        // push the coordinates of each square location to an array
        if(board[i][j] === 0) {
          var choices = this.generatePossibleChoices(board, i, j);

          emptySquares.push({
            row: i,
            column: j,
            choices: choices,
            solveSpace: choices.slice() // clone choices for choiceSpace
          });
        }
      }
    }
    return emptySquares;
  }

  checkValidPlacement(board, row, column, value){
    this.checks++;
    if(
    this.checkRow(board, row, value) &&
    this.checkColumn(board, column, value) &&
    this.check3x3Square(board, row, column, value)){
      return true;
    }
    return false;
  }

  /**
   * scans the board for Given values, then eliminates them as options
   * for the row, column and 3x3square that the Given value belongs to
   * @return Array of possibleChoices representing the remaining possible inputs for the given cell
   */
  generatePossibleChoices(board, row, column){
    var numPool = {};// hashtable for accumulating possibleChoices

    // check rows choices
    for(var i = 0; i < board.length; i++){
      for(var j = 0; j < board.length; j++){
        if(board[row][j] !== 0){
          numPool[board[row][j]] = true; // if space is not 0, add its value to the numberPool
        }
      }
    }

    // check columns choices
    for(var i = 0; i < board.length; i++){
      for(var j = 0; j < board.length; j++){
        if(board[i][column] !== 0){
          numPool[board[i][column]] = true;
        }
      }
    }

    // check 3x3 choices
    var startRowIndex = row - row % 3;
    var startColumnIndex = column - column % 3;
    // console.log('startRowIndex', startRowIndex);

    for(var i = 0; i < 3; i++){
      for(var j = 0; j < 3; j++){
        if(board[startRowIndex + i][startColumnIndex + j] !== 0){
          numPool[board[startRowIndex + i][startColumnIndex + j]] = true;
        }
      }
    }

    // map values that ARENT in the hashtable to array
    var possibleChoices = [];
    for(var i = 1; i <= 9; i++) {
      var numKey = i.toString();
      if(!numPool[numKey]) {
        possibleChoices.push(parseInt(numKey));
      }
    }

    return possibleChoices;
  }

  /**
   * takes an unsolved sudoku board and returns a solved one
   */
  solve(sBoard){
    console.log('--- Original Board ---');
    console.log(sBoard);
    var board = sBoard.map((x)=>x.map((x)=>x)); // deep clone 2d array

    // distinguish which spaces need to be filled
    var emptySquares = this.findEmptySquares(board);

    // sort the emptySquares in desc order by choices.length
    // to solve the the most constrained squares first
    emptySquares.sort(compare);
    function compare(a, b) {
      if (a.choices.length < b.choices.length)
        return -1;
      if (a.choices.length > b.choices.length)
        return 1;

      return 0;
    }

    var value;
    for(var i = 0; i < emptySquares.length;){
      var row = emptySquares[i].row;
      var column = emptySquares[i].column;
      var found = false;

      while(!found){
        // if no choices left, reset the possible choices for this space, wipe space and go back
        if(emptySquares[i].choices.length === 0){
          this.backtracks++;
          //clone the original solveSpace back into choices list
          emptySquares[i].choices = emptySquares[i].solveSpace.slice();
          board[row][column] = 0;
          i--;
          break;
        }

        //shift the first element out of the array and use it as our guess value
        value = emptySquares[i].choices.shift();

        if(this.checkValidPlacement(board, row, column, value)){
          this.guesses++;
          found = true;
          board[row][column] = value;
          i++;
        }
      }
    }

    console.log('guesses:', this.guesses);
    console.log('checks:', this.checks);
    console.log('backtracks:', this.backtracks);
    this.resetCounters();

    console.log('--- Solved Board ---');
    console.log(board);
    return board;
  }

  resetCounters(){
    this.guesses = 0;
    this.checks = 0;
    this.backtracks = 0;
  }

  possibilities(row_id, column_id) {
		row_id = row_id - 1;
		column_id = column_id - 1;
  }

  
}
