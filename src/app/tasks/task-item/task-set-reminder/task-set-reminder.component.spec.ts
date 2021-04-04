import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskSetReminderComponent } from './task-set-reminder.component';

describe('TaskSetReminderComponent', () => {
  let component: TaskSetReminderComponent;
  let fixture: ComponentFixture<TaskSetReminderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskSetReminderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskSetReminderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
