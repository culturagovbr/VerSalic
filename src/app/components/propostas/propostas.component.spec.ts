/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PropostasComponent } from './propostas.component';

describe('PropostasComponent', () => {
  let component: PropostasComponent;
  let fixture: ComponentFixture<PropostasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropostasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropostasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
