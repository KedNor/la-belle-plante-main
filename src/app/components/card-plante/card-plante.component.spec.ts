import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPlanteComponent } from './card-plante.component';

describe('CardPlanteComponent', () => {
  let component: CardPlanteComponent;
  let fixture: ComponentFixture<CardPlanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardPlanteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardPlanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
