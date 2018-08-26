import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleShipComponent } from './battle-ship.component';

describe('BattleShipComponent', () => {
  let component: BattleShipComponent;
  let fixture: ComponentFixture<BattleShipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattleShipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattleShipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
