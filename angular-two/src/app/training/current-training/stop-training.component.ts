import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'app-stop-training',
	template: `<h1 mat-dialog-title> Are you Sure? </h1>
	<mat-dialog-content>
		<p> You still got {{ passedData.timeLeft | date: 'mm:ss' }}s time left?</p>
	</mat-dialog-content>
	<mat-dialog-actions>
		<button mat-button [mat-dialog-close]="true">Yes</button>
		<button mat-button [mat-dialog-close]="false">No</button>
	</mat-dialog-actions>
	`
})
export class StopTrainingComponent {
	constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) {
	}
}