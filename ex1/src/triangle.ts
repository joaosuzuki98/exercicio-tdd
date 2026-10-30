export enum TriangleType {
  Equilateral = 'equilátero',
  Isosceles = 'isósceles',
  Scalene = 'escaleno',
  Invalid = 'inválido'
}

/** Classifies three integer side lengths as a triangle type. */
export class Triangle {
  classify(a: number, b: number, c: number): TriangleType {
    const sides = [a, b, c];

    if (sides.some((side) => !Number.isInteger(side) || side <= 0)) {
      return TriangleType.Invalid;
    }

    if (a + b <= c || a + c <= b || b + c <= a) {
      return TriangleType.Invalid;
    }

    if (a === b && b === c) {
      return TriangleType.Equilateral;
    }

    if (a === b || a === c || b === c) {
      return TriangleType.Isosceles;
    }

    return TriangleType.Scalene;
  }
}
