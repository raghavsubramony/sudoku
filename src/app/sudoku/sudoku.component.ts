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
sudokuPuzzle = "070920405,000007806,450600000,005002009,040305002,030076000,069000004,000000000,000030900";

generate(sudokuPuzzle:string): void{
  let board = this.sudokuPuzzle.split(',')
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
  onSolveClick(): void {
    this.unsolvedBoard = this.solver.solve(this.unsolvedBoard); 
  }
  onResetClick(): void {
    this.unsolvedBoard = Array(9).fill(Array(9).fill(0));
  }
 }





