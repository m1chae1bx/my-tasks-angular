import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskAssignListComponent } from './task-assign-list.component';

describe('TaskAssignListComponent', () => {
  let component: TaskAssignListComponent;
  let fixture: ComponentFixture<TaskAssignListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskAssignListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskAssignListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
