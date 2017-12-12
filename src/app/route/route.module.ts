import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { SudokuComponent } from '../sudoku/sudoku.component';


export const routes: Routes = [ 
  { path: '', component: HomeComponent },
  { path: 'sudoku',component: SudokuComponent }
];
