import React, { useEffect } from 'react';
import classNames from 'classnames';
import { Button, Icon, PreloaderPage, ErrorText } from '../../../views';
import { FORM_FIELDS } from '../../../const';
import style from '../style.module.scss';
import table_style from '../../CheckTable/check_table.module.scss'

const ListShow = ({
  children,
  list = [],
  setList = () => { },
  WIDTH_COL = {},
  NAME_COL = {},
  loading = false,
  setLoading = () => { },
  error = '',
  setError = () => { },
  func = () => { },
  handleSubmitError = () => { }
}) => {

  useEffect(() => {
    if (!list.length) {
      setLoading(true)
      func()
        .then(res => {
          setList(res)
          setLoading(false)
          setError('')
        })
        .catch(err => {
          console.log('err', err)
          handleSubmitError(err?.response)
          setLoading(false)
        })
    }
  }, [])

  const classesScroll = classNames({
    [table_style['table_scroll-horizontal']]: true,
    [table_style['table_scroll-vertical']]: true,
  })

  return (
    <div>
      {children}
      <div className={classNames(table_style['table-grid'], style.container__right, style.container__right_big)}>
        <div className={classesScroll}>
          <div className={table_style['table-layout']}>
            <table className={table_style.table}>
              <thead className={table_style['table-head']}>
                <tr className={table_style['table-row']}>
                  <th key='edit' className={table_style['table-col']}>
                    <div style={{ minWidth: '30px', margin: 'auto' }} />
                  </th>
                  {Object.keys(NAME_COL).map(header => {
                    const w = WIDTH_COL[header] || 30
                    return (
                      <th key={header} className={table_style['table-col']}>
                        <div style={{ minWidth: `${w}px`, margin: 'auto' }}>
                          {NAME_COL[header]}
                        </div>
                      </th>
                    )
                  })}
                  <th key='delete' className={table_style['table-col']}>
                    <div style={{ minWidth: '30px', margin: 'auto' }} />
                  </th>
                </tr>
              </thead>
              <tbody className={table_style['table-body']}>
                {list.map((line) => {
                  const classesRow = classNames({
                    [table_style['table-row']]: true,
                  })
                  return (
                    <tr key={`${line.id}`} className={classesRow}>
                      <td className={classNames(table_style['table-col'], table_style['table-col-full-rights'])} key='action_colunm'>
                        <div style={{ minWidth: '25px', margin: 'auto' }} className={style.actions}>
                          <Button
                            className='button-edit_action'
                            title='Редактировать'
                            name={line.id}
                            variant='text'
                            data-cy='btn'
                          >
                            <Icon slot='icon-left' icon='write' />
                          </Button>
                        </div>
                      </td>
                      {Object.keys(NAME_COL).map(product_line => {
                        console.log('product_line', product_line)
                        const leftOrCenter = Number.isNaN(Number(`${line[product_line]}`));
                        const tdClasses = classNames({
                          [table_style['table-col']]: true,
                          [table_style['table-col_left']]: leftOrCenter,
                          [style.password]: product_line === FORM_FIELDS.password
                        })
                        const w = WIDTH_COL[product_line] || ''
                        const margin = leftOrCenter ? '' : 'auto'
                        return (
                          <td className={tdClasses} key={product_line}>
                            <div style={{ minWidth: `${w - 1}px`, margin }}>{line[product_line]}</div>
                          </td>
                        )
                      })}
                      <td className={table_style['table-col']} key='action_colunm-delete'>
                        <div style={{ minWidth: '25px', margin: 'auto' }}>
                          <Button
                            className='button-delete_action'
                            variant='text'
                            data-cy='btn'
                            title='Удалить строку'
                            name={line.id}
                          // onClick={deleteProduct}
                          >
                            <Icon slot='icon-left' icon='deleteIcon' />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className={style.wrap_row}>
        <span />
        <ErrorText errorClass='writeoff'>
          {error}
        </ErrorText>
        <div className={style.wrap_btn}>
          <Button
            // onClick={paymentСonfirmation}
            className='btn_width-100'
            data-cy='btn'
            buttonDis
          >
            Добавить
          </Button>
        </div>
      </div>
      {loading && <PreloaderPage loaderClass='admin_panel' />}
    </div>
  )
}

export default ListShow