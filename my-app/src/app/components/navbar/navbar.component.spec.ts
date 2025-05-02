import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the navbar component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the navbar with links', () => {
    const compiled = fixture.nativeElement;
    const links = compiled.querySelectorAll('a');
    expect(links.length).toBeGreaterThan(0);
  });

  it('should render the user icon', () => {
    const compiled = fixture.nativeElement;
    const userIcon = compiled.querySelector('#usu');
    expect(userIcon).toBeTruthy();
  });
});
