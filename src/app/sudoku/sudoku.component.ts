import { Component  } from '@angular/core';
import { SquaresComponent } from '../squares/squares.component';
import { SolverService } from '../solver.service';

@Component({
  selector: 'app-sudoku',
  templateUrl: './sudoku.component.html',
  styleUrls: ['./sudoku.component.css'],
  providers: [SolverService]
})
export class SudokuComponent {

 constructor(private solver: SolverService){}
  unsolvedBoard = [
      [1, 0, 3,  9, 0, 0,  4, 0, 0],
      [0, 0, 0,  0, 0, 0,  0, 5, 0],
      [0, 0, 0,  0, 0, 0,  0, 1, 0],

      [4, 0, 0,  5, 0, 0,  6, 0, 0],
      [0, 0, 0,  0, 9, 0,  0, 0, 0],
      [0, 0, 0,  0, 0, 0,  0, 0, 0],

      [7, 0, 0,  8, 0, 0,  9, 0, 0],
      [0, 1, 0,  0, 7, 0,  0, 0, 0],
      [0, 0, 2,  0, 0, 0,  0, 0, 6]
  ];
  resultBoard = [
      [0, 0, 0,  0, 0, 0,  0, 0, 0],
      [0, 0, 0,  0, 0, 0,  0, 0, 0],
      [0, 0, 0,  0, 0, 0,  0, 0, 0],

      [0, 0, 0,  0, 0, 0,  0, 0, 0],
      [0, 0, 0,  0, 0, 0,  0, 0, 0],
      [0, 0, 0,  0, 0, 0,  0, 0, 0],

      [0, 0, 0,  0, 0, 0,  0, 0, 0],
      [0, 0, 0,  0, 0, 0,  0, 0, 0],
      [0, 0, 0,  0, 0, 0,  0, 0, 0]
  ];

  onSolveClick(): void {
    this.resultBoard = this.solver.solve(this.unsolvedBoard); //SolverService
  }
  onResetClick(): void {
    this.resultBoard = Array(9).fill(Array(9).fill(0));
  }
  onPopulateClick(sudokuPuzzle: string): void {
    let board = sudokuPuzzle
      .split(',')
      .map((rows) => {
        return rows.split('').map((value) => parseInt(value));
      });

    // only put the board up if its valid
    if(board.length === 9 || board[0].length === 9){
      this.unsolvedBoard = board;
    }
    else {
      console.log('Invalid board input');
    }
  }
}





