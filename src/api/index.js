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
  getUserListSerializer,
  createBonusCardOwnerSerializer,
  getBonusCardOwnerForEditSerializer,
  createSaleSerializer,
  createSaleCheckSerializer,
  getSaleCheckSerializer,
  getSaleForEditSerializer,
  createUserSerializer,
  getUserForEditSerializer,
  filterSerializerBonusCardOwner,
  filterSerializerSale,
  filterSerializerUser,
  getCategorySerializer,
  filterSerializerCategory,
  createCategorySerializer,
  createCategoryCheckSerializer,
  getCategoryCheckSerializer,
  getCategoryForEditSerializer,
  filterSerializerManufacturer,
  getManufacturerSerializer,
  createManufacturerCheckSerializer,
  createManufacturerSerializer,
  getManufacturerForEditSerializer,
  filterSerializerProduct,
  getProductCrud
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

  deleteCheck = async (id = '') => {
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

  getManufacturer = async (filters) => {
    const serFilters = filterSerializerManufacturer(filters)
    const res = await this.get('/manufacturer/', serFilters)
    const serRes = getManufacturerSerializer(res.data)
    return serRes
  }

  checkManufacturer = async (data) => {
    const serData = createManufacturerCheckSerializer(data)
    const res = await this.post('/manufacturer_check/', serData)
    const serRes = getManufacturerSerializer(res.data)
    return serRes
  }

  addManufacturer = async (data) => {
    const serData = createManufacturerSerializer(data)
    const res = await this.post('/manufacturer/', serData)
    const serRes = getManufacturerSerializer(res.data)
    return serRes
  }

  editManufacturer = async (data) => {
    const serData = createManufacturerSerializer(data)
    const res = await this.put(`/manufacturer/${data.id}`, serData)
    const serRes = getManufacturerSerializer(res.data)
    return serRes
  }

  getManufacturerForEdit = async (id) => {
    const res = await this.patch(`/manufacturer/${id}`)
    const serRes = getManufacturerForEditSerializer(res.data)
    return serRes
  }

  deleteManufacturer = async (id) => {
    const res = await this.delete(`/manufacturer/${id}`)
    const serRes = getManufacturerSerializer(res.data)
    return serRes
  }

  getCategory = async (filters) => {
    const serFilters = filterSerializerCategory(filters)
    const res = await this.get('/category/', serFilters)
    const serRes = getCategorySerializer(res.data)
    return serRes
  }

  checkCategory = async (data) => {
    const serData = createCategoryCheckSerializer(data)
    const res = await this.post('/category_check/', serData)
    const serRes = getCategoryCheckSerializer(res.data)
    return serRes
  }

  checkCategoryDelete = async (id) => {
    const res = await this.patch(`/category_check/${id}`)
    const serRes = getCategoryCheckSerializer(res.data)
    return serRes
  }

  addCategory = async (data) => {
    const serData = createCategorySerializer(data)
    const res = await this.post('/category/', serData)
    const serRes = getCategorySerializer(res.data)
    return serRes
  }

  editCategory = async (data) => {
    const serData = createCategorySerializer(data)
    const res = await this.put(`/category/${data.id}`, serData)
    const serRes = getCategorySerializer(res.data)
    return serRes
  }

  getCategoryForEdit = async (id) => {
    const res = await this.patch(`/category/${id}`)
    const serRes = getCategoryForEditSerializer(res.data)
    return serRes
  }

  deleteCategory = async (id) => {
    const res = await this.delete(`/category/${id}`)
    const serRes = getCategorySerializer(res.data)
    return serRes
  }

  getProduct = async (filters) => {
    const serFilters = filterSerializerProduct(filters)
    const res = await this.get('/product_crud/', serFilters)
    const serRes = getProductCrud(res.data)
    return serRes
  }

  deleteProduct = async (id) => {
    const res = await this.delete(`/product_crud/${id}`)
    const serRes = getProductCrud(res.data)
    return serRes
  }

  getBonusCardOwner = async (filters) => {
    const serFilters = filterSerializerBonusCardOwner(filters)
    const res = await this.get('/bonus_card_owner/', serFilters)
    const serRes = getBonusCardOwnerSerializer(res.data)
    return serRes
  }

  deleteBonusCardOwner = async (id) => {
    const res = await this.delete(`/bonus_card_owner/${id}`)
    const serRes = getBonusCardOwnerSerializer(res.data)
    return serRes
  }

  addBonusCardOwner = async (data) => {
    const serData = createBonusCardOwnerSerializer(data)
    const res = await this.post('/bonus_card_owner/', serData)
    const serRes = getBonusCardOwnerSerializer(res.data)
    return serRes
  }

  editBonusCardOwner = async (data) => {
    const serData = createBonusCardOwnerSerializer(data)
    const res = await this.put(`/bonus_card_owner/${data.id}`, serData)
    const serRes = getBonusCardOwnerSerializer(res.data)
    return serRes
  }

  getBonusCardOwnerForEdit = async (id) => {
    const res = await this.patch(`/bonus_card_owner/${id}`)
    const serRes = getBonusCardOwnerForEditSerializer(res.data)
    return serRes
  }

  getSaleList = async (filters) => {
    const serFilters = filterSerializerSale(filters)
    const res = await this.get('/sale/', serFilters)
    const serRes = getSaleSerializer(res.data)
    return serRes
  }

  deleteSale = async (id) => {
    const res = await this.delete(`/sale/${id}`)
    const serRes = getSaleSerializer(res.data)
    return serRes
  }

  checkSale = async (data) => {
    const serData = createSaleCheckSerializer(data)
    const res = await this.post('/sale_check/', serData)
    const serRes = getSaleCheckSerializer(res.data)
    return serRes
  }

  addSale = async (data) => {
    const serData = createSaleSerializer(data)
    const res = await this.post('/sale/', serData)
    const serRes = getSaleSerializer(res.data)
    return serRes
  }

  editSale = async (data) => {
    const serData = createSaleSerializer(data)
    const res = await this.put(`/sale/${data.id}`, serData)
    const serRes = getSaleSerializer(res.data)
    return serRes
  }

  getSaleForEdit = async (id) => {
    const res = await this.patch(`/sale/${id}`)
    const serRes = getSaleForEditSerializer(res.data)
    return serRes
  }

  getUserList = async (filters) => {
    const serFilters = filterSerializerUser(filters)
    const res = await this.get('/user/', serFilters)
    const serRes = getUserListSerializer(res.data)
    return serRes
  }

  deleteUser = async (id) => {
    const res = await this.delete(`/user/${id}`)
    const serRes = getUserListSerializer(res.data)
    return serRes
  }

  addUser = async (data) => {
    const serData = createUserSerializer(data)
    const res = await this.post('/user/', serData)
    const serRes = getUserListSerializer(res.data)
    return serRes
  }

  getUserForEdit = async (id) => {
    const res = await this.patch(`/user/${id}`)
    const serRes = getUserForEditSerializer(res.data)
    return serRes
  }

  editUser = async (data) => {
    const serData = createUserSerializer(data)
    const res = await this.put(`/user/${data.id}`, serData)
    const serRes = getUserListSerializer(res.data)
    return serRes
  }

  getGenderListForSelect = async () => {
    const res = await this.get('/gender/')
    return res.data
  }

  getRoleForSelect = async () => {
    const res = await this.get('/role/')
    return res.data
  }
}

export const MAIN_URL = 'http://localhost:4000'
const api = new Api(`${MAIN_URL}`)
export default api