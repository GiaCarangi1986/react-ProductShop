import BaseApi from '@garpix/base-api'
import {
  checkGetSerializer,
  checkParamsSerializer,
  authSendSerializer,
  authGetSerializer,
  createCheckSerializer,
  checkHistorySerializer,
  productForMakeDeliverySerializer,
  setMakeDeliverySerializer,
  setWriteOffSerializer,
  sendParamsBestSellersSerializer,
  getBestSellersSerializer,
  getPopularProductsSerializer,
  getRevenueDataSerializer,
  getBonusCardOwnerSerializer,
  getSaleSerializer,
  getUserListSerializer
} from './serializer'
import { dateFotmattedForMakeDeliveryBack, formatDateToBack } from '../utils/date'

class Api extends BaseApi {
  constructor(url) {
    super()
    this.url = url
  }

  loginUser = async (params) => {
    const serParams = authSendSerializer(params)
    const res = await this.post('/login/', serParams)
    const serRes = authGetSerializer(res.data)
    return serRes
  }

  getCheckList = async ({ page = 1, ...params }) => {
    try {
      const serParam = checkParamsSerializer(params)
      const res = await this.get('/check/', {
        page,
        ...serParam,
      })
      return checkGetSerializer(res.data)
    } catch (error) {
      return []
    }

  }

  getProductListForCreatingCheck = async () => {
    const res = await this.get('/product/')
    return res.data
  }

  getCardListForCreatingCheck = async (value) => {
    const res = await this.post('/bonus_card/', { search: value })
    return res.data
  }

  createCheck = async (check = {}, prevId) => {
    const serData = createCheckSerializer(check, prevId)
    const res = await this.post('/check/', serData)
    return res.data.id
  }

  getHistoryCheck = async (id = '') => {
    const res = await this.patch(`/check/${id}`)
    const serRes = checkHistorySerializer(res.data)
    return serRes
  }

  deleteCheck = async (id = '', isDelayCheck = false) => {
    const res = await this.delete(`/check/${id}`)
    return res.data
  }

  dirtyDeleteCheck = async (id = '') => {
    const res = await this.delete(`/check_additionally/${id}`)
    return res.data
  }

  paidCheck = async (id = '', data = {}) => {
    const serData = createCheckSerializer(data)
    const res = await this.put(`/check/${id}`, serData)
    return res.data
  }

  getListForMakeDilevers = async (period) => {
    const res = await this.get('/delivery_line/', {
      period
    })
    const serRes = productForMakeDeliverySerializer(res.data.productList)
    return {
      productList: serRes,
      latestDate: res.latestDate
    }
  }

  setListForMakeDilevers = async (productList = []) => {
    const serData = setMakeDeliverySerializer(productList)
    const res = await this.post('/delivery_line/', { deliveryLines: serData, date: dateFotmattedForMakeDeliveryBack() })
    return res.data
  }

  getLatestWriteOffDataDilevers = async () => {
    const res = await this.get('/writeoff/')
    return res.data
  }

  setWriteOffProducts = async (productList = [], userFK = '') => {
    const serData = setWriteOffSerializer(productList)
    const res = await this.post('/writeoff/', { productList: serData, dateTimeWriteOff: formatDateToBack(), userFK })
    return res.data
  }

  getBestSellers = async (params) => {
    const serParam = sendParamsBestSellersSerializer(params)
    const res = await this.get('/best_sellers/', serParam)
    const serRes = getBestSellersSerializer(res.data)
    return serRes
  }

  getPopularProducts = async (params) => {
    const serParam = sendParamsBestSellersSerializer(params)
    const res = await this.get('/popular_products/', serParam)
    const serRes = getPopularProductsSerializer(res.data)
    return serRes
  }

  getRevenueData = async (params) => {
    const serParam = sendParamsBestSellersSerializer(params)
    const res = await this.get('/revenue/', serParam)
    const serRes = getRevenueDataSerializer(res.data)
    return serRes
  }

  getBonusCardOwner = async () => {
    const res = await this.get('/bonus_card_owner/')
    const serRes = getBonusCardOwnerSerializer(res.data)
    return serRes
  }

  getSaleList = async () => {
    const res = await this.get('/sale/')
    const serRes = getSaleSerializer(res.data)
    return serRes
  }

  getUserList = async () => {
    const res = await this.get('/user/')
    const serRes = getUserListSerializer(res.data)
    return serRes
  }

  deleteUser = async (id) => {
    const res = await this.delete(`/user/${id}`)
    return res.data
  }
}

export const MAIN_URL = 'http://localhost:4000'
const api = new Api(`${MAIN_URL}`)
export default api