import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAndAddBoxComponent } from './search-and-add-box.component';

describe('SearchAndAddBoxComponent', () => {
  let component: SearchAndAddBoxComponent;
  let fixture: ComponentFixture<SearchAndAddBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchAndAddBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchAndAddBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
