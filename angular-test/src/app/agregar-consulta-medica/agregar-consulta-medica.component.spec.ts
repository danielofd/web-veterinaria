import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarConsultaMedicaComponent } from './agregar-consulta-medica.component';

describe('AgregarConsultaMedicaComponent', () => {
  let component: AgregarConsultaMedicaComponent;
  let fixture: ComponentFixture<AgregarConsultaMedicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarConsultaMedicaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarConsultaMedicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
