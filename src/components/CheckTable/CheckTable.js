import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { useNavigate } from 'react-router';
import { useStoreon } from 'storeon/react'
import { dataStates } from '@garpix/fetcher'
import { SureDelete } from '../Modal';
import Table from './Table'
import TableSettings from '../TableSettings'
import { Button, Icon, PreloaderPage } from '../../views'
import {
  TABLE_EVENT_TYPES,
  WIDTH_COL,
  PATHS,
  PAGES_TYPES,
  USER_ROLE,
  MODAL_TYPES
} from '../../const'
import api from '../../api';

import style from './check_table.module.scss'

const CheckTable = ({
  count,
  results = [],
  filterParams = {},
  showMore = () => { },
  loadData = () => { },
  status,
  otherData = {},
  isNext,
}) => {
  const { dispatch, currentUser } = useStoreon('currentUser')
  const navigate = useNavigate();

  const [userRole, setUserRole] = useState(0)
  const [eventType, setEventType] = useState(null)
  const [colsTrue, setColsTrue] = useState([])
  const [cols, setCols] = useState(null)
  const [statusLoading, setStatusLoading] = useState(status)
  const [filters, setFilters] = useState({})
  const [dataForDelete, setDataForDelete] = useState({})

  const deleteCheck = (id) => {
    const activeLine = id
    setStatusLoading(dataStates.loading)
    setEventType(TABLE_EVENT_TYPES.changeData)
    api.deleteCheck(activeLine)
      .then((res) => {
        console.log('delete_check', res)
        setStatusLoading(dataStates.loaded)
      })
      .catch((err) => {
        console.log('err', err)
        setStatusLoading(dataStates.loaded)
      })
  }

  const redirectToCheckPage = () => {
    navigate(PATHS.check_operations.path)
  }

  const viewCheck = (e) => {
    dispatch('page/toggle', {
      headers: { main: 'Просмотр чека', left: 'История изменений', right: 'Чек-лист', type: PAGES_TYPES.viewCheck, id: e.target.name },
    })
    redirectToCheckPage()
  }

  const editCheck = (e) => {
    dispatch('page/toggle', {
      headers: {
        main: 'Редактирование чека',
        left: 'История изменений',
        right: 'Чек-лист',
        type: PAGES_TYPES.editCheck,
        id: e.target.name.id,
        btnText: e.target.name.delayed_check ? 'Оплатить' : 'Выплатить'
      },
    })
    redirectToCheckPage()
  }

  const openSureForDelete = (e) => {
    dispatch('modal/toggle', {
      modal: MODAL_TYPES.sureDelete,
    })
    setDataForDelete(e.target.name)
  }

  useEffect(() => { // ok
    setStatusLoading(status)
  }, [status])

  useEffect(() => {
    let newVals = []
    if (cols) {
      Object.keys(cols).map((elem) => {
        newVals = [...newVals, elem]
        return newVals
      })
    }
    setColsTrue(newVals)
  }, [cols])

  useEffect(() => {
    setCols(otherData?.cols_names || null)
  }, [otherData])

  useEffect(() => {
    if (currentUser) {
      setUserRole(currentUser.roleId)
    }
  }, [currentUser])

  useEffect(() => {
    console.log('filters', filters)
    loadData(1, { ...filterParams, ...filters });
  }, [filters])

  const overlayClasses = classNames({
    [style['table-grid']]: true,
    [style['grid-rows']]: count > 0 && results.length !== count,
    [style.table_hide]: count === 0,
  })

  return (
    <>
      <TableSettings
        setEventType={setEventType}
        settingsDisabled={results.length === 0}
        isLoaded={status === dataStates.loaded}
        resultsLen={results.length}
        displayLoadBtn={count > 0 && results.length !== count && eventType !== TABLE_EVENT_TYPES.allLoaded}
        filters={filters}
        setFilters={setFilters}
      />
      <div className={overlayClasses}>
        <Table
          isNext={isNext}
          status={status}
          colsTrue={colsTrue}
          cols={cols}
          count={count}
          showMore={showMore}
          resultsLen={results.length}
          setEventType={setEventType}
          eventType={eventType}
          isLoaded={status === dataStates.loaded}
        >
          <tbody className={style['table-body']}>
            {results.map((elem) => {
              const key = `service-row-${elem.id}`;
              const classesRow = classNames({
                [style['table-row']]: true,
                [style['table-row_archive']]: elem.delayed_check,
                [style['table-row_edited']]: elem.changed_check
              })
              return (
                <tr data-test={key} key={key} className={classesRow}>
                  <td className={classNames(style['table-col'], style['table-col-full-rights'])}>
                    <div style={{ width: '50px', margin: 'auto' }}>
                      <Button
                        className='button-edit_action'
                        title='Посмотреть'
                        variant='text'
                        data-cy='btn'
                        onClick={viewCheck}
                        name={elem.id}
                      >
                        <Icon slot='icon-left' icon='info' />
                      </Button>
                      <Button
                        className='button-edit_action'
                        title='Редактировать'
                        disabled={userRole === USER_ROLE.kassir && !elem.delayed_check}
                        variant='text'
                        data-cy='btn'
                        onClick={editCheck} delayCheck
                        name={{
                          id: elem.id,
                          delayed_check: elem.delayed_check
                        }}
                      >
                        <Icon slot='icon-left' icon='write' />
                      </Button>
                    </div>
                  </td>
                  {cols && colsTrue.map((col) => {
                    const leftOrCenter = Number.isNaN(Number(`${elem[col]}`));
                    const tdClasses = classNames({
                      [style['table-col']]: true,
                      [style['table-col_left']]: leftOrCenter
                    })
                    const w = WIDTH_COL[col] || ''
                    const m = leftOrCenter ? '' : 'auto'
                    return (
                      <td key={`${col}`} className={tdClasses}>
                        <div style={{ width: `${w - 1}px`, margin: m }}>{elem[col]}</div>
                      </td>
                    )
                  })}
                  <td className={style['table-col']}>
                    <div style={{ width: '25px', margin: 'auto' }}>
                      <Button
                        className='button-delete_action'
                        title='Удалить'
                        variant='text'
                        disabled={userRole === USER_ROLE.kassir && !elem.delayed_check}
                        data-cy='btn'
                        name={elem.id}
                        onClick={openSureForDelete}
                      >
                        <Icon slot='icon-left' icon='deleteIcon' />
                      </Button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
        {status === dataStates.loaded && results.length === 0 && (
          <div className={style['notresult-block']}>
            <div className={style['notresult-text']}>
              <span>Данные не найдены</span>
            </div>
          </div>
        )}
      </div>
      {statusLoading === dataStates.loading && eventType !== TABLE_EVENT_TYPES.scroll ? <PreloaderPage /> : null}
      <SureDelete func={deleteCheck} data={dataForDelete} />
    </>
  )
}

export default CheckTable
