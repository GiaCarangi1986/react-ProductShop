import BaseApi from '@garpix/base-api'
import { HistoryCheck } from './mochData'
import { checkGetSerializer, checkParamsSerializer, authSendSerializer, authGetSerializer, createCheckSerializer } from './serializer'

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

  getProductListForCreatingCheck = async () => { // +
    const res = await this.get('/product/')
    return res.data
  }

  getCardListForCreatingCheck = async (value) => { // +
    const res = await this.post('/bonus_card/', { search: value })
    return res.data
  }

  createCheck = async (check = {}, prevId) => { // +
    const serData = createCheckSerializer(check, prevId)
    const res = await this.post('/check/', serData)
    return res.data.id
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

  deleteCheck = async (id = '', isDelayCheck = false) => { // +-
    const res = await this.delete(`/check/${id}`, {
      isCheckDelay: isDelayCheck
    })
    return res.data
  }

  dirtyDeleteCheck = async (id = '', isDelayCheck = false) => { // +-
    const res = await this.delete(`/check_additionally/${id}`, {
      isCheckDelay: isDelayCheck
    })
    return res.data
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