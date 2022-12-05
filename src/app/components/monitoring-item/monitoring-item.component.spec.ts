import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoringItemComponent } from './monitoring-item.component';

describe('MonitoringItemComponent', () => {
  let component: MonitoringItemComponent;
  let fixture: ComponentFixture<MonitoringItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MonitoringItemComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoringItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
