import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarHistorialMedicoComponent } from './consultar-historial-medico.component';

describe('ConsultarHistorialMedicoComponent', () => {
  let component: ConsultarHistorialMedicoComponent;
  let fixture: ComponentFixture<ConsultarHistorialMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultarHistorialMedicoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarHistorialMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
