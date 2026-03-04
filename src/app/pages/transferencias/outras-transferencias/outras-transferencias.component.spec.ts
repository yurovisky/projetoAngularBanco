import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutrasTransferenciasComponent } from './outras-transferencias.component';

describe('OutrasTransferenciasComponent', () => {
  let component: OutrasTransferenciasComponent;
  let fixture: ComponentFixture<OutrasTransferenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutrasTransferenciasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutrasTransferenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
