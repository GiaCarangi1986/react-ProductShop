import BaseApi from '@garpix/base-api'
import { LoginUser, CheckList, LogoutUser, ProductList, CardList, HistoryCheck } from './mochData'
import { checkSerializer } from './serializer'

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

  async getCheckList({ page = 1, pageSize = 30, ...params }) {
    try {
      const res = await this.get('/api/check/', {
        page,
        page_size: pageSize,
        ...params,
      })
      return checkSerializer(res.data)
    }
    catch (err) {
      console.log('params', params)
      return checkSerializer(CheckList(1)) // 1 - норм, 2 - ошибка
    }
  }

  async logoutUser() {
    try {
      const res = await this.get('/api/logout/')
      return res.data
    }
    catch (err) {
      return LogoutUser(1) // 1 - норм, 2 - ошибка
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

  async setCheck(check = {}) { // +
    try {
      const res = await this.post('/api/check/', check)
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

  async updateCheck(parentCheckId = '', id = '') { // +
    try {
      const res = await this.patch(`/api/check/${id}`, {
        parentCheckId
      })
      return res.data
    }
    catch (err) {
      return `updateCheck, в предыдущий чек с id=${id} в качестве id-родителя был указан созданный ${parentCheckId}`
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