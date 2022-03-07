const emailRegExp = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
const digitalRegExp = '^[0-9]+$';

const login = 'login';
const password = 'password';
const email = 'Некорректный email';
const requiredField = 'Обязательное поле';
const shortString = 'Слишком мало символов';
const longString = 'Слишком много символов';
const number = 'Допускаются только цифры';
const lardgeString = 'Допускается не более 150 символов'
// const lardgeTextarea = 'Допускается не более 300 символов'
const zeroNumber = 'Значение не может быть отрицательным'
const positiveNumber = 'Кол-во должно быть больше 0'
const bigNumber = 'Значение не должно превышать 32767'
const price = 'Число должно содержать не более 10 символов'
const priceZero = 'Цена должна быть больше 0'
const correctDates = 'Дата окончания не может быть больше даты начала'

export {
  login,
  password,
  email,
  requiredField,
  shortString,
  longString,
  emailRegExp,
  digitalRegExp,
  number,
  lardgeString,
  zeroNumber,
  positiveNumber,
  bigNumber,
  price,
  priceZero,
  correctDates
}