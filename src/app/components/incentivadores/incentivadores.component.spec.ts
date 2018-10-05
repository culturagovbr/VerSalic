/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IncentivadoresComponent } from './incentivadores.component';

describe('IncentivadoresComponent', () => {
  let component: IncentivadoresComponent;
  let fixture: ComponentFixture<IncentivadoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncentivadoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncentivadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
