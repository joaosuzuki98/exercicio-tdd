export enum Cargo {
  DESENVOLVEDOR = 'DESENVOLVEDOR',
  DBA = 'DBA',
  TESTADOR = 'TESTADOR',
  GERENTE = 'GERENTE'
}

export class Funcionario {
  constructor(
    public nome: string,
    public email: string,
    public salarioBase: number,
    public cargo: Cargo
  ) {}
}
