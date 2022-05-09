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
const correctDates = 'Дата окончания должна быть больше даты начала'
const correctBonus = 'Превышено возможное кол-во бонусов для списания'
const maxCount = 'Превышено максимальное кол-во данного продукта'
const uncorrectNumber = 'Неверный формат телефона'
const uncorrectEmail = 'Некорректный email'
const cyrillic_with_hyphen = 'Может содержать кириллицу и дефис'
const first_letter_not_hyphen = 'ФИО не может начинаться с дефиса'
const no_multiple_hyphen = 'Дефисы не могут повторяться'
const last_letter_not_hyphen = 'Не может оканчиваться на дефис'
const min_percent = 'Минимальное значение - 1'
const max_percent = 'Максимальное значение - 99'
const uncorrectPassword = 'Допускается латиница, должна содержаться минимум 1 цифра'

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
  correctDates,
  correctBonus,
  maxCount,
  uncorrectNumber,
  uncorrectEmail,
  cyrillic_with_hyphen,
  first_letter_not_hyphen,
  no_multiple_hyphen,
  last_letter_not_hyphen,
  min_percent,
  max_percent,
  uncorrectPassword
}