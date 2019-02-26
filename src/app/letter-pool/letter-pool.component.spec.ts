import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LetterPoolComponent } from './letter-pool.component';

describe('LetterPoolComponent', () => {
  let component: LetterPoolComponent;
  let fixture: ComponentFixture<LetterPoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LetterPoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LetterPoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
