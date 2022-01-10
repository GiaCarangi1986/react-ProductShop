import * as Yup from 'yup';
import * as errorsMessenge from './const';

const objectTemp = Yup.object().nullable().required(errorsMessenge.requiredField)

const numberTemp = Yup.number()
  .nullable()
  .min(0, errorsMessenge.zeroNumber)
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

// const dateTempStart = Yup.string()
//   .nullable()
//   .required(errorsMessenge.requiredField);

const dateTempEnd = Yup.mixed()
  // .nullable()
  // .required(errorsMessenge.requiredField)
  .test('CorrectDates', errorsMessenge.correctDates, (value, context) => {
    if (context.parent.start_at && value) {
      const dateStart = context.parent.start_at;
      const dateEnd = value;
      return dateStart < dateEnd;
    }
    return true
  });


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

const addOrUpdateTariffSchema = Yup.object().shape({
  line_business: objectTemp,
  line_business_code: numberTemp,
  service_line: objectTemp,
  service_line_code: numberTemp,
  service: objectTemp,
  service_code: numberTemp,
  service_element: objectTemp,
  service_element_code: numberTemp,
  tariff: stringTemp,
  code: numberTemp,
  tariff_element: objectTemp,
  tariff_unit: objectTemp,
  tariff_type: objectTemp,
  flat_rate: objectTemp,
  price: priceTemp(11, errorsMessenge.price),
  cost_price: priceTemp(11, errorsMessenge.price),
  frequency_info: objectTemp,
  // comment: Yup.string().max(300, errorsMessenge.lardgeTextarea),
  // start_at: dateTempStart,
  end_at: dateTempEnd,
});

const addLineBussinessSchema = Yup.object().shape({
  title: stringTemp,
  code: numberTemp,
  non_field_errors: Yup.string().notRequired()
})

const addLineServiceSchema = Yup.object().shape({
  title: stringTemp,
  code: numberTemp,
  line_business: objectTemp,
  non_field_errors: Yup.string().notRequired()
})

const addServiceSchema = Yup.object().shape({
  title: stringTemp,
  code: numberTemp,
  line: Yup.object().nullable().required(errorsMessenge.requiredField),
})

const addElementServiceSchema = Yup.object().shape({
  title: stringTemp,
  code: numberTemp,
  service: objectTemp,
  non_field_errors: Yup.string().notRequired()
})

const addChargeType = Yup.object().shape({
  charge_type: stringTemp,
  non_field_errors: Yup.string().notRequired()
})

const addUnitTariff = Yup.object().shape({
  unit: stringTemp,
  non_field_errors: Yup.string().notRequired()
})

const addElementTariffSchema = Yup.object().shape({
  title: stringTemp,
  unit: objectTemp,
  charge_type: objectTemp,
  non_field_errors: Yup.string().notRequired()
})

const addFrequencyInfo = Yup.object().shape({
  freq: numberTemp,
  base: objectTemp,
  non_field_errors: Yup.string().notRequired()
})

export {
  signUp,
  addLineBussinessSchema,
  addLineServiceSchema,
  addOrUpdateTariffSchema,
  addServiceSchema,
  addElementServiceSchema,
  addChargeType,
  addUnitTariff,
  addElementTariffSchema,
  addFrequencyInfo
}