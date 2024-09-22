import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarExpedienteComponent } from './modificar-expediente.component';

describe('ModificarExpedienteComponent', () => {
  let component: ModificarExpedienteComponent;
  let fixture: ComponentFixture<ModificarExpedienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarExpedienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarExpedienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
