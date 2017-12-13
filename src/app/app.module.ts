import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SquaresComponent } from './squares/squares.component';
import { routes } from './route/route.module';
import { HomeComponent } from './home/home.component';
import { SudokuComponent } from './sudoku/sudoku.component';


@NgModule({
  declarations: [
    AppComponent,
    SquaresComponent,
    HomeComponent,
    SudokuComponent, 
   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
