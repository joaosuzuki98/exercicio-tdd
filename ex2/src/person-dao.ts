import { Person } from './person';

const NAME_ERROR = 'O nome deve conter ao menos duas partes formadas por letras.';
const AGE_ERROR = 'A idade deve estar entre 1 e 200.';
const EMAIL_REQUIRED_ERROR = 'A pessoa deve possuir ao menos um e-mail válido.';
const EMAIL_FORMAT_ERROR = 'O e-mail deve estar no formato nome@dominio.extensão.';

export class PersonDAO {
  save(_person: Person): void {
    // A persistência não faz parte deste exercício.
  }

  isValidToInclude(person: Person): string[] {
    const errors: string[] = [];
    const nameParts = person.name.trim().split(/\s+/u);

    if (nameParts.length < 2 || nameParts.some((part) => !/^\p{L}+$/u.test(part))) {
      errors.push(NAME_ERROR);
    }

    if (!Number.isInteger(person.age) || person.age < 1 || person.age > 200) {
      errors.push(AGE_ERROR);
    }

    if (person.emails.length === 0) {
      errors.push(EMAIL_REQUIRED_ERROR);
    } else if (person.emails.some((email) => !/^[^\s@.]+(?:\.[^\s@.]+)*@[^\s@.]+(?:\.[^\s@.]+)+$/u.test(email.name))) {
      errors.push(EMAIL_FORMAT_ERROR);
    }

    return errors;
  }
}
