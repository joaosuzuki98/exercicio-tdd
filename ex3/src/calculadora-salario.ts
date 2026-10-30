import { Cargo, Funcionario } from './funcionario';

interface RegraDesconto {
  limite: number;
  descontoAcimaDoLimite: number;
  descontoAbaixoDoLimite: number;
}

const regrasPorCargo: Record<Cargo, RegraDesconto> = {
  [Cargo.DESENVOLVEDOR]: {
    limite: 3000,
    descontoAcimaDoLimite: 0.2,
    descontoAbaixoDoLimite: 0.1
  },
  [Cargo.DBA]: {
    limite: 2000,
    descontoAcimaDoLimite: 0.25,
    descontoAbaixoDoLimite: 0.15
  },
  [Cargo.TESTADOR]: {
    limite: 2000,
    descontoAcimaDoLimite: 0.25,
    descontoAbaixoDoLimite: 0.15
  },
  [Cargo.GERENTE]: {
    limite: 5000,
    descontoAcimaDoLimite: 0.3,
    descontoAbaixoDoLimite: 0.2
  }
};

export class CalculadoraSalario {
  calcularSalarioLiquido(funcionario: Funcionario): number {
    const regra = regrasPorCargo[funcionario.cargo];
    const percentualDesconto = funcionario.salarioBase >= regra.limite
      ? regra.descontoAcimaDoLimite
      : regra.descontoAbaixoDoLimite;

    return funcionario.salarioBase * (1 - percentualDesconto);
  }
}
