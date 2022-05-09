import * as Yup from 'yup';
import * as errorsMessenge from './const';

const REGEX = {
  emailReg: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/,
  cyrillic_with_hyphen: /[А-ЯЁёа-я-]$/,
  first_letter_not_hyphen: /^[^-]/,
  last_letter_not_hyphen: /.*[^-]{1}$/,
  no_multiple_hyphen: /^((?!-{2}| {2}).)*$/
}

const objectTemp = Yup.object().nullable().required(errorsMessenge.requiredField)

const numberTemp = Yup.number()
  .nullable()
  .min(0, errorsMessenge.zeroNumber)
  .max(32767, errorsMessenge.bigNumber)
  .required(errorsMessenge.requiredField);

const percentTemp = Yup.number()
  .nullable()
  .required(errorsMessenge.requiredField)
  .min(1, errorsMessenge.min_percent)
  .max(99, errorsMessenge.max_percent);

const countTemp = Yup.number()
  .nullable()
  .min(0.001, errorsMessenge.positiveNumber)
  .max(32767, errorsMessenge.bigNumber)
  .required(errorsMessenge.requiredField);

const stringTemp = Yup.string()
  .nullable()
  .max(150, errorsMessenge.lardgeString)
  .required(errorsMessenge.requiredField);

const priceTemp = (val = 150, err = errorsMessenge.lardgeString) => Yup.string()
  .nullable()
  .max(val, err)
  .test('price', errorsMessenge.priceZero, value => {
    const number = Number(value)
    return !Number.isNaN(number) && number > 0
  })
  .required(errorsMessenge.requiredField);

const dateTemp = Yup.mixed().nullable().required(errorsMessenge.requiredField)

const phoneTemp = Yup.string()
  .nullable()
  .required(errorsMessenge.requiredField)
  .min(11, errorsMessenge.uncorrectNumber)

const nameTemp = stringTemp
  .nullable()
  .required(errorsMessenge.requiredField)
  .min(2, errorsMessenge.shortString)
  .max(80, errorsMessenge.longString)
  .matches(
    REGEX.cyrillic_with_hyphen,
    errorsMessenge.cyrillic_with_hyphen
  )
  .matches(
    REGEX.first_letter_not_hyphen,
    errorsMessenge.first_letter_not_hyphen
  )
  .matches(
    REGEX.last_letter_not_hyphen,
    errorsMessenge.last_letter_not_hyphen
  )
  .matches(
    REGEX.no_multiple_hyphen,
    errorsMessenge.no_multiple_hyphen
  );


const emailTemp = Yup.string()
  .notRequired()
  .matches(REGEX.emailReg, errorsMessenge.uncorrectEmail)
  .email(errorsMessenge.uncorrectEmail)
  .min(5, errorsMessenge.shortString)
  .max(254, errorsMessenge.longString);

const dateTempEnd = Yup.mixed()
  .test('CorrectDates', errorsMessenge.correctDates, (value, context) => {
    if (context.parent.start_at && value) {
      const dateStart = context.parent.start_at;
      const dateEnd = value;
      return dateStart < dateEnd;
    }
    return true
  });

const dateSearch = Yup.object().shape({
  start_at: dateTemp,
  end_at: dateTempEnd.nullable().required(errorsMessenge.requiredField),
});

const maxCount = Yup.mixed()
  .test('setMaxCount', errorsMessenge.maxCount, (value, context) => {
    if (context.parent.product && value) {
      const productMaxCount = context.parent.product?.count;
      const curCount = value;
      return curCount <= productMaxCount;
    }
    return true
  })
  .test('min', errorsMessenge.positiveNumber, (value) => value > 0);

const signUp = () => {
  return Yup.object().shape({
    phone: phoneTemp,
    password: Yup.string()
      .nullable()
      .required(errorsMessenge.requiredField)
      .min(4, errorsMessenge.shortString)
      .max(50, errorsMessenge.longString),
  });
};

const addLineOfCheck = Yup.object().shape({
  product: objectTemp.required(''),
  count: maxCount,
})

const userCRUD = Yup.object().shape({
  firstName: nameTemp,
  secondName: nameTemp,
  patronymic: nameTemp.notRequired(),
  phone: phoneTemp,
  email: emailTemp,
  birthDate: dateTemp,
  gender: objectTemp
})

const saleCRUD = Yup.object().shape({
  start_at: dateTemp,
  end_at: dateTempEnd.nullable().required(errorsMessenge.requiredField),
  salePercent: percentTemp,
  product: objectTemp.notRequired().nullable(),
})

export {
  signUp,
  addLineOfCheck,
  dateSearch,
  userCRUD,
  saleCRUD
}
