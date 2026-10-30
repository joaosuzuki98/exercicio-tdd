import { Triangle, TriangleType } from '../src/triangle';

describe('Triangle.classify', () => {
  let triangle: Triangle;

  beforeEach(() => {
    triangle = new Triangle();
  });

  it('classifies a valid scalene triangle', () => {
    expect(triangle.classify(3, 4, 5)).toBe(TriangleType.Scalene);
  });

  it.each([
    [4, 4, 5],
    [4, 5, 4],
    [5, 4, 4]
  ])('classifies a valid isosceles triangle with sides %i, %i, %i', (a, b, c) => {
    expect(triangle.classify(a, b, c)).toBe(TriangleType.Isosceles);
  });

  it('classifies a valid equilateral triangle', () => {
    expect(triangle.classify(6, 6, 6)).toBe(TriangleType.Equilateral);
  });

  it('rejects a triangle containing zero', () => {
    expect(triangle.classify(0, 2, 2)).toBe(TriangleType.Invalid);
  });

  it('rejects a triangle containing a negative side', () => {
    expect(triangle.classify(-1, 2, 2)).toBe(TriangleType.Invalid);
  });

  it.each([
    [2.5, 3, 4],
    [3, 2.5, 4],
    [3, 4, 2.5]
  ])('rejects non-integer sides: %s, %s, %s', (a, b, c) => {
    expect(triangle.classify(a, b, c)).toBe(TriangleType.Invalid);
  });

  it.each([
    [1, 2, 3],
    [1, 3, 2],
    [2, 1, 3],
    [2, 3, 1],
    [3, 1, 2],
    [3, 2, 1]
  ])('rejects sides when two sum to the third: %i, %i, %i', (a, b, c) => {
    expect(triangle.classify(a, b, c)).toBe(TriangleType.Invalid);
  });

  it.each([
    [1, 2, 4],
    [1, 4, 2],
    [2, 1, 4],
    [2, 4, 1],
    [4, 1, 2],
    [4, 2, 1]
  ])('rejects sides when two sum to less than the third: %i, %i, %i', (a, b, c) => {
    expect(triangle.classify(a, b, c)).toBe(TriangleType.Invalid);
  });

  it('rejects three sides equal to zero', () => {
    expect(triangle.classify(0, 0, 0)).toBe(TriangleType.Invalid);
  });
});
