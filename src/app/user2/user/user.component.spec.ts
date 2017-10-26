import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UserComponent2} from './user.component';

describe('UserComponent2', () => {
  let component: UserComponent2;
  let fixture: ComponentFixture<UserComponent2>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserComponent2]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
