import { dateFotmattedForMakeDelivery, dateFotmattedForMakeDeliveryBack } from '../../utils/date';
import { SALE_KIND } from '../../const';

const getSaleSerializer = (params = []) => {
  const serList = []
  params.forEach(el => {
    const nowDate = new Date()
    nowDate.setHours(3, 0, 0, 0)
    const nowDateTime = nowDate.getTime()
    const startDate = new Date(el.dateStart)?.getTime()
    const endDate = new Date(el.dateEnd)?.getTime()
    const status = endDate < nowDateTime ? SALE_KIND.past : startDate <= nowDateTime ? SALE_KIND.present : SALE_KIND.future
    serList.push({
      id: el.id, // id
      start_date: dateFotmattedForMakeDelivery(el.dateStart), // дата начала проведения акции
      end_date: dateFotmattedForMakeDelivery(el.dateEnd), // дата окончания проведения акции
      discountPercent: el.discountPercent, // размер скидки
      product_count: el.productCount, // кол-во продуктов, участвующих в акции
      status // статус акции (прошла, идет, запланирована)
    })
  })
  return serList
}

const filterSerializer = (filters = {}) => {
  return {
    search: filters?.search || '',
    status: filters?.status || '',
    date: dateFotmattedForMakeDeliveryBack()
  }
}

const getSaleCheckSerializer = (params = []) => {
  const products = []
  params.forEach(element => {
    products.push({
      id: element.id, // id продукта
      title: element.title // название продукта
    })
  });
  return products
}

const createSaleCheckSerializer = (data = []) => {
  const ids = []
  data?.productList.forEach(element => {
    ids.push(element.id)
  });
  return {
    id: +data.id,
    productsID: ids, // список id продуктов для изменения
  }
}

const createSaleSerializer = (params = {}) => {
  const ids = []
  params?.productList.forEach(element => {
    ids.push(element.id)
  });
  return {
    dateStart: params.start_at, // дата начала
    dateEnd: params.end_at, // дата окончания
    discountPercent: +params.salePercent, // процент скидки
    productsID: ids, // список id продуктов для изменения
  }
}

const getSaleForEditSerializer = (params = {}) => {
  const productList = []
  params?.productList.forEach(element => {
    productList.push({
      id: element.id,
      label: element.title
    })
  });
  return {
    id: params.id, // id
    start_at: params.dateStart, // дата начала
    end_at: params.dateEnd, // дата окончания
    salePercent: params.discountPercent, // процент скидки
    productList: [...productList], // список продуктов, участвующих в акции
  }
}

export { getSaleSerializer, createSaleSerializer, createSaleCheckSerializer, getSaleCheckSerializer, getSaleForEditSerializer, filterSerializer };