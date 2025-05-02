import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupCriarSaidaComponent } from './popup-criar-saida.component';

describe('PopupCriarSaidaComponent', () => {
  let component: PopupCriarSaidaComponent;
  let fixture: ComponentFixture<PopupCriarSaidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupCriarSaidaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupCriarSaidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
