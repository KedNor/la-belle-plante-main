import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlantouneService } from 'src/app/services/plantoune.service';

@Component({
  selector: 'app-page-details',
  templateUrl: './page-details.component.html',
  styleUrls: ['./page-details.component.scss'],
})
export class PageDetailsComponent implements OnInit {
  detailPlant: any;

  constructor(
    private plantouneService: PlantouneService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    // console.log(productId);

    this.plantouneService
      .getProductById(productId)
      .subscribe((description: any[]) => {
        // console.log(description);
        this.detailPlant = description[0];
      });
  }
}
