import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PlantouneService } from 'src/app/services/plantoune.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {
  likeCounter: number;
  subPlantLiked!: Subscription;

  constructor(private plantouneService: PlantouneService) {
    this.likeCounter = 0;
   }

  ngOnInit(): void {
    this.subPlantLiked = this.plantouneService.plantLiked$.subscribe(
      () => {
        console.log('Get new event from Subject');
        this.likeCounter ++;
      }
    )
  }

  ngOnDestroy(): void {
      this.subPlantLiked.unsubscribe();
  }

}
