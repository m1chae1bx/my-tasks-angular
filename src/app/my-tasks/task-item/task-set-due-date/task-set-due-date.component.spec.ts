import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskSetDueDateComponent } from './task-set-due-date.component';

describe('TaskSetDueDateComponent', () => {
  let component: TaskSetDueDateComponent;
  let fixture: ComponentFixture<TaskSetDueDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskSetDueDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskSetDueDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
