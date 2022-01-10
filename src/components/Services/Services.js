import React from 'react'
import { FetcherList } from '@garpix/fetcher';
// import ServicesTable from '../ServicesTable';

import api from '../../api'
import style from './services.module.scss';

const Services = () => {
  return (
    <>
      <section className={style.services}>
        <FetcherList
          isScrollTop={false}
          isHistoryPush={false}
          api={api.getCheckList}
          initFilter={{ page_size: 10 }}
          match={{ name: 'name' }}
          location
        >
          {(props) => {
            // return <ServicesTable {...props} />
            return <div>Типа лист чеков</div>
          }}
        </FetcherList>
      </section>
    </>
  )
}

export default Services;