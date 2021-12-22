import React from 'react'
import { useNetwork } from '../../utils'

import style from './network.module.scss'

const ErrorNetwork = () => {
  const isOffline = useNetwork()
  
  return (
    <>
      {isOffline ? (
        <div className={style['network-error']}>
          <div className={style['network-error__text']}>Отсутствует подключение к интернету</div>
        </div>
      ) : null}
    </>
  )
}

export default ErrorNetwork