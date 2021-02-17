import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training.component';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css'],
})
export class CurrentTrainingComponent implements OnInit {
	@Output() trainingExit = new EventEmitter();
	progress = 0;
	timeLeft: Date;
	timer: number;
	private msToSecond = 1000;
	constructor( private dialog: MatDialog, private trainingService: TrainingService) { }

	ngOnInit(): void {
		this.TrainingStart();
		this.timeLeft = new Date(+this.trainingService.getRunningExercise().duration*this.msToSecond);
	}

	TrainingStart() {
		const step = 100/this.trainingService.getRunningExercise().duration;
		this.timer = Math.round(this.progress) < 100 ? setInterval(() => {
			this.progress += step;
			this.timeLeft = new Date(this.timeLeft.getTime()-this.msToSecond);
			if (Math.round(this.progress) >= 100) {
				this.trainingService.completeExercise();
				clearInterval(this.timer);
			}
		}, this.msToSecond) : null;
	}

	onTrainingStop() {
		clearInterval(this.timer);
		const dialogRef = this.dialog.open(StopTrainingComponent, {
			data: {
				timeLeft: this.timeLeft
			}
		});

		dialogRef.afterClosed().subscribe(result => {
			if(result) {
				this.trainingService.cancelExercise(Math.round(this.progress))
			} else {
				this.TrainingStart();
			}
		})
	}
}
