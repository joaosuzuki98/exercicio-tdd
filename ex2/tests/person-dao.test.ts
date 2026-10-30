import { Email } from '../src/email';
import { Person } from '../src/person';
import { PersonDAO } from '../src/person-dao';

describe('PersonDAO.isValidToInclude', () => {
  let dao: PersonDAO;

  beforeEach(() => {
    dao = new PersonDAO();
  });

  it('returns no errors for a valid person', () => {
    const person = new Person(1, 'Maria Silva', 30, [new Email(1, 'maria@exemplo.com')]);

    expect(dao.isValidToInclude(person)).toEqual([]);
  });

  it('allows creating a person without passing an email list', () => {
    const person = new Person(1, 'Maria Silva', 30);

    expect(dao.isValidToInclude(person)).toContain('A pessoa deve possuir ao menos um e-mail válido.');
  });

  it('provides the save operation', () => {
    const person = new Person(1, 'Maria Silva', 30, [new Email(1, 'maria@exemplo.com')]);

    expect(() => dao.save(person)).not.toThrow();
  });

  it.each(['Maria', '', '  Maria   ', 'Maria Silva2', 'Maria Silva-Souza'])(
    'rejects invalid name: "%s"',
    (name) => {
      const person = new Person(1, name, 30, [new Email(1, 'maria@exemplo.com')]);

      expect(dao.isValidToInclude(person)).toContain('O nome deve conter ao menos duas partes formadas por letras.');
    }
  );

  it('accepts names with accented letters and multiple parts', () => {
    const person = new Person(1, 'João da Conceição', 30, [new Email(1, 'joao@exemplo.com')]);

    expect(dao.isValidToInclude(person)).toEqual([]);
  });

  it.each([0, -1, 201, 30.5])('rejects age %s outside the valid range', (age) => {
    const person = new Person(1, 'Maria Silva', age, [new Email(1, 'maria@exemplo.com')]);

    expect(dao.isValidToInclude(person)).toContain('A idade deve estar entre 1 e 200.');
  });

  it.each([1, 200])('accepts boundary age %i', (age) => {
    const person = new Person(1, 'Maria Silva', age, [new Email(1, 'maria@exemplo.com')]);

    expect(dao.isValidToInclude(person)).toEqual([]);
  });

  it('requires at least one email', () => {
    const person = new Person(1, 'Maria Silva', 30, []);

    expect(dao.isValidToInclude(person)).toContain('A pessoa deve possuir ao menos um e-mail válido.');
  });

  it.each(['', 'maria', '@exemplo.com', 'maria@', 'maria@exemplo', 'maria@.com', 'maria@exemplo.', 'maria@@exemplo.com', 'maria@exemplo..com', 'maria exemplo@exemplo.com'])(
    'rejects invalid email: "%s"',
    (address) => {
      const person = new Person(1, 'Maria Silva', 30, [new Email(1, address)]);

      expect(dao.isValidToInclude(person)).toContain('O e-mail deve estar no formato nome@dominio.extensão.');
    }
  );

  it.each(['a@b.c', 'maria.silva@exemplo.com', 'maria@exemplo.com.br'])(
    'accepts an email with nonempty parts: "%s"',
    (address) => {
      const person = new Person(1, 'Maria Silva', 30, [new Email(1, address)]);

      expect(dao.isValidToInclude(person)).toEqual([]);
    }
  );

  it('accepts multiple valid emails', () => {
    const person = new Person(1, 'Maria Silva', 30, [
      new Email(1, 'maria@exemplo.com'),
      new Email(2, 'maria@outro.com')
    ]);

    expect(dao.isValidToInclude(person)).toEqual([]);
  });

  it.each([
    ['maria@exemplo.com', 'invalido'],
    ['invalido', 'maria@exemplo.com']
  ])('rejects a list containing a valid and an invalid email: %s, %s', (first, second) => {
    const person = new Person(1, 'Maria Silva', 30, [
      new Email(1, first),
      new Email(2, second)
    ]);

    expect(dao.isValidToInclude(person)).toEqual([
      'O e-mail deve estar no formato nome@dominio.extensão.'
    ]);
  });

  it('accumulates email format errors with name and age errors', () => {
    const person = new Person(1, 'Maria', 201, [new Email(1, 'invalido')]);

    expect(dao.isValidToInclude(person)).toEqual([
      'O nome deve conter ao menos duas partes formadas por letras.',
      'A idade deve estar entre 1 e 200.',
      'O e-mail deve estar no formato nome@dominio.extensão.'
    ]);
  });

  it('returns every applicable error', () => {
    const person = new Person(1, 'Maria', 0, []);

    expect(dao.isValidToInclude(person)).toEqual([
      'O nome deve conter ao menos duas partes formadas por letras.',
      'A idade deve estar entre 1 e 200.',
      'A pessoa deve possuir ao menos um e-mail válido.'
    ]);
  });
});
