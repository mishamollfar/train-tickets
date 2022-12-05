import { AbstractControl } from '@angular/forms';

export const MinDate = (c: AbstractControl) => {
  if (!c.value) {
    return null;
  }
  const now = new Date();
  // const current = new Date(c.value);
  const current = new Date(new Date(c.value).setHours(new Date().getHours(), new Date().getMinutes() + 1));
  return now.getTime() < current.getTime() ? null : { invalidDate: true };
};
