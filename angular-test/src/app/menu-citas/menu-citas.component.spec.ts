import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCitasComponent } from './menu-citas.component';

describe('MenuCitasComponent', () => {
  let component: MenuCitasComponent;
  let fixture: ComponentFixture<MenuCitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuCitasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuCitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
