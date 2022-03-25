import * as Yup from 'yup';
import * as errorsMessenge from './const';

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
  end_at: dateTempEnd,
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
    username: Yup.string()
      .nullable()
      .required(errorsMessenge.requiredField)
      .min(4, errorsMessenge.shortString)
      .max(50, errorsMessenge.longString),
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

export {
  signUp,
  addLineOfCheck,
  dateSearch
}
