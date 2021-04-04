import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskSetNameComponent } from './task-set-name.component';

describe('TaskSetNameComponent', () => {
  let component: TaskSetNameComponent;
  let fixture: ComponentFixture<TaskSetNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskSetNameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskSetNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
