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
      category: product.category, // категория продукта
      manufacturer: product.manufacturer, // наименование производителя
      count: product.count, // мин кол-во для заказа
      unit: product.unit, // ед измер
      price: roundNumber(product.price), // цена - рандомная от тек цена - 45% до тек цена - 5% (условно откуда то приходит с другой системы)
      total_cost: roundNumber(product.totalCost), // общая стоимость строки заказа
    })
  })
  return serProductList
}

const setMakeDeliverySerializer = (productList = []) => {
  const serProductList = []
  productList.forEach(product => {
    if (product.choosen_count) {
      serProductList.push({
        productFK: product.id, // id продукта
        productCount: product.choosen_count, // мин кол-во для заказа
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

const filterSerializer = (filters = {}) => {
  return {
    search: filters?.search || ''
  }
}

const getProductCrud = (params = []) => {
  const serList = []
  params.forEach(el => {
    serList.push({
      id: el.id, // id
      title: el.title, // наименование
      priceNow: roundNumber(el.priceNow), // текущая цена
      count: el.count, // кол-во на складе
      expirationDate: el.expirationDate, // срок годности в сутках
      category: el.category, // категория
      measurementUnits: el.measurementUnits, // ед. измер
      sale: el.sale, // скидка
      manufacturer: el.manufacturer, // производитель
    })
  })
  return serList
}


const createProductSerializer = (params = {}) => ({
  title: params.title, // название
  priceNow: params.priceNow, // цена
  expirationDate: params.expirationDate, // срок годности в сутках
  maybeOld: params.maybeOld, // может ли распространяться скидка по старости
  categoryFK: params.category.value, // категория
  measurementUnitsFK: params.measurementUnits.value, // ед. измер.
  manufacturerFK: params.manufacturer?.value, // производитель
})

export {
  productGetSerializer,
  productForMakeDeliverySerializer,
  setMakeDeliverySerializer,
  setWriteOffSerializer,
  filterSerializer,
  getProductCrud,
  createProductSerializer
};