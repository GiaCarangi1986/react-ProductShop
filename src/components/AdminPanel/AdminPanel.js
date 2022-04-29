import React, { useState } from 'react';
import { Button, Icon } from '../../views';
import MakeDeliveries from './MakeDeliveries';
import WriteOffProduct from './WriteOffProduct'
import Options from './Options'
import Popup from '../Popup';
import { ADMIN_PANEL, DEFAULT_DATE } from '../../const';
import style from './style.module.scss';

const AdminPanel = () => {
  const [typePage, setTypePage] = useState('')
  const [makeDeliveriesList, setMakeDeliveriesList] = useState([])
  const [latestDate, setLatestDate] = useState(DEFAULT_DATE)
  const [error, setError] = useState('')

  const handleClick = (e) => {
    setTypePage(e.target.value)
  }

  const closeRightView = () => {
    setTypePage('')
  }

  const RIGHT_VIEWS = {
    make_deliveries: MakeDeliveries,
    write_off_act: WriteOffProduct
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
              latestDate,
              setLatestDate,
              error,
              setError
            }}
            write_off_act={{
              productList: makeDeliveriesList,
              setProductList: setMakeDeliveriesList,
              setTypePage,
              latestDate,
              setLatestDate,
              error,
              setError
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