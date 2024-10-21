import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarCitaComponent } from './modificar-cita.component';

describe('ModificarCitaComponent', () => {
  let component: ModificarCitaComponent;
  let fixture: ComponentFixture<ModificarCitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarCitaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
