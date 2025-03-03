import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowordersdetailsComponent } from './showordersdetails.component';

describe('ShowordersdetailsComponent', () => {
  let component: ShowordersdetailsComponent;
  let fixture: ComponentFixture<ShowordersdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowordersdetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowordersdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
