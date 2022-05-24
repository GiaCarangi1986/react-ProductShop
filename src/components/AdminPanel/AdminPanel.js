import React, { useState } from 'react';
import { Button, Icon } from '../../views';
import MakeDeliveries from './Actions/MakeDeliveries';
import WriteOffProduct from './Actions/WriteOffProduct'
import BestSellers from './Reports/BestSellers'
import PopularProducts from './Reports/PopularProducts';
import Revenue from './Reports/Revenue'
import SystemUsers from './CRUD/SystemUsers'
import Sale from './CRUD/Sale'
import BonusCardOwners from './CRUD/BonusCardOwners'
import Category from './CRUD/Category';
import Manufacturer from './CRUD/Manufacturer';
import Product from './CRUD/Product';
import Options from './Options'
import Popup from '../Popup';
import { ADMIN_PANEL, DEFAULT_DATE } from '../../const';
import style from './style.module.scss';

const AdminPanel = () => {
  const [typePage, setTypePage] = useState('')
  const [makeDeliveriesList, setMakeDeliveriesList] = useState([])
  const [writeOffList, setWriteOffList] = useState([])
  const [latestMakeDeliveryDate, setLatestMakeDeliveryDate] = useState(DEFAULT_DATE)
  const [latestWriteOffDate, setLatestWriteOffDate] = useState(DEFAULT_DATE)
  const [period, setPeriod] = useState('Неделя')
  const [peopleList, setPeopleList] = useState([])
  const [popularList, setPopularList] = useState([])
  const [revenueList, setRevenueList] = useState([])
  const [bonusCardOwner, setBonusCardOwner] = useState([])
  const [saleList, setSaleList] = useState([])
  const [systemUsers, setSystemUsers] = useState([])
  const [categories, setCategories] = useState([])
  const [manufacturerList, setManufacturer] = useState([])
  const [productList, setProduct] = useState([])

  const clearLists = () => {
    setMakeDeliveriesList([])
    setWriteOffList([])
    setLatestMakeDeliveryDate([])
    setLatestWriteOffDate([])
    setPeopleList([])
    setRevenueList([])
    setBonusCardOwner([])
    setSaleList([])
    setSystemUsers([])
    setCategories([])
    setManufacturer([])
    setProduct([])
  }

  const handleClick = (e) => {
    setTypePage(e.target.value)
  }

  const closeRightView = () => {
    setTypePage('')
    clearLists()
  }

  const RIGHT_VIEWS = {
    make_deliveries: MakeDeliveries,
    write_off_act: WriteOffProduct,
    best_saler: BestSellers,
    popular_product: PopularProducts,
    revenue: Revenue,
    bonus_card: BonusCardOwners,
    user: SystemUsers,
    sale: Sale,
    category: Category,
    manufacturer: Manufacturer,
    product: Product
  }

  const RightPart = RIGHT_VIEWS[typePage]

  return (
    <div className={style.container}>
      <div className={style.left}>
        {ADMIN_PANEL.map(operation => (
          <Options operation={operation} typePage={typePage} handleClick={handleClick} key={operation.title} />
        ))}
      </div>
      {RightPart && (
        <div className={style.right}>
          <RightPart
            make_deliveries={{
              productList: makeDeliveriesList,
              setProductList: setMakeDeliveriesList,
              setTypePage,
              latestDate: latestMakeDeliveryDate,
              setLatestDate: setLatestMakeDeliveryDate,
              period,
              setPeriod
            }}
            write_off_act={{
              productList: writeOffList,
              setProductList: setWriteOffList,
              setTypePage,
              latestDate: latestWriteOffDate,
              setLatestDate: setLatestWriteOffDate,
            }}
            best_saler={{
              peopleList,
              setPeopleList
            }}
            popular_product={{
              popularList,
              setPopularList
            }}
            revenue={{
              revenueList,
              setRevenueList
            }}
            bonus_card={{
              bonusCardOwner,
              setBonusCardOwner,
            }}
            user={{
              systemUsers,
              setSystemUsers,
            }}
            sale={{
              saleList,
              setSaleList,
            }}
            category={{
              categories,
              setCategories,
            }}
            manufacturer={{
              manufacturerList,
              setManufacturer,
            }}
            product={{
              productList,
              setProduct,
            }}
          >
            <div className={style.close}>
              <Button
                variant='text'
                className='button-edit_action'
                onClick={closeRightView}
              >
                <Icon slot='icon-left' icon='close' />
              </Button>
            </div>
          </RightPart>
        </div>
      )}
      <Popup />
    </div>
  )
}

export default AdminPanel