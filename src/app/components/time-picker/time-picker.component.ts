import { Component, OnInit, ChangeDetectionStrategy, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'cht-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimePickerComponent),
      multi: true,
    },
  ],
})
export class TimePickerComponent implements OnInit, ControlValueAccessor {
  show = false;
  showHours = false;
  showMinutes = false;

  _selectedTime = '00:00';

  get timeValue() {
    return this._selectedTime;
  }

  set timeValue(val) {
    this._selectedTime = val;
    this.propagateChange(this._selectedTime);
  }

  _positions = [
    {
      originX: 'end',
      originY: 'bottom',
      overlayX: 'end',
      overlayY: 'top',
    },
  ];

  hours: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
  minutes: number[] = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

  selectedHour = 0;
  selectedMinute = 0;

  constructor() {}

  ngOnInit() {}

  writeValue(value: any) {
    if (value !== undefined) {
      this.timeValue = value;
    }
  }

  propagateChange(_: any) {}

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}

  goToHours() {
    this.showHours = true; // active show block select hours
    this.showMinutes = false; // hidden block select minute
  }

  toggleSelectColumnMenu(): void {
    this.show = !this.show; // show overlay select time
    this.showHours = !this.showHours; // active show block select hours
  }

  selectHour(hour: number): void {
    this.selectedHour = hour;
    this.timeValue = (hour <= 9 ? '0' + hour : hour) + ':00';
    this.showHours = !this.showHours; // hidden block select hours
    this.showMinutes = true; // active show block select minute
  }

  selectMinute(minute: number): void {
    this.selectedMinute = minute;
    this.timeValue =
      (this.selectedHour <= 9 ? '0' + this.selectedHour : this.selectedHour) +
      ':' +
      (minute <= 5 ? '0' + minute : minute);
    this.showMinutes = !this.showMinutes; // hidden block select minute
    this.show = false; // close overlay
  }
}
