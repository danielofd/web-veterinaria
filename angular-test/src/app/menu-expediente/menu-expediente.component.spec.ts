import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuExpedienteComponent } from './menu-expediente.component';

describe('MenuExpedienteComponent', () => {
  let component: MenuExpedienteComponent;
  let fixture: ComponentFixture<MenuExpedienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuExpedienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuExpedienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
