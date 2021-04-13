import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartLabelComponent } from './cart-label.component';

describe('CartLabelComponent', () => {
  let component: CartLabelComponent;
  let fixture: ComponentFixture<CartLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartLabelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
