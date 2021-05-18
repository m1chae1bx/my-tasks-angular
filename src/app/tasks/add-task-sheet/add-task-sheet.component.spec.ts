import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskSheetComponent } from './add-task-sheet.component';

describe('AddTaskSheetComponent', () => {
  let component: AddTaskSheetComponent;
  let fixture: ComponentFixture<AddTaskSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTaskSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
