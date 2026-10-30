# Exercícios de TDD

Este repositório contém três projetos TypeScript independentes, cada um com seus próprios testes Jest:

- `ex1`: classificação de triângulos;
- `ex2`: validação de pessoas e e-mails;
- `ex3`: cálculo do salário líquido por cargo.

## Requisitos

- Node.js 18 ou superior;
- npm.

## Instalação, testes e build

Execute os comandos a partir da raiz do repositório. Cada exercício possui seu próprio `package.json` e `package-lock.json`; instale as dependências separadamente.

### Exercício 1

```bash
cd ex1
npm ci
npm test
npm run build
```

### Exercício 2

```bash
cd ex2
npm ci
npm test
npm run build
```

### Exercício 3

```bash
cd ex3
npm ci
npm test
npm run build
```

O comando `npm test` executa Jest em sequência (`--runInBand`) e coleta cobertura (`--coverage`). As configurações dos três projetos exigem 100% de cobertura global em statements, branches, functions e lines; a execução do teste falha se algum desses limites não for atingido. `npm run build` compila o TypeScript com `tsc`.

## Evidências de cobertura

Resultados obtidos executando `npm test` em cada projeto:

| Exercício | Suítes | Testes | Statements | Branches | Functions | Lines |
|---|---:|---:|---:|---:|---:|---:|
| 1 — Triângulo | 1 | 23 | 100% | 100% | 100% | 100% |
| 2 — Pessoa e e-mail | 1 | 34 | 100% | 100% | 100% | 100% |
| 3 — Salário | 1 | 13 | 100% | 100% | 100% | 100% |

Todos os arquivos de produção listados abaixo atingiram 100% nas quatro métricas:

| Exercício | Arquivos cobertos |
|---|---|
| 1 | `src/triangle.ts` |
| 2 | `src/email.ts`, `src/person.ts`, `src/person-dao.ts` |
| 3 | `src/funcionario.ts`, `src/calculadora-salario.ts` |

Jest também gera relatórios detalhados dentro de cada projeto, em `coverage/`. Para abrir o relatório HTML, abra `exN/coverage/lcov-report/index.html` no navegador, substituindo `exN` pelo exercício desejado. O resumo de cobertura também é impresso no terminal durante `npm test`.
