/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProponentesComponent } from './proponentes.component';

describe('ProponentesComponent', () => {
  let component: ProponentesComponent;
  let fixture: ComponentFixture<ProponentesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProponentesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProponentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
