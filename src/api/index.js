import BaseApi from '@garpix/base-api'
import { ProductList, CardList, HistoryCheck } from './mochData'
import { checkGetSerializer, checkParamsSerializer, authSendSerializer, authGetSerializer } from './serializer'

class Api extends BaseApi {
  constructor(url) {
    super()
    this.url = url
  }

  loginUser = async (params) => { // +
    const serParams = authSendSerializer(params)
    const res = await this.post('/login/', serParams)
    const serRes = authGetSerializer(res.data)
    return serRes
  }

  getCheckList = async ({ page = 1, ...params }) => { // +
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
    try {
      const res = await this.get('/product/')
      return res.data
    }
    catch (err) {
      return ProductList(1).results // 1 - норм, 2 - ошибка
    }
  }

  getCardListForCreatingCheck = async () => {
    try {
      const res = await this.get('/bonus_card/')
      return res.data
    }
    catch (err) {
      return CardList(1).results // 1 - норм, 2 - ошибка
    }
  }

  createCheck = async (check = {}, prevId) => {
    try {
      const res = await this.post('/check/', {
        ...check,
        parentCheckId: prevId
      })
      // res.id ?
      return res.data
    }
    catch (err) {
      return '2222' // вернется созданный чек
    }
  }

  getHistoryCheck = async (id = '') => {
    try {
      const res = await this.post('/history_check/', id)
      return res.data
    }
    catch (err) {
      return HistoryCheck(1).results // 1 - норм, 2 - ошибка
    }
  }

  deleteCheck = async (id = '', isDelayCheck = false) => {
    try {
      const res = await this.delete(`/check/${id}`, {
        isCheckDelay: isDelayCheck
      })
      return res.data
    }
    catch (err) {
      return id
    }
  }

  paidCheck = async (id = '', data = {}) => {
    try {
      const res = await this.put(`/check/${id}`, data)
      return res.data
    }
    catch (err) {
      console.log('data', data)
      return `paidCheck, чек с id=${id} был удален и созданный новый оплаченный`
    }
  }
}

export const MAIN_URL = 'http://localhost:4000'
const api = new Api(`${MAIN_URL}`)
export default api