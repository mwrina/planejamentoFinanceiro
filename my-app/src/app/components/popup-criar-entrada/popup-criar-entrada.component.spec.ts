import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupCriarEntradaComponent } from './popup-criar-entrada.component';

describe('PopupCriarEntradaComponent', () => {
  let component: PopupCriarEntradaComponent;
  let fixture: ComponentFixture<PopupCriarEntradaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupCriarEntradaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupCriarEntradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
