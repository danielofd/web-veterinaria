import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarConsultaComponent } from './modificar-consulta.component';

describe('ModificarConsultaComponent', () => {
  let component: ModificarConsultaComponent;
  let fixture: ComponentFixture<ModificarConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarConsultaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
