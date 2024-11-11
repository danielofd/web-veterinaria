import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerHistorialMedicoComponent } from './ver-historial-medico.component';

describe('VerHistorialMedicoComponent', () => {
  let component: VerHistorialMedicoComponent;
  let fixture: ComponentFixture<VerHistorialMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerHistorialMedicoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerHistorialMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
