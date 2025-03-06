import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewproductComponent } from './reviewproduct.component';

describe('ReviewproductComponent', () => {
  let component: ReviewproductComponent;
  let fixture: ComponentFixture<ReviewproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewproductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
