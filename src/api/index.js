import BaseApi from '@garpix/base-api'
import { LoginUser, ERROR_MESSAGE } from './mochData'
// import {} from './serializer'

class Api extends BaseApi {
  async loginUser(params) { // надо придумать будет как например ток на 8 часов держать, а затем обновлять
    try {
      const res = await this.post('/api/login_user/', params)
      return res.data
    }
    catch (err) {
      return LoginUser(params)
    }
  }
}

// export const MAIN_URL = process.env.REACT_APP_API_URL
export const MAIN_URL = 'http://localhost:8010'
const api = new Api(`${MAIN_URL}`)
export default api