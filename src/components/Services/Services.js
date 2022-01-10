import React from 'react'
import { FetcherList } from '@garpix/fetcher';
import ServicesTable from '../ServicesTable';

import api from '../../api'
import style from './services.module.scss';

const Services = () => {
  return (
    <>
      <section className={style.services}>
        <FetcherList
          isScrollTop={false}
          isHistoryPush={false}
          api={api.getServicesList}
        >
          {(props) => {
            // return <ServicesTable {...props} />
            return null
          }}
        </FetcherList>
      </section>
    </>
  )
}

export default Services;