import * as Yup from 'yup';
import * as errorsMessenge from './const';

const emailReg = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;

const objectTemp = Yup.object().nullable().required(errorsMessenge.requiredField)

const numberTemp = Yup.number()
  .nullable()
  .min(0, errorsMessenge.zeroNumber)
  .max(32767, errorsMessenge.bigNumber)
  .required(errorsMessenge.requiredField);

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

const emailTemp = Yup.string()
  .nullable()
  .required(errorsMessenge.requiredField)
  .matches(emailReg, errorsMessenge.uncorrectEmail)
  .email(errorsMessenge.uncorrectEmail)
  .min(5, errorsMessenge.shortString)
  .max(254, errorsMessenge.longString);

const dateTempEnd = Yup.mixed()
  .test('CorrectDates', errorsMessenge.correctDates, (value, context) => {
    if (context.parent.start_at && value) {
      const dateStart = context.parent.start_at;
      const dateEnd = value;
      return dateStart <= dateEnd;
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
  fio: stringTemp,
  phone: phoneTemp,
  email: emailTemp,
  bithDate: objectTemp,
  gender: objectTemp
})

export {
  signUp,
  addLineOfCheck,
  dateSearch,
  userCRUD
}
