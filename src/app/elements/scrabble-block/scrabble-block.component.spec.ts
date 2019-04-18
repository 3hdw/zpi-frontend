import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrabbleBlockComponent } from './scrabble-block.component';

describe('ScrabbleBlockComponent', () => {
  let component: ScrabbleBlockComponent;
  let fixture: ComponentFixture<ScrabbleBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrabbleBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrabbleBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
