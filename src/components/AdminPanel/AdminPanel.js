import React, { useState } from 'react';
import { ADMIN_PANEL } from '../../const';
import { Button, Icon } from '../../views';
import MakeDeliveries from './MakeDeliveries';
import Options from './Options'
import style from './style.module.scss';

const AdminPanel = () => {
  const [typePage, setTypePage] = useState('')
  const [list, setList] = useState([])

  const handleClick = (e) => {
    setTypePage(e.target.value)
  }

  const closeRightView = () => {
    setTypePage('')
  }

  const RIGHT_VIEWS = {
    make_deliveries: MakeDeliveries,
  }

  const RightPart = RIGHT_VIEWS[typePage]
  // надо заугржку показывать если make_deliveries и []

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
              productList: list,
              setProductList: setList
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
    </div>
  )
}

export default AdminPanel