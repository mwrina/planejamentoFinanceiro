import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupCriarInvestimentoComponent } from './popup-criar-investimento.component';

describe('PopupCriarInvestimentoComponent', () => {
  let component: PopupCriarInvestimentoComponent;
  let fixture: ComponentFixture<PopupCriarInvestimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupCriarInvestimentoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupCriarInvestimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
