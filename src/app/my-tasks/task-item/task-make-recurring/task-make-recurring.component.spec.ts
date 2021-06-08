import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskMakeRecurringComponent } from './task-make-recurring.component';

describe('TaskMakeRecurringComponent', () => {
  let component: TaskMakeRecurringComponent;
  let fixture: ComponentFixture<TaskMakeRecurringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskMakeRecurringComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskMakeRecurringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
