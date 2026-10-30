import { CalculadoraSalario } from '../src/calculadora-salario';
import { Cargo, Funcionario } from '../src/funcionario';

describe('CalculadoraSalario', () => {
  let calculadora: CalculadoraSalario;

  beforeEach(() => {
    calculadora = new CalculadoraSalario();
  });

  it.each([
    [Cargo.DESENVOLVEDOR, 3000, 2400],
    [Cargo.DESENVOLVEDOR, 2999, 2699.1],
    [Cargo.DESENVOLVEDOR, 4000, 3200],
    [Cargo.DBA, 2000, 1500],
    [Cargo.DBA, 1999, 1699.15],
    [Cargo.DBA, 3000, 2250],
    [Cargo.TESTADOR, 2000, 1500],
    [Cargo.TESTADOR, 1999, 1699.15],
    [Cargo.TESTADOR, 3000, 2250],
    [Cargo.GERENTE, 5000, 3500],
    [Cargo.GERENTE, 4999, 3999.2],
    [Cargo.GERENTE, 6000, 4200]
  ])('calculates net salary for %s with base salary %i', (cargo, salarioBase, esperado) => {
    const funcionario = new Funcionario('Ana Silva', 'ana@example.com', salarioBase, cargo);

    expect(calculadora.calcularSalarioLiquido(funcionario)).toBeCloseTo(esperado);
  });

  it('uses the high-rate discount when salary equals the role threshold', () => {
    const funcionario = new Funcionario('Ana Silva', 'ana@example.com', 3000, Cargo.DESENVOLVEDOR);

    expect(calculadora.calcularSalarioLiquido(funcionario)).toBe(2400);
  });
});
