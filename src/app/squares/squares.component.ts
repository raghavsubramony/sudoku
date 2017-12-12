import { Component,Directive, ElementRef, Input, Renderer } from '@angular/core';


@Component({
  selector: 'app-squares',
 template: `
      <span>
        <div *ngFor="let row of board" id="rows">
          <input
            *ngFor="let square of row"
            id="columns"
            type="text"
            value={{square}}
            maxlength=1
            readonly
          />
        </div>
      </span>
    `,
  styleUrls: ['./squares.component.css'],

})
export class SquaresComponent  {
 @Input() board: number[][];
 }
