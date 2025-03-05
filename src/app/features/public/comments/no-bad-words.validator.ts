import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { BAD_WORDS } from './bad-words';

export function noBadWordsValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const hasBadWord = BAD_WORDS.some(badWord =>
      control.value.toLowerCase().includes(badWord.toLowerCase())
    );

    return hasBadWord ? { badWord: true } : null;
  };
}