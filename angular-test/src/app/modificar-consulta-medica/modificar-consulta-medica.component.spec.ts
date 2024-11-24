import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarConsultaMedicaComponent } from './modificar-consulta-medica.component';

describe('ModificarConsultaMedicaComponent', () => {
  let component: ModificarConsultaMedicaComponent;
  let fixture: ComponentFixture<ModificarConsultaMedicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarConsultaMedicaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarConsultaMedicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
