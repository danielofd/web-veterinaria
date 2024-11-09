import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuConsultaMedicaComponent } from './menu-consulta-medica.component';

describe('MenuConsultaMedicaComponent', () => {
  let component: MenuConsultaMedicaComponent;
  let fixture: ComponentFixture<MenuConsultaMedicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuConsultaMedicaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuConsultaMedicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
