import { Component,Directive, ElementRef, Input, Renderer } from '@angular/core';


@Component({
  selector: 'app-squares',
  templateUrl: './squares.component.html',
   styleUrls: ['./squares.component.css'],
})
export class SquaresComponent  {
 @Input() board: number[][]; 
 rows: number = 0; 
 boardX: number[];
 boardY: number[];
 boardNew: number[][];

  constructor(){
    
  }

  ngOnInit(){
    this.onRowChange();
  }
  

  onRowChange(){
    console.log("Fired- " + this.rows);
    this.board = new Array(this.rows);  
    for(let i=0; i < this.rows; i++){
      let boardX = new Array(this.rows); 
      for(let j=0; j< this.rows; j++){
        boardX[j] = 0;    
      }
      this.board[i] = boardX;
    }
    console.log("Borad new length- " + this.board.length);
    
  }
 }
