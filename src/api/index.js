import BaseApi from '@garpix/base-api'
import { LoginUser, CheckList, ProductList, CardList, HistoryCheck } from './mochData'
import { checkSerializer, checkParamsSerializer } from './serializer'

class Api extends BaseApi {
  async loginUser(params) {
    try {
      const res = await this.post('/api/login/', params)
      return res.data
    }
    catch (err) {
      return LoginUser(params)
    }
  }

  async getCheckList({ page = 1, ...params }) { // +
    const serParam = checkParamsSerializer(params)
    try {
      const res = await this.get('/api/check/', {
        page,
        ...serParam,
      })
      return checkSerializer(res.data)
    }
    catch (err) {
      console.log('serParam', serParam)
      return checkSerializer(CheckList(1)) // 1 - норм, 2 - ошибка
    }
  }

  async getProductListForCreatingCheck() {
    try {
      const res = await this.get('/api/product_list/')
      return res.data
    }
    catch (err) {
      return ProductList(1).results // 1 - норм, 2 - ошибка
    }
  }

  async getCardListForCreatingCheck() {
    try {
      const res = await this.get('/api/card_list/')
      return res.data
    }
    catch (err) {
      return CardList(1).results // 1 - норм, 2 - ошибка
    }
  }

  async createCheck(check = {}, prevId) { // +
    try {
      const res = await this.post('/api/check/', {
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

  async getHistoryCheck(id = '') {
    try {
      const res = await this.post('/api/history_check/', id)
      return res.data
    }
    catch (err) {
      return HistoryCheck(1).results // 1 - норм, 2 - ошибка
    }
  }

  async deleteCheck(id = '', isDelayCheck = false) { // +
    try {
      const res = await this.delete(`/api/check/${id}`, {
        isCheckDelay: isDelayCheck
      })
      return res.data
    }
    catch (err) {
      return id
    }
  }

  async paidCheck(id = '', data = {}) { // +
    try {
      const res = await this.put(`/api/check/${id}`, data)
      return res.data
    }
    catch (err) {
      console.log('data', data)
      return `paidCheck, чек с id=${id} был удален и созданный новый оплаченный`
    }
  }
}

export const MAIN_URL = 'http://localhost:8010'
const api = new Api(`${MAIN_URL}`)
export default api