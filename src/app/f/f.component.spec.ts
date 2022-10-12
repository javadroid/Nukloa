import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FComponent } from './f.component';

describe('FComponent', () => {
  let component: FComponent;
  let fixture: ComponentFixture<FComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
