import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmprestimosPessoaisComponent } from './emprestimos-pessoais.component';

describe('EmprestimosPessoaisComponent', () => {
  let component: EmprestimosPessoaisComponent;
  let fixture: ComponentFixture<EmprestimosPessoaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmprestimosPessoaisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmprestimosPessoaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
