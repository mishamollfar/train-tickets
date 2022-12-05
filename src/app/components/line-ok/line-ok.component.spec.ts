import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineOkComponent } from './line-ok.component';

describe('LineOkComponent', () => {
  let component: LineOkComponent;
  let fixture: ComponentFixture<LineOkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LineOkComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineOkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
