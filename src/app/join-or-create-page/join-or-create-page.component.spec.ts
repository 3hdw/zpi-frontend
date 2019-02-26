import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinOrCreatePageComponent } from './join-or-create-page.component';

describe('JoinOrCreatePageComponent', () => {
  let component: JoinOrCreatePageComponent;
  let fixture: ComponentFixture<JoinOrCreatePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinOrCreatePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinOrCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
