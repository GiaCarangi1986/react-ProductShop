import { calcTotalCostInLine } from ".";

test('Переданный массив является пустым (путь	1-2-3-5-6)', () => {
  const data = []
  const expectData = []

  expect(calcTotalCostInLine(data)).toEqual(expectData);
});

test('Передан не массив (путь	1-2-6)', () => {
  const data = {}
  const expectData = []

  expect(calcTotalCostInLine(data)).toEqual(expectData);
});


test('Передан непустой массив (путь	1-2-3-4-5-6)', () => {
  const data = [{
    price: 10,
    count: 2,
    ratio: 1
  }]
  const expectData = [{
    price: 10,
    count: 2,
    ratio: 1,
    total_cost: 20
  }]

  expect(calcTotalCostInLine(data)).toEqual(expectData);
});

test('цикл не выполняется, так как не выполнилось условие перед ним', () => {
  const data = {}
  const expectData = []

  expect(calcTotalCostInLine(data)).toEqual(expectData);
});

test('цикл выполняется 1 раз для массива, состоящего из 1 элемента', () => {
  const data = [{
    price: 10,
    count: 2,
    ratio: 1
  }]
  const expectData = [{
    price: 10,
    count: 2,
    ratio: 1,
    total_cost: 20
  }]

  expect(calcTotalCostInLine(data)).toEqual(expectData);
});

test('цикл выполняется несколько раз, когда ему передается массив, в котором более 1-ого элемента', () => {
  const data = [
    {
      price: 10,
      count: 2,
      ratio: 1
    },
    {
      price: 20,
      count: 3,
      ratio: 0.5
    }
  ]
  const expectData = [
    {
      price: 10,
      count: 2,
      ratio: 1,
      total_cost: 20
    },
    {
      price: 20,
      count: 3,
      ratio: 0.5,
      total_cost: 30
    }
  ]

  expect(calcTotalCostInLine(data)).toEqual(expectData);
});

test('DU-цепочка [newVals,4,6]', () => {
  const data = [{
    price: 10,
    count: 2,
    ratio: 1
  }]
  const expectData = [{
    price: 10,
    count: 2,
    ratio: 1,
    total_cost: 20
  }]

  expect(calcTotalCostInLine(data)).toEqual(expectData);
});

test('DU-цепочка [newVals,1,6]', () => {
  const data = []
  const expectData = []

  expect(calcTotalCostInLine(data)).toEqual(expectData);
});