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
  bestSellersSerializer
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
    const res = await this.delete(`/check/${id}`, {
      isCheckDelay: isDelayCheck
    })
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
    const serParam = bestSellersSerializer(params)
    const res = await this.get('/best_sellers/', serParam)
    return res.data
  }
}

export const MAIN_URL = 'http://localhost:4000'
const api = new Api(`${MAIN_URL}`)
export default api