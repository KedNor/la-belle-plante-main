import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter-side-bar',
  templateUrl: './filter-side-bar.component.html',
  styleUrls: ['./filter-side-bar.component.scss'],
})
export class FilterSideBarComponent implements OnInit {
  @Input() listCategories: string[];
  @Output() clickCategory = new EventEmitter<string[]>();
  @Output() tabPrice = new EventEmitter<any[]>();
  @Output() ratingClick = new EventEmitter<number>();
  rating: number;

  categoriesClicked: string[];

  constructor() {
    this.listCategories = [];
    this.categoriesClicked = [];
    this.rating = 0;
  }

  ngOnInit(): void {}

  onClickCategory(event: any) {
    //console.log(event.target.checked);
    if (event.target.checked) {
      this.categoriesClicked.push(event.target.value);
    } else {
      let index = this.categoriesClicked.indexOf(event.target.value);
      if (index !== -1) {
        this.categoriesClicked.splice(index, 1);
      }
    }
    this.clickCategory.emit(this.categoriesClicked);
  }

  onPriceFilter(priceMin: any, priceMax: any) {
    if (priceMin.value === '' || priceMax.value === '') {
      this.tabPrice.emit([]);
    } else {
      this.tabPrice.emit([parseInt(priceMin.value), parseInt(priceMax.value)]);
    }
  }

  saveRating(event: any) {
    console.log(event);
    this.rating = event;
  }

  onRatingFilter() {
    this.ratingClick.emit(this.rating);
  }
}
