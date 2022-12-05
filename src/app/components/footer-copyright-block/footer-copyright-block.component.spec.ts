import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterCopyrightBlockComponent } from './footer-copyright-block.component';

describe('FooterCopyrightBlockComponent', () => {
  let component: FooterCopyrightBlockComponent;
  let fixture: ComponentFixture<FooterCopyrightBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FooterCopyrightBlockComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterCopyrightBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
