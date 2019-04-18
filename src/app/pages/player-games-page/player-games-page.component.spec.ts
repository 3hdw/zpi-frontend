import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerGamesPageComponent } from './player-games-page.component';

describe('PlayerGamesPageComponent', () => {
  let component: PlayerGamesPageComponent;
  let fixture: ComponentFixture<PlayerGamesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerGamesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerGamesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
