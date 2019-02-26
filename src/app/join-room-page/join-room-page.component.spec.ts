import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinRoomPageComponent } from './join-room-page.component';

describe('JoinRoomPageComponent', () => {
  let component: JoinRoomPageComponent;
  let fixture: ComponentFixture<JoinRoomPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinRoomPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinRoomPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
