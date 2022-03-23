import React, { useEffect } from 'react';
import api from '../../api'
import RightPart from './RightPart'
import LeftPart from './LeftPart'
import style from './check_operations.module.scss';

const CheckOperations = ({ headerText = 'Операции над чеком' }) => {
  return (
    <section className={style.wrap}>
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