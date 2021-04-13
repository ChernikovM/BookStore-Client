import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintingEditionDetailsComponent } from './printing-edition-details.component';

describe('PrintingEditionDetailsComponent', () => {
  let component: PrintingEditionDetailsComponent;
  let fixture: ComponentFixture<PrintingEditionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintingEditionDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintingEditionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
