import BaseApi from '@garpix/base-api'
import { LoginUser, CheckList, LogoutUser, ProductList, CardList } from './mochData'
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

  async getCheckList({ page = 1, pageSize = 30, search = '', ...params }) {
    try {
      const res = await this.post('/api/check_list/', {
        page,
        page_size: pageSize,
        search,
        ...params,
      })
      return res.data
    }
    catch (err) {
      return checkSerializer(CheckList(1)) // 1 - норм, 2 - ошибка
    }
  }

  async logoutUser() {
    try {
      const res = await this.post('/api/logout/')
      return res.data
    }
    catch (err) {
      return LogoutUser(1) // 1 - норм, 2 - ошибка
    }
  }

  async getProductListForCreatingCheck() {
    try {
      const res = await this.post('/api/product_list/')
      return res.data
    }
    catch (err) {
      return ProductList(1).results // 1 - норм, 2 - ошибка
    }
  }

  async getCardListForCreatingCheck() {
    try {
      const res = await this.post('/api/card_list/')
      return res.data
    }
    catch (err) {
      return CardList(1).results // 1 - норм, 2 - ошибка
    }
  }
}

export const MAIN_URL = 'http://localhost:8010'
const api = new Api(`${MAIN_URL}`)
export default api