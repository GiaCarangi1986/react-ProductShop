import { UNITS } from "../../const";
import { roundNumber } from "../../utils";

const productGetSerializer = (product = {}) => ({
  id: product?.id || 0, // id
  title: product?.title || '', // название продукта
  manufacturer: product?.manufacturer || '', // название производителя - условно КРАСНЫЙ ОКТЯБРЬ
  unit: product?.unit || UNITS[0], // ед. измер.
  count: product?.count || 0, // кол-во имеется на складе
  price: product?.price || 0, // цена продукта (текущая)
  sale: product?.sale || false, // распространяется ли на товар скидка в данный момент
  maybeOld: product?.maybeOld || false, // можно ли к данному продукту применить скидку 50%
})

const productForMakeDeliverySerializer = (productList = []) => {
  const serProductList = []
  productList.forEach(product => {
    serProductList.push({
      id: product.id, // id продукта
      label: product.title, // название продукта
      manufacturer: product.manufacturer, // наименование производителя
      count: product.count, // мин кол-во для заказа
      unit: product.unit, // ед измер
      price: product.price, // цена - рандомная от тек цена - 45% до тек цена - 5% (условно откуда то приходит с другой системы)
      total_cost: roundNumber(product.totalCost), // общая стоимость строки заказа
    })
  })
  return serProductList
}

const setMakeDeliverySerializer = (productList = []) => {
  const serProductList = []
  productList.forEach(product => {
    if (product.count) {
      serProductList.push({
        productFK: product.id, // id продукта
        productCount: product.count, // мин кол-во для заказа
        priceBuy: product.price, // цена - рандомная от тек цена - 45% до тек цена - 5% (условно откуда то приходит с другой системы)
      })
    }
  })
  return serProductList
}

const setWriteOffSerializer = (productList = []) => {
  const serProductList = []
  productList.forEach(product => {
    if (product.count) {
      serProductList.push({
        productFK: product.id, // id продукта
        productCount: product.count, // кол-во для списания
      })
    }
  })
  return serProductList
}

export { productGetSerializer, productForMakeDeliverySerializer, setMakeDeliverySerializer, setWriteOffSerializer };