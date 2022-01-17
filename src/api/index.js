import BaseApi from '@garpix/base-api'
import { LoginUser, CheckList, LogoutUser } from './mochData'
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
}

export const MAIN_URL = 'http://localhost:8010'
const api = new Api(`${MAIN_URL}`)
export default api