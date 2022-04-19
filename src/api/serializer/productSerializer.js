import { UNITS } from "../../const";

const productGetSerializer = (product = {}) => ({
  id: product?.id || 0, // id
  title: product?.title || '', // название продукта
  manufacturer: product?.manufacturer || '', // название производителя - условно КРАСНЫЙ ОКТЯБРЬ
  unit: product?.unit || UNITS[0], // ед. измер.
  count: product?.count || 0, // кол-во имеется на складе
  price: product?.price || 0, // цена продукта (текущая)
  sale: product?.sale || 0, // распространяется ли на товар скидка в данный момент
  maybeOld: product?.maybeOld || false, // можно ли к данному продукту применить скидку 50%
})

export { productGetSerializer };