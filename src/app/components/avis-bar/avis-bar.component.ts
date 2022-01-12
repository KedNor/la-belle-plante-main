import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-avis-bar',
  templateUrl: './avis-bar.component.html',
  styleUrls: ['./avis-bar.component.scss'],
})
export class AvisBarComponent implements OnInit {
  starStates: { stateSelectedUser: boolean; stateHoverUser: boolean }[];
  @Output() starSelected = new EventEmitter<number>();
  @Input() starColor: number;

  constructor() {
    this.starStates = [];
    this.starColor = 0;

    for (let index = 0; index < 5; index++) {
      this.starStates.push({
        stateSelectedUser: false,
        stateHoverUser: false,
      });
    }
  }

  ngOnInit(): void {
    this.onClickStar(this.starColor - 1);
    this.onMouseLeave();
  }

  onMouseOver(index: number) {
    console.log('star over', index);
    for (let i = 0; i < this.starStates.length; i++) {
      if (i <= index) {
        this.starStates[i].stateHoverUser = true;
      } else {
        this.starStates[i].stateHoverUser = false;
      }
    }
  }

  onMouseLeave() {
    // this.starState = ['star', 'star', 'star', 'star', 'star'];
    const tempTab = [];
    for (let index = 0; index < this.starStates.length; index++) {
      tempTab.push({
        stateSelectedUser: this.starStates[index].stateSelectedUser,
        stateHoverUser: this.starStates[index].stateSelectedUser,
      });
    }
    this.starStates = [...tempTab];
  }

  onClickStar(starIndex: number) {
    for (let i = 0; i < this.starStates.length; i++) {
      if (i <= starIndex) {
        this.starStates[i].stateSelectedUser = true;
      } else {
        this.starStates[i].stateSelectedUser = false;
      }
    }
    this.starSelected.emit(starIndex + 1);
  }
}
