import React, { useEffect } from 'react';
import { FetcherList } from '@garpix/fetcher/fetcher-list/react-router';
import { useNavigate } from 'react-router';
import { useStoreon } from 'storeon/react';
import { PATHS } from '../../const';
import CheckTable from '../CheckTable';

import api from '../../api'
import style from './services.module.scss';

const CheckOptions = () => {
  const { currentUser } = useStoreon('currentUser');
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate(PATHS.auth.path)
    }
  }, [currentUser])

  return (
    <section className={style.services}>
      <FetcherList
        isScrollTop={false}
        isHistoryPush={false}
        api={api.getCheckList}
        initFilter={{
          page_size: 50,
          changed_show: false, // показать только редактированные чеки
          delayed_show: false // показать только неоплаченные чеки
        }}
      >
        {(props) => {
          return <CheckTable {...props} />
        }}
      </FetcherList>
    </section>
  )
}

export default CheckOptions;