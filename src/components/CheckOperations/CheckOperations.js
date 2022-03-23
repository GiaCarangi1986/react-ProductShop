import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import RightPart from './RightPart'
import LeftPart from './LeftPart'
import { Button, Icon } from '../../views';
import { PATHS } from '../../const';
import style from './check_operations.module.scss';

import api from '../../api'

const CheckOperations = ({ headerText = 'Операции над чеком' }) => {
  const navigate = useNavigate();

  const redirectToCheckList = () => {
    navigate(PATHS.check_list.path)
  }

  return (
    <section className={style.wrap}>
      <div className={style.close}>
        <Button
          variant='text'
          className='button-edit_action'
          onClick={redirectToCheckList}
        >
          <Icon slot='icon-left' icon='close' />
        </Button>
      </div>
      <h1 className={style.header}>{headerText}</h1>
      <div className={style.wrap_parts}>
        <LeftPart />
        <span className={style.line} />
        <RightPart />
      </div>
    </section>
  )
}

export default CheckOperations;