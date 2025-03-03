import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostfaqComponent } from './postfaq.component';

describe('PostfaqComponent', () => {
  let component: PostfaqComponent;
  let fixture: ComponentFixture<PostfaqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostfaqComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostfaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
