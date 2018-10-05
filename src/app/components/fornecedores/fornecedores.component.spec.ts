/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FornecedoresComponent } from './fornecedores.component';

describe('FornecedoresComponent', () => {
  let component: FornecedoresComponent;
  let fixture: ComponentFixture<FornecedoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FornecedoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FornecedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
