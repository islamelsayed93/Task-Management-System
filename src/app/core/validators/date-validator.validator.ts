import { AbstractControl, ValidationErrors } from '@angular/forms';

export function futureDateValidator(control: AbstractControl): ValidationErrors | null {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const inputDate = new Date(control.value);

  if (control.value && inputDate < today) {
    return { pastDate: true };
  }
  return null;
}
