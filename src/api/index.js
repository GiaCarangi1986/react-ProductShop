import BaseApi from '@garpix/base-api'
import {
  checkGetSerializer,
  checkParamsSerializer,
  authSendSerializer,
  authGetSerializer,
  createCheckSerializer,
  checkHistorySerializer
} from './serializer'

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

  getListForMakeDilevers = async () => {
    try {
      const res = await this.get('/make_delivers/')
      return res.data
    } catch (error) {
      return [
        {
          id: 1,
          label: 'Простокваша',
          manufacturer: 'волжанка',
          count: 5,
          unit: 'шт',
          price: 34,
          total_cost: 150,
          productId: 1,
        },
        {
          id: 2,
          label: 'Квас',
          manufacturer: 'очаково',
          count: 0,
          unit: 'шт',
          price: 50,
          total_cost: 150,
          productId: 2,
        },
        {
          id: 3,
          label: 'Лимонад Колокольчик',
          manufacturer: 'черноголовка',
          count: 5,
          unit: 'шт',
          price: 60,
          total_cost: 300,
          productId: 3,
        },
      ]
    }
  }
}

export const MAIN_URL = 'http://localhost:4000'
const api = new Api(`${MAIN_URL}`)
export default api