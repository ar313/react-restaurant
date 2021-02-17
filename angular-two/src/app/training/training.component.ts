import { Component, OnInit, Injectable } from '@angular/core';
import { TrainingService } from './training.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
	ongoingTraining = false;
	exerciseSubscription
	constructor(private trainingService: TrainingService) { }

	ngOnInit(): void {
		this.exerciseSubscription = this.trainingService.exerciseChanged.subscribe(
			exercise => {
				this.ongoingTraining = exercise? true : false;
		})
	}

}
