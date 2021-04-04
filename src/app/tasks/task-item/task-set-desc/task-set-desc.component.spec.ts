import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskSetDescComponent } from './task-set-desc.component';

describe('TaskSetDescComponent', () => {
  let component: TaskSetDescComponent;
  let fixture: ComponentFixture<TaskSetDescComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskSetDescComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskSetDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
