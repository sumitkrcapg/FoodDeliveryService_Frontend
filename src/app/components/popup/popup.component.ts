import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogContent} from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [MatDialogModule, MatDialogContent],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {

  message!:string

	constructor(@Inject(MAT_DIALOG_DATA) public data:any) {
		this.message = data.message;
	}
}
