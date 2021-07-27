import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFiltersBarComponent } from './task-filters-bar.component';

describe('TaskFiltersBarComponent', () => {
  let component: TaskFiltersBarComponent;
  let fixture: ComponentFixture<TaskFiltersBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskFiltersBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskFiltersBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
