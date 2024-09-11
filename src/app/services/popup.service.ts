import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { PopupComponent } from '../components/popup/popup.component';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(private dialog: MatDialog) {}

  openPopup(message:string) {
    console.log(message);
    
    let dialogRef = this.dialog.open(PopupComponent, {
      data: {message: message}
    });
    
    dialogRef.afterOpened().subscribe(f => {
      setTimeout(() => {
         dialogRef.close();
      }, 2000)
    })
  }
}
