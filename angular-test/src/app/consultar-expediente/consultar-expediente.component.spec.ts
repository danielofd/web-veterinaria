import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarExpedienteComponent } from './consultar-expediente.component';

describe('ConsultarExpedienteComponent', () => {
  let component: ConsultarExpedienteComponent;
  let fixture: ComponentFixture<ConsultarExpedienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultarExpedienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarExpedienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
