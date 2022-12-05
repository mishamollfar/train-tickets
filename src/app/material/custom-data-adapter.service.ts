import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material';

@Injectable()
export class CustomDataAdapterService extends NativeDateAdapter {
  getFirstDayOfWeek(): number {
    // We can't tell using native JS Date what the first day of the week is, we default to Sunday.
    // https://github.com/angular/material2/issues/8100
    // https://github.com/angular/material2/issues/10778
    // return 0;
    return 1;
  }
}
